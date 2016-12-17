from rest_framework import permissions


class IsOwnerOrStaff(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or obj.hero.user == request.user or obj.user.is_staff
