from flask import Flask,request, render_template,send_from_directory
# from azure.iot.device.aio import IoTHubModuleClient
import os
app = Flask(__name__, static_folder='templates')


@app.route('/<path:filename>')
def file(filename):
    return send_from_directory(os.path.join(app.root_path, 'templates/dist'), filename)


@app.route("/")
def hello():
    return send_from_directory(os.path.join(app.root_path, 'templates/dist'),"index.html")


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
