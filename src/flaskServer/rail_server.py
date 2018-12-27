from flask import Flask, jsonify
from flask import abort
from flask import make_response
from flask import request
from flask_cors import CORS
import operator

import requests
import xmltodict

app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": ["http://localhost:4200", "http://127.0.0.1:8080/", "https://stations.ie", "https://www.stations.ie"]}})


@app.route('/api/stations', methods=['GET', 'POST'])
def get_stations_data():
    stations_xml_api = "http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML_WithStationType?StationType=A"
    req = requests.get(stations_xml_api)
    data = xmltodict.parse(req.content)
    try:
        stations_data = data["ArrayOfObjStation"]["objStation"]
    except KeyError:
        print "No train stations data available at this time"
        abort(404)
    dart = "http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML_WithStationType?StationType=D"
    dart_req = requests.get(dart)
    data2 = xmltodict.parse(dart_req.content)
    try:
        dart_data = data2["ArrayOfObjStation"]["objStation"]
    except KeyError:
        print "No train stations data available at this time"
        abort(404)
    
    for d1 in dart_data:
        if d1["StationId"] != '100': # Don't remove Dublin Connolly station
            for d2 in stations_data:
                if d2["StationId"] == d1["StationId"]:
                    stations_data.remove(d1)

    stations_data.sort(key=operator.itemgetter('StationDesc'))
    return make_response(jsonify({'irishRailStations': stations_data}), 200)


@app.route('/api/station-data/<station_code>', methods=['GET'])
# @app.route('/station-data', methods=['GET'])
def get_station_info(station_code):
    station_xml_api = "http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML?StationCode={0}".format(station_code)
    req = requests.get(station_xml_api)
    data = xmltodict.parse(req.content)
    try:
        station_data = data["ArrayOfObjStationData"]["objStationData"] # returns a list
        
    except KeyError:
        message = "No trains expected in the next 90 minutes at this station"
        print message
        # abort(404)
        return make_response(jsonify({"notFound": message}), 200)
    # when data contains only 1 result it returns a dict so need to put it in a list
    if isinstance(station_data, dict):
        a = station_data
        station_data = []
        station_data.append(a)
    return make_response(jsonify({'irishRailStationData': station_data}), 200)    
    

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
    app.run(debug=True)