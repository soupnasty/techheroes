
from rest_framework import permissions, exceptions


class IsHeroOrStaff(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.is_staff or request.user.is_hero()


class VerifiedEmailandPhone(permissions.BasePermission):

    def has_permission(self, request, view):
        if not request.user.email_verified:
            raise exceptions.PermissionDenied('User requires a verified email.')
        if not request.user.phone_verified:
            raise exceptions.PermissionDenied('User requires a verified phone.')
        return True