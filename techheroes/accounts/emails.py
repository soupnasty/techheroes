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
        'new_hero_application': lambda: new_hero_application(context),
        'hero_accepted_call_request': lambda: hero_accepted_call_request(context),
        'hero_declined_call_request': lambda: hero_declined_call_request(context),
        'hero_suggested_new_times': lambda: hero_suggested_new_times(context),
        'hero_agreed_to_time': lambda: hero_agreed_to_time(context),
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


def new_hero_application(context):
    hero_name = context['hero_name']
    link = context['link']

    text_graf = ('{0} has applied to be a hero! '.format(hero_name))
    html_graf = mark_safe('<p>{0}</p>'.format(escape(text_graf)))

    email_context = {
        'header': 'Hello Tech Heroes Staff!',
        'text_content': text_graf,
        'html_content': html_graf,
        'cta': 'Accept or decline Hero application',
        'cta_link': link,
        'static_host': settings.WEB_DOMAIN,
        'opt_out_url': USER_OPT_OUT_URL,
    }

    subject = 'New Hero Application: {}'.format(hero_name)
    text = render_to_string(TEXT_TEMPLATE, email_context)
    html = render_to_string(HTML_TEMPLATE, email_context)

    return subject, text, html


def hero_accepted_call_request(context):
    user_name = context['user_name']
    hero_name = context['hero_name']
    link = context['link']

    text_graf = (
        '{0} has accepted your call request! Here are the details: \n\n'
        'Your message: {1} \n'
        'Estimated length: {2} \n\n'
        'Time Suggestions: \n'
        '{3} \n'
        '{4} \n'
        '{5} \n'
        .format(hero_name, context['message'], context['estimated_length'],
            context['datetime_one'], context['datetime_two'], context['datetime_three']))
    html_graf = mark_safe('<p>{0}</p>'.format(escape(text_graf)))

    email_context = {
        'header': 'Hey {},'.format(user_name),
        'text_content': text_graf,
        'html_content': html_graf,
        'cta': 'Choose a time',
        'cta_link': link,
        'static_host': settings.WEB_DOMAIN,
        'opt_out_url': USER_OPT_OUT_URL,
    }

    subject = '{} accepted your call request!'.format(hero_name)
    text = render_to_string(TEXT_TEMPLATE, email_context)
    html = render_to_string(HTML_TEMPLATE, email_context)

    return subject, text, html


def hero_declined_call_request(context):
    user_name = context['user_name']
    hero_name = context['hero_name']
    link = context['link']

    text_graf = (
        '{0} has declined your call request. Here are the details: \n\n'
        'Your message: {1} \n'
        'Estimated length: {2} \n\n'
        'Status: Declined \n'
        'Reason: {3} \n\n'
        'We are sorry your call request was not able to be scheduled, but there are other Heroes that can meet your needs!'
        .format(hero_name, context['message'], context['estimated_length'], context['reason']))
    html_graf = mark_safe('<p>{0}</p>'.format(escape(text_graf)))

    email_context = {
        'header': 'Hey {},'.format(user_name),
        'text_content': text_graf,
        'html_content': html_graf,
        'cta': 'Take a look',
        'cta_link': link,
        'static_host': settings.WEB_DOMAIN,
        'opt_out_url': USER_OPT_OUT_URL,
    }

    subject = '{} declined your call request'.format(hero_name)
    text = render_to_string(TEXT_TEMPLATE, email_context)
    html = render_to_string(HTML_TEMPLATE, email_context)

    return subject, text, html


def hero_suggested_new_times(context):
    user_name = context['user_name']
    hero_name = context['hero_name']
    link = context['link']

    text_graf = (
        '{0} has suggested new times for your call request. Here are the details: \n\n'
        'Your message: {1} \n'
        'Estimated length: {2} \n\n'
        'New Time Suggestions: \n'
        '{3} \n'
        '{4} \n'
        '{5} \n'
        .format(hero_name, context['message'], context['estimated_length'],
            context['datetime_one'], context['datetime_two'], context['datetime_three']))
    html_graf = mark_safe('<p>{0}</p>'.format(escape(text_graf)))

    email_context = {
        'header': 'Hey {},'.format(user_name),
        'text_content': text_graf,
        'html_content': html_graf,
        'cta': 'Choose a time',
        'cta_link': link,
        'static_host': settings.WEB_DOMAIN,
        'opt_out_url': USER_OPT_OUT_URL,
    }

    subject = '{} suggested new times for your call request'.format(hero_name)
    text = render_to_string(TEXT_TEMPLATE, email_context)
    html = render_to_string(HTML_TEMPLATE, email_context)

    return subject, text, html


def hero_agreed_to_time(context):
    user_name = context['user_name']
    hero_name = context['hero_name']

    text_graf = (
        '{0} has agreed to a time! Your call has been scheduled. \n\n'
        'Your message: {1} \n'
        'Estimated length: {2} \n'
        'Scheduled Call Time: {3} \n\n'
        'You will recieve a text reminder 15 minutes before the call. The text will include the conference number to dial into. '
        'Thank you for using Tech Heroes!'
        .format(hero_name, context['message'], context['estimated_length'], context['agreed_time'],))
    html_graf = mark_safe('<p>{0}</p>'.format(escape(text_graf)))

    email_context = {
        'header': 'Hey {0},'.format(user_name),
        'text_content': text_graf,
        'html_content': html_graf,
        'static_host': settings.WEB_DOMAIN,
        'opt_out_url': USER_OPT_OUT_URL,
    }

    subject = '{0} has agreed to a time!'.format(hero_name)
    text = render_to_string(TEXT_TEMPLATE, email_context)
    html = render_to_string(HTML_TEMPLATE, email_context)

    return subject, text, html

