import sys
import json

import requests
from requests.auth import HTTPBasicAuth


with open('secrets.txt', 'r') as f:
  secrets = f.read().split('\n')

if len(secrets) < 3:
  print('There needs to be a file named secrets.txt which contains the server URL and credentials divided by line breaks.')
  exit(1)

SERVER_URL = secrets[0]
BASIC_AUTH = HTTPBasicAuth(secrets[1], secrets[2])

if len(sys.argv) < 5:
  print('Too few arguments. mint.py metric[,s] num_users start_time end_time')
  exit(1)

metrics = sys.argv[1].split(',')
num_users = int(sys.argv[2])
start_time = int(sys.argv[3])
end_time = int(sys.argv[4])

averages = None


def query_average():
  global averages
  print('Querying metric averages...')
  query = {
    "metrics": [],
    "start_absolute": start_time,
    "end_absolute": end_time
  }
  for metric in metrics:
    query["metrics"].append({
      "tags": {},
      "name": "archive.consumption." + metric,
      "aggregators": [
        {
          "name": "avg",
          "sampling": {
            "value": "1",
            "unit": "minutes"
          }
        },
        {
          "name": "rate",
          "sampling": {
            "value": "1",
            "unit": "minutes"
          }
        }
      ]
    })
  r = requests.post(SERVER_URL + '/query', json=query, auth=BASIC_AUTH)
  print('  -> ', r.status_code)
  averages = json.loads(r.text)['queries']


def query_user_data(user_id):
  print('Querying user data for user', user_id)
  query = {
    "metrics": [],
    "start_absolute": start_time,
    "end_absolute": end_time
  }
  for metric in metrics:
    query["metrics"].append({
      "tags": {"user": user_id},
      "name": "archive.consumption." + metric,
      "aggregators": [
        {
          "name": "first",
          "sampling": {
            "value": "1",
            "unit": "minutes"
          }
        },
        {
          "name": "rate",
          "sampling": {
            "value": "1",
            "unit": "minutes"
          }
        }
      ]
    })
  r = requests.post(SERVER_URL + '/query', json=query, auth=BASIC_AUTH)
  print('  -> ', r.status_code)
  return json.loads(r.text)['queries']


query_average()
for user_id in range(0, num_users):
  print('Calculating ECOins for user', user_id)
  coins = 0

  for result in query_user_data(user_id):
    metric_key = result["results"][0]["name"]
    print("  ", metric_key)
    average_values = {}
    for metric_average in averages:
      if metric_average["results"][0]["name"] == metric_key:
        average_values = {timestamp: value for (timestamp, value) in metric_average["results"][0]["values"]}

    for result_tuple in result["results"][0]["values"]:
      delta = average_values[result_tuple[0]] - result_tuple[1] # subtract metric values (1) at matching timestamps (0)
      if (abs(delta) > 0.3):
        coins += (delta / abs(delta))
  print("Coins total:", coins)


print('done.')
