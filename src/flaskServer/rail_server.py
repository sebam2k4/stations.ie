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

@app.route('/stations', methods=['GET', 'POST'])
def get_stations_data():
    stations_xml_api = "http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML"
    req = requests.get(stations_xml_api)
    data = xmltodict.parse(req.content)
    stations_data = data["ArrayOfObjStation"]["objStation"]
    if stations_data is not None:
        return jsonify(stations_data)
    return make_response(jsonify({'error': 'Train stations data currently unavailable'}), 404)
    
  
@app.route('/station-data/<station_code>', methods=['GET'])
# @app.route('/station-data', methods=['GET'])
def get_station_info(station_code):
    station_xml_api = "http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode={0}&NumMins=90".format(station_code)
    req = requests.get(station_xml_api)
    data = xmltodict.parse(req.content)
    try:
        station_data = data["ArrayOfObjStationData"]["objStationData"]
    	# if only one item available the api will respond with {} and not [{},{},...]
        # if single object push to empty array and return the array with single object
        return jsonify(station_data)
    except KeyError:
        print "No trains expected in the next 90 minutes at this station"
        return jsonify({'info': 'Nothing found'})
        
    

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
    app.run(debug=True)