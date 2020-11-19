import json
import requests

URL = "http://" + requests.get("http://169.254.169.254/latest/meta-data/public-hostname").text

data = json.dumps({"url": URL})

with open("config.json", "w") as config_file:
    config_file.write(data)
