from django.conf import settings
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.utils import timezone

from twilio import twiml

from accounts.models import User
from call_requests.models import CallRequest
from utils.functions import convert_utc_to_local_time


@csrf_exempt
def conference_call(request):
    r = twiml.Response()

    phone = request.POST['Caller'][2:]  # remove the +1 from the phone number

    # check if caller is an actual user
    try:
        user = User.objects.get(phone=phone)
    except User.DoesNotExist:
        r.say("This number is not registered with Tech Heroes. You can learn more at techheroes.xyz. Goodbye!")
        return HttpResponse(str(r))

    # check if call request exists
    try:
        call_request = CallRequest.objects.filter(status=CallRequest.ACCEPTED).filter(
            Q(user=user) | Q(hero__user=user)).filter(agreed_time__date=timezone.now().date())
    except CallRequest.DoesNotExist:
        message = "Hello {}! It appears that you don't have a call scheduled. Goodbye!".format(user.first_name)
        r.say(message)
        return HttpResponse(str(r))

    maxParticipants

    with r.dial() as d:
        d.conference(name='Test Room', maxParticipants=2, statusCallbackEvent="start end join leave",
                    statusCallback="https://d96658d3.ngrok.io/api/v1/conferences/event/")

        friendly_name =
        # if exists
            # start the twilio conference
            # grab the accepted call request using the phone number
            # create a conference instance
            # create a conference action instance to record time and user who first joined
        # else
            # RETURN error "No conference was found for the number you are calling with.
            # Make sure you are using the phone you verified your account with"

    # create a conference room with the hero's slug as the name.
    # create ConferenceLog instance with: user who first joined, friendly name, join time

    # if second caller joins
        # check if number is the same as on the call request
            # if it is
                # record time and user who just joined
                # conference starts
            # else
                # RETURN error "No conference was found for the number you are calling with.
                # Make sure you are using the phone you verified your account with"

    # add to ConferenceLog: twilio sid, user who joined second, join time





    print(r)
    return HttpResponse(str(r))