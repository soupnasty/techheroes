import pytz

from django.conf import settings
from twilio.rest import TwilioRestClient


def convert_utc_to_local_time(utc_time, timezone):
    return utc_time.astimezone(timezone).strftime("%B %d, %I:%M %p")


class SendSMSError(Exception):
    pass


def send_sms(phone, msg):
    phone = '+1' + phone
    try:
        client = TwilioRestClient(settings.TWILIO_ACCOUNT_ID, settings.TWILIO_API_TOKEN)
        client.messages.create(body=msg, to=phone, from_=settings.TWILIO_NUMBER)
    except Exception as e:
        # TODO Log this
        print('Couldn\'t send a text to {0} because: {1}'.format(phone, str(e)))
        raise SendSMSError(str(e))


def call_request_sms_reminder(call_request_id, user_id, msg):
    from accounts.models import User
    from call_requests.models import CallRequest

    call_request = CallRequest.objects.get(id=call_request_id)
    if call_request.status == CallRequest.CANCELED:
        return

    user = User.objects.get(id=user_id)
    user.send_sms(msg)
