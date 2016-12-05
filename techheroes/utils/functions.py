import pytz


def convert_utc_to_local_time(utc_time, timezone):
    return utc_time.astimezone(timezone).strftime("%B %d, %I:%M %p")
