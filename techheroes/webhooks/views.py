from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

from twilio import twiml

from accounts.models import User


@csrf_exempt
def conference_call(request):
    # grab the number of the first caller

    # check if call request exists at this moment in time for this number
        # if exists
            # grab the accepted call request using either of the user's numbers
            # record time and user who first joined
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

    r = twiml.Response()

    with r.dial() as d:
        d.conference(name='Test Room')

    print(r)
    return HttpResponse(r.toxml(), content_type='application/xml')

