"""
Django settings for techheroes project.
"""

import os
import sys
import dj_database_url

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = os.getenv('SECRET_KEY', None)
assert SECRET_KEY

DEBUG = True if os.getenv('DEBUG') == 'True' else False

TESTING = 'test' in sys.argv

ALLOWED_HOSTS = ['*']

AUTH_USER_MODEL = 'accounts.User'

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'bandit',
    'django_q',
    'timezone_field',

    'accounts',
    'authentication',
    'call_requests',
    'heroes',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'authentication.models.TokenAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'NON_FIELD_ERRORS_KEY': 'detail',
    'DATETIME_FORMAT': '%Y-%m-%dT%H:%M:%S.%fZ',
    'TEST_REQUEST_DEFAULT_FORMAT': 'json',
}

ROOT_URLCONF = 'techheroes.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'techheroes.wsgi.application'


# Database
DB_URL = os.getenv('DATABASE_URL', 'postgres://postgres:postgres@db/postgres')

DATABASES = {
    'default': dj_database_url.config(default=DB_URL)
}


# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Redis config
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://redis/1",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}


# Django-Q
# django-redis connection
Q_CLUSTER = {
    'name': 'tech-heroes',
    'workers': 1,
    'recycle': 100,
    'timeout': 60,
    'compress': False,
    'save_limit': 250,
    'queue_limit': 500,
    'catch_up': False,
    'label': 'Django Q',
    'django_redis': 'default'
}


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.10/howto/static-files/

STATIC_URL = '/static/'

SERVER_EMAIL = 'Tech Heroes <notifications@techherosapp.com>'

WEB_DOMAIN = os.getenv('WEB_DOMAIN', 'www.techheroes.xyz')

AUTH_TOKEN_EXP_IN_DAYS = 7
VERIFICATION_TOKEN_EXP_IN_DAYS = 7
SMS_REMINDER_TIME_IN_MIN = 15

if TESTING:
    EMAIL_HOST = "localhost"
    EMAIL_PORT = "1025"
    EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'
elif DEBUG:
    EMAIL_BACKEND = 'bandit.backends.smtp.HijackSMTPBackend'
    EMAIL_HOST = 'smtp.gmail.com'
    EMAIL_PORT = '587'
    EMAIL_HOST_USER = 'test@techheroes.xyz'
    EMAIL_HOST_PASSWORD = 'TechHeroes2016'
    EMAIL_USE_TLS = True
    BANDIT_EMAIL = 'test+bandit@techheroes.xyz'
else:
    EMAIL_BACKEND = 'django_ses.SESBackend'

# AWS configuration
AWS_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY')
AWS_SECRET_KEY = os.getenv('AWS_SECRET_KEY')

# Twilio configuration
TWILIO_ACCOUNT_ID = os.getenv('TWILIO_ACCOUNT_ID')
TWILIO_API_TOKEN = os.getenv('TWILIO_API_TOKEN')
TWILIO_NUMBER = os.getenv('TWILIO_NUMBER')

CONFERENCE_NUMBER = 13122489065 

