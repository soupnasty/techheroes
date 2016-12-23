import sys

from .functions import call_request_sms_reminder


current_module = sys.modules[__name__]
setattr(current_module, 'call_request_sms_reminder', call_request_sms_reminder)