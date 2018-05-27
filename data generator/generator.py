import sys
import random

import requests
from requests.auth import HTTPBasicAuth

from datetime import datetime, date, time, timedelta


with open('secrets.txt', 'r') as f:
  secrets = f.read().split('\n')

if len(secrets) < 3:
  print('There needs to be a file named secrets.txt which contains the server URL and credentials divided by line breaks.')
  exit(1)

if len(sys.argv) <= 2:
  print('Too few arguments. generate.py metric num_users [first_id]')
  exit(1)

metrics = sys.argv[1].split(',')
num_users = int(sys.argv[2])
first_id = 0
if len(sys.argv) > 3:
  first_id = int(sys.argv[3])

SERVER_URL = secrets[0]
BASIC_AUTH = HTTPBasicAuth(secrets[1], secrets[2])

DAY_START_TIME = time(8, 30, 0)
DAY_END_TIME = time(17, 0, 0)
DAY_VARIANCE_IN_MINUTES = 60

LUNCH_START_TIME = time(12, 0, 0)
LUNCH_END_TIME = time(12, 30, 0)
LUNCH_VARIANCE_IN_MINUTES = 15


def is_weekday(day):
  return day.date().weekday() not in [5, 6]


def random_date_between(start, end):
  return start + random.random() * (end - start)


def random_key_time(day, mean_time, variance):
  return datetime.combine(day.date(), mean_time) + timedelta(0, random.random() * variance)


def random_consumption(metric):
  if metric == 'electricity':
    return random.normalvariate(1, 0.2)
  elif metric == 'water':
    if random.random() > 0.98:
      return random.normalvariate(10, 1.0)
    return 0


def random_lunch_consumption(metric):
  if metric == 'electricity':
    return random.normalvariate(0.3, 0.1)
  elif metric == 'water':
    if random.random() > 0.95:
      return random.normalvariate(10, 1.0)
    return 0


def random_night_consumption(metric):
  if metric == 'electricity':
    return random.uniform(0.0, 0.1)
  elif metric == 'water':
    return 0


def record_consumption(datapoints, timestamp, metric, value):
  datapoints[metric].append([int(timestamp.timestamp() * 1000), value])

def send_data(metric, datapoints, user_id):
  print("Sending data for %s... (%d items)" % (metric, len(datapoints),))
  payload = {
    "name": "archive.consumption." + metric,
    "datapoints": datapoints,
    "type": "double",
    "tags": {'user': user_id}
  }
  r = requests.post(SERVER_URL, json=payload, auth=BASIC_AUTH)
  print('  -> ', r.status_code, r.text)


for user_id in range(first_id, first_id + num_users):
  print('Generating user data for user', user_id)
  consumption = {metric: 0 for metric in metrics}
  datapoints = {metric: [] for metric in metrics}

  num_holidays = 28 + random.randrange(0, 6, 1)
  holiday = False

  start_day = datetime(2017, 1, 1)
  num_days = 365
  current_time = start_day
  last_day = datetime(1970, 1, 1)

  while current_time < start_day + timedelta(num_days, 0):
    if current_time.date() != last_day:
      start_time = random_key_time(current_time, DAY_START_TIME, DAY_VARIANCE_IN_MINUTES * 60)
      end_time = random_key_time(current_time, DAY_END_TIME, DAY_VARIANCE_IN_MINUTES * 60)
      lunch_start = random_key_time(current_time, LUNCH_START_TIME, LUNCH_VARIANCE_IN_MINUTES * 60)
      lunch_end = random_key_time(current_time, LUNCH_END_TIME, LUNCH_VARIANCE_IN_MINUTES * 60)
      last_day = current_time.date()
      weekday = is_weekday(current_time)
      if num_holidays > 0:
        holiday = weekday and (random.random() > 0.95 or (holiday and random.random() > 0.5))
        if holiday:
          num_holidays -= 1
      else:
        holiday = False

    for metric in metrics:
      if weekday and current_time > lunch_start and current_time < lunch_end and not holiday:
        consumption[metric] += random_lunch_consumption(metric)
      elif weekday and current_time > start_time and current_time < end_time and not holiday:
        consumption[metric] += random_consumption(metric)
      else:
        consumption[metric] += random_night_consumption(metric)

      record_consumption(datapoints, current_time, metric, consumption[metric])
    current_time += timedelta(0, 60)

  for metric in metrics:
    send_data(metric, datapoints[metric], user_id)
print('done.')
