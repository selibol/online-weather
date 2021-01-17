import datetime


def get_day_name(date):
    day_name = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    day = datetime.datetime.strptime(date, '%Y-%m-%d').weekday()
    return day_name[day]
