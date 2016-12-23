from rest_framework import permissions


class IsOwnerOrStaff(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.call_request.user == request.user or obj.call_request.hero.user == request.user or request.user.is_staff
