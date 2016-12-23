from django.shortcuts import get_object_or_404
from rest_framework import status, generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from accounts.models import User
from heroes.models import Hero

from .models import Conference, ConferenceAction
from .permissions import IsOwnerOrStaff










