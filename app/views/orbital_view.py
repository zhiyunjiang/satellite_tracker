import math
from flask import jsonify
from datetime import datetime, timedelta
from pyorbital.tlefile import Tle
from app import application
from app.models.orbital import Orbital


@application.route("/orbitals", methods=["GET"])
def get_orbital():
    iss_tle = Tle('ISS (ZARYA)', 'app/tle/iss.tle')
    orbit = Orbital(iss_tle)
    start = datetime.utcnow()
    cartographic_degrees = orbit.calculate(start)

    start_position = cartographic_degrees[1:4]
    end = start + timedelta(minutes=100)

    return jsonify({
        "epoch": start.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "availability": f'{start.strftime("%Y-%m-%dT%H:%M:%SZ")}/{end.strftime("%Y-%m-%dT%H:%M:%SZ")}',
        "position": {
            "lon": start_position[0],
            "lat": start_position[1],
            "alt": start_position[2] * 1000,
        },
        "cartographicDegrees": cartographic_degrees,
    }), 200
