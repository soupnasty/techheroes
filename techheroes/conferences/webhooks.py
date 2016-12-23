from django.conf import settings
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.utils import timezone

from twilio import twiml

from accounts.models import User
from call_requests.models import CallRequest
from heroes.models import Hero
from utils.functions import convert_utc_to_local_time

from .models import Conference, ConferenceLog, Call


def get_call_request_closest_to_now(user):
    """
    Return the call request with an agreed_time closest to now.
    Return None of there are no call requests scheduled for today.
    We need the correct call_request so we can get the hero slug to use for the conference room name
    """
    query = CallRequest.objects.filter(status=CallRequest.ACCEPTED).filter(
        Q(user=user) | Q(hero__user=user)).filter(agreed_time__date=timezone.now().date())
    future_call_request = query.filter(agreed_time__gte=timezone.now()).order_by('agreed_time').first()
    past_call_request = query.filter(agreed_time__lt=timezone.now()).order_by('-agreed_time').first()

    if future_call_request and past_call_request:
        if future_call_request.agreed_time - timezone.now() >= timezone.now() - past_call_request.agreed_time:
            return past_call_request
        else:
            return future_call_request
    elif future_call_request:
        return future_call_request
    elif past_call_request:
        return past_call_request
    else:
        return None


@csrf_exempt
def conference_call(request):
    r = twiml.Response()
    phone = request.POST['Caller'][2:]  # remove the +1 from the phone number

    try:
        user = User.objects.get(phone=phone)
    except User.DoesNotExist:
        r.say("This number is not registered with Tech Heroes. You can learn more at techheroes dot xyz. Goodbye!")
        return HttpResponse(str(r))

    call_request = get_call_request_closest_to_now(user)
    if not call_request:
        message = "Hello {}! It appears that you don't have a call scheduled today. Goodbye!".format(user.first_name)
        r.say(message)
        return HttpResponse(str(r))

    # Create a log of the user's dial in
    # We need this so we can grab the user using twilio's call_sid field
    Call.objects.create(sid=request.POST['CallSid'], user=user, call_request=call_request)

    # start the conference call
    message = "Greetings {}! We hope your call goes well.".format(user.first_name)
    r.say(message)
    with r.dial() as d:
        status_callback_url = settings.API_DOMAIN + "/api/v1/conferences/webhook/event"
        d.conference(name=call_request.hero.slug, maxParticipants=2, statusCallbackEvent="start end join leave",
                    statusCallback=status_callback_url)

    return HttpResponse(str(r))


@csrf_exempt
def log_event(request):
    r = twiml.Response()

    conference, _ = Conference.objects.get_or_create(
                        sid=request.POST['ConferenceSid'],
                        friendly_name=request.POST['FriendlyName']
                    )

    event = request.POST['StatusCallbackEvent']
    if event in ['participant-join', 'participant-leave']:
        call = Call.objects.get(sid=request.POST['CallSid'])
        ConferenceLog.objects.create(
            conference=conference,
            user=call.user,
            action=event
        )

        if conference.call_request:
            if call.call_request != conference.call_request:
                # TODO: Log this, IT SHOULD NOT HAPPEN
                print("LOG WEBHOOK ERROR")
        else:
            conference.call_request = call.call_request
            conference.save()

    elif event == 'conference-start':
        ConferenceLog.objects.create(
            conference=conference,
            action=event
        )

    elif event == 'conference-end':
        ConferenceLog.objects.create(
            conference=conference,
            action=event
        )
        if ConferenceLog.objects.filter(conference=conference, action=ConferenceLog.CONFERENCE_START).exists():
            # By checking this we confirm that both the hero and user joined and the conference was started
            conference.call_request.status = CallRequest.SUCCESSFUL
            conference.call_request.save()

    return HttpResponse(str(r))



