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

if len(sys.argv) <= 1:
  print('Too few arguments. generate.py num_users')
  exit(1)

num_users = int(sys.argv[1])

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


def random_consumption():
  return random.normalvariate(1, 0.2)


def random_lunch_consumption():
  return random.normalvariate(0.3, 0.1)


def random_night_consumption():
  return random.uniform(0.0, 0.1)


def record_consumption(datapoints, timestamp, value):
  datapoints.append([int(timestamp.timestamp() * 1000), value])

def send_data(datapoints, user_id):
  print('Sending data...')
  payload = {
    "name": "archive.consumption.electricity",
    "datapoints": datapoints,
    "type": "double",
    "tags": {'user': user_id}
  }
  r = requests.post(SERVER_URL, json=payload, auth=BASIC_AUTH)
  datapoints = []
  print('  -> ', r.status_code, r.text)


for user_id in range(0, num_users):
  print('Generating user data for user', user_id)
  consumption = 0
  datapoints = []

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

    if weekday and current_time > lunch_start and current_time < lunch_end:
      consumption += random_lunch_consumption()
    elif weekday and current_time > start_time and current_time < end_time:
      consumption += random_consumption()
    else:
      consumption += random_night_consumption()

    record_consumption(datapoints, current_time, consumption)
    current_time += timedelta(0, 60)

  send_data(datapoints, user_id)
print('done.')
