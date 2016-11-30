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
        'accepted_hero': lambda: accepted_hero(context)
    }

    return messages.get(context['type'], lambda: email_error(context))()


def email_error(context):
    # TODO Log this
    subject = text = html = None
    return subject, text, html


def accepted_hero(context):
    to_user = context['hero_name']
    link = context['link']

    text_graf = (
        'You have been accepted to be a Hero for Tech Heroes! Your background and experience '
        'is very impressive and we are happy to have you on our side. ')
    html_graf = mark_safe('<p>{0}</p>'.format(escape(text_graf)))

    email_context = {
        'header': 'Hi {0},'.format(to_user),
        'text_content': text_graf,
        'html_content': html_graf,
        'cta': 'View my Hero page',
        'cta_link': link,
        'static_host': settings.WEB_DOMAIN,
        'opt_out_url': USER_OPT_OUT_URL,
    }

    subject = 'You are now a Hero!'
    text = render_to_string(TEXT_TEMPLATE, email_context)
    html = render_to_string(HTML_TEMPLATE, email_context)

    return subject, text, html
