from flask import Flask, jsonify
from flask import abort
from flask import make_response
from flask import request
from flask_cors import CORS

import requests
import xmltodict

app = Flask(__name__)
CORS(app) # for avoiding cors errors when testing locally
# cors = CORS(app, resources={r"/rail-data/*": {"origins": "*"}})

@app.route('/rail-data', methods=['GET', 'POST'])
def get_rail_data():
    rail_xml_api = "http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML"
    # content_dict = xmltodict.parse(xml_data)

    req = requests.get(rail_xml_api)
    content_dict = xmltodict.parse(req.content)
    print content_dict["ArrayOfObjStation"]["objStation"]
    return jsonify(content_dict["ArrayOfObjStation"]["objStation"])
  
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
    app.run(debug=True)