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
        'accepted_hero': lambda: accepted_hero(context),
        'new_call_request': lambda: new_call_request(context),
        'user_suggested_new_times': lambda: user_suggested_new_times(context),
        'user_agreed_to_time': lambda: user_agreed_to_time(context),
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


def new_call_request(context):
    to_hero = context['hero_name']
    link = context['link']
    form_user = context['user_name']

    text_graf = (
        '{0} wants to have a chat with you! Here are the call details:\n\n'
        'Estimated call time: {1} minutes \n'
        'Message: {2}'.format(form_user, context['estimated_length'], context['message'])
    )
    html_graf = mark_safe('<p>{0}</p>'.format(escape(text_graf)))

    email_context = {
        'header': 'Hi {0},'.format(to_hero),
        'text_content': text_graf,
        'html_content': html_graf,
        'cta': 'Accept or Decline Request',
        'cta_link': link,
        'static_host': settings.WEB_DOMAIN,
        'opt_out_url': USER_OPT_OUT_URL,
    }

    subject = 'You have a call request from {}'.format(form_user)
    text = render_to_string(TEXT_TEMPLATE, email_context)
    html = render_to_string(HTML_TEMPLATE, email_context)

    return subject, text, html

def user_suggested_new_times(context):
    to_user_name = context['to_user_name']
    from_user_name = context['from_user_name']
    link = context['link']

    text_graf = (
        '{0} has suggested new times for your call request. Here are the details: \n\n'
        'Original message: {1} \n'
        'Estimated length: {2} \n\n'
        'New Time Suggestions: \n'
        '{3} \n'
        '{4} \n'
        '{5} \n'
        .format(from_user_name, context['message'], context['estimated_length'],
            context['datetime_one'], context['datetime_two'], context['datetime_three']))
    html_graf = mark_safe('<p>{0}</p>'.format(escape(text_graf)))

    email_context = {
        'header': 'Hey {},'.format(to_user_name),
        'text_content': text_graf,
        'html_content': html_graf,
        'cta': 'Choose a time',
        'cta_link': link,
        'static_host': settings.WEB_DOMAIN,
        'opt_out_url': USER_OPT_OUT_URL,
    }

    subject = '{} suggested new times for your call request'.format(from_user_name)
    text = render_to_string(TEXT_TEMPLATE, email_context)
    html = render_to_string(HTML_TEMPLATE, email_context)

    return subject, text, html

def user_agreed_to_time(context):
    to_user_name = context['to_user_name']
    from_user_name = context['from_user_name']

    text_graf = (
        '{0} has agreed to a time! Your call has been scheduled. \n\n'
        'Original message: {1} \n'
        'Estimated length: {2} \n'
        'Scheduled Call Time: {3} \n\n'
        'You will recieve a text reminder 15 minutes before the call. The text will include the conference number to dial into. '
        'Thank you for using Tech Heroes!'
        .format(from_user_name, context['message'], context['estimated_length'], context['agreed_time'],))
    html_graf = mark_safe('<p>{0}</p>'.format(escape(text_graf)))

    email_context = {
        'header': 'Hey {0},'.format(to_user_name),
        'text_content': text_graf,
        'html_content': html_graf,
        'static_host': settings.WEB_DOMAIN,
        'opt_out_url': USER_OPT_OUT_URL,
    }

    subject = '{0} has agreed to a time!'.format(from_user_name)
    text = render_to_string(TEXT_TEMPLATE, email_context)
    html = render_to_string(HTML_TEMPLATE, email_context)

    return subject, text, html

