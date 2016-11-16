from rest_framework import permissions


class IsHeroOrStaff(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.is_sales or request.user.is_hero()
