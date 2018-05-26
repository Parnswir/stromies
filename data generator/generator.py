import random
from datetime import datetime, date, time, timedelta

DAY_START_TIME = time(8, 30, 0)
DAY_END_TIME = time(17, 0, 0)
DAY_VARIANCE_IN_MINUTES = 60

LUNCH_START_TIME = time(12, 0, 0)
LUNCH_END_TIME = time(12, 30, 0)
LUNCH_VARIANCE_IN_MINUTES = 15


def random_date_between(start, end):
  return start + random.random() * (end - start)


def random_key_time(day, mean_time, variance):
  return datetime.combine(day.date(), mean_time) + timedelta(0, random.random() * variance)


def random_consumption():
  return random.uniform(0.5, 1.6)


def random_lunch_consumption():
  return random.uniform(0.08, 0.8)


def record_consumption(timestamp, value):
  print


for day in [datetime(2018, 1, 1) + timedelta(x, 0) for x in range(0, 13)]:
  print(day)

  start_time = random_key_time(day, DAY_START_TIME, DAY_VARIANCE_IN_MINUTES * 60)
  end_time = random_key_time(day, DAY_END_TIME, DAY_VARIANCE_IN_MINUTES * 60)
  lunch_start = random_key_time(day, LUNCH_START_TIME, LUNCH_VARIANCE_IN_MINUTES * 60)
  lunch_end = random_key_time(day, LUNCH_END_TIME, LUNCH_VARIANCE_IN_MINUTES * 60)

  current_time = start_time

  print('Start time:', start_time)
  while current_time < end_time:
    current_time += timedelta(0, 60)
    consumption = 0

    if current_time > lunch_start and current_time < lunch_end:
      consumption = random_lunch_consumption()
    else:
      consumption = random_consumption()

    record_consumption(current_time, consumption)
  print('End time:', end_time)

  print('\n')
