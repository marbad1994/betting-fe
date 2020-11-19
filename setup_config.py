import json
import requests

URL = "http://" + requests.get("http://169.254.169.254/latest/meta-data/public-hostname").text

def create_config():
    with open("app_template.js", "r") as app_template_file:
        app = app_template_file.read()


    app = app.replace("<PLACEHOLDER_PUBLIC_HOST>", URL)

    with open("app.js", "w") as app_file:
        app_file.write(index)

if __name__ == '__main__':
    create_config()
