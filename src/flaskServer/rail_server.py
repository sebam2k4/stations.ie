from flask import Flask, jsonify
from flask import abort
from flask import make_response
from flask import request
from flask_cors import CORS

import requests
import xmltodict

app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": ["http://localhost:4200", "https://stations.netlify.com"]}})


@app.route('/api/stations', methods=['GET', 'POST'])
def get_stations_data():
    stations_xml_api = "http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML"
    req = requests.get(stations_xml_api)
    data = xmltodict.parse(req.content)
    stations_data = data["ArrayOfObjStation"]["objStation"]
    if stations_data is not None:
        return make_response(jsonify(stations_data), 200)
    return make_response(jsonify({'error': 'Train stations data currently unavailable'}), 404)
    
  
@app.route('/api/station-data/<station_code>', methods=['GET'])
# @app.route('/station-data', methods=['GET'])
def get_station_info(station_code):
    station_xml_api = "http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML?StationCode={0}".format(station_code)
    req = requests.get(station_xml_api)
    data = xmltodict.parse(req.content)
    try:
        station_data = data["ArrayOfObjStationData"]["objStationData"] # returns a list
        # when data contains only 1 it returns a dict so need to put it in a list
        if isinstance(station_data, dict):
            a = station_data
            station_data = []
            station_data.append(a)
        return make_response(jsonify(station_data), 200)
    except KeyError:
        print "No trains expected in the next 90 minutes at this station"
        return make_response(jsonify({'info': 'Nothing found'}), 404)
        
    

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
    app.run(debug=True)