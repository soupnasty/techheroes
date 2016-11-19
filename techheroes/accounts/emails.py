from django.core.urlresolvers import reverse
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import escape
from django.utils.safestring import mark_safe


# Emails - mutlipart
HTML_TEMPLATE = 'email_build.html'
TEXT_TEMPLATE = 'email.txt'
USER_OPT_OUT_URL = 'https://{0}/my/account'.format(settings.WEB_DOMAIN)


def get_email(context):
    messages = {
        'new_user_registered': lambda: new_user_registered_email(context),
        'password_reset': lambda: password_reset_email(context),
        'verify_email': lambda: verify_email(context),
    }

    return messages.get(context['type'], lambda: email_error(context))()


def email_error(context):
    # TODO Log this
    subject = text = html = None
    return subject, text, html


def new_user_registered_email(context):
    to_user = context['user_first_name']
    email_verify_link = context['link']

    text_graf = (
        'Thanks for signing up to Tech Heroes! '
        'Go ahead and confirm this email address so we can activate your account.')
    html_graf = mark_safe('<p>{0}</p>'.format(escape(text_graf)))

    email_context = {
        'header': 'Hi {0},'.format(to_user),
        'text_content': text_graf,
        'html_content': html_graf,
        'cta': 'Activate my account',
        'cta_link': email_verify_link,
        'static_host': settings.WEB_DOMAIN,
        'opt_out_url': USER_OPT_OUT_URL,
    }

    subject = 'Welcome to Tech Heroes'
    text = render_to_string(TEXT_TEMPLATE, email_context)
    html = render_to_string(HTML_TEMPLATE, email_context)

    return subject, text, html


def password_reset_email(context):
    to_user = context['user_first_name']
    reset_link = context['link']

    text_graf = 'Looks like you requested a new Tech Heroes password. We\'ve got you covered!'
    html_graf = mark_safe('<p>{0}</p>'.format(escape(text_graf)))

    email_context = {
        'header': 'Hi {0},'.format(to_user),
        'text_content': text_graf,
        'html_content': html_graf,
        'cta': 'Reset my password',
        'cta_link': reset_link,
        'static_host': settings.WEB_DOMAIN,
        'opt_out_url': USER_OPT_OUT_URL,
    }

    subject = 'Tech Heroes Password Reset'
    text = render_to_string(TEXT_TEMPLATE, email_context)
    html = render_to_string(HTML_TEMPLATE, email_context)

    return subject, text, html


def verify_email(context):
    to_user = context['user_first_name']
    email_verify_link = context['link']

    text_graf = (
        'You recently added this email address to your Tech Heroes account. '
        'Go ahead and confirm this email address by clicking below.')
    html_graf = mark_safe('<p>{0}</p>'.format(escape(text_graf)))

    email_context = {
        'header': 'Hi {0},'.format(to_user),
        'text_content': text_graf,
        'html_content': html_graf,
        'cta': 'Verify my email',
        'cta_link': email_verify_link,
        'static_host': settings.WEB_DOMAIN,
        'opt_out_url': USER_OPT_OUT_URL,
    }

    subject = 'Tech Heroes Email Verification'
    text = render_to_string(TEXT_TEMPLATE, email_context)
    html = render_to_string(HTML_TEMPLATE, email_context)

    return subject, text, html

