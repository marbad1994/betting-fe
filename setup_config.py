import json
import requests

URL = "http://" + requests.get("http://169.254.169.254/latest/meta-data/public-hostname").text

def create_config():
    with open("index_template.html", "r") as index_template_file:
        index = index_template_file.read()


    index = index.replace("<PLACEHOLDER_PUBLIC_HOST>", URL)

    with open("index.html", "w") as index_file:
        index_file.write(index)

if __name__ == '__main__':
    create_config()
