import sys

from .functions import send_sms


current_module = sys.modules[__name__]
setattr(current_module, 'send_sms', send_sms)