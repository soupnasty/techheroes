from django.db import transaction


class AtomicMixin(object):
    """
    Ensure we rollback db transactions on exceptions.
    From https://gist.github.com/adamJLev/7e9499ba7e436535fd94
    """
    @transaction.atomic()
    def dispatch(self, *args, **kwargs):
        """Atomic transaction."""
        return super(AtomicMixin, self).dispatch(*args, **kwargs)

    def handle_exception(self, *args, **kwargs):
        """Handle exception with transaction rollback."""
        response = super(AtomicMixin, self).handle_exception(*args, **kwargs)

        if getattr(response, 'exception'):
            # We've suppressed the exception but still need to rollback any transaction.
            transaction.set_rollback(True)

        return response