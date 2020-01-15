import math
from flask import jsonify
from datetime import datetime, timedelta
from pyorbital.orbital import Orbital
from pyorbital.tlefile import Tle
from app import application


@application.route("/orbitals", methods=["GET"])
def get_orbital():
    iss_tle = Tle('ISS (ZARYA)', 'app/tle/iss.tle')
    iss_orbit = Orbital(
        'ISS (ZARYA)',
        line1=iss_tle.line1,
        line2=iss_tle.line2
    )
    start = datetime.utcnow()
    cartographic_degrees = []
    for i in range(100):
        utc_time = start + timedelta(minutes=i)
        lon, lat, alt = iss_orbit.get_lonlatalt(utc_time)
        cartographic_degrees.append(i * 60)
        cartographic_degrees.append(lon)
        cartographic_degrees.append(lat)
        cartographic_degrees.append(alt * 1000)

    lon, lat, alt = iss_orbit.get_lonlatalt(start)
    end = start + timedelta(minutes=100)

    return jsonify({
        "epoch": start.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "availability": f'{start.strftime("%Y-%m-%dT%H:%M:%SZ")}/{end.strftime("%Y-%m-%dT%H:%M:%SZ")}',
        "position": {
            "lon": lon,
            "lat": lat,
            "alt": alt * 1000,
        },
        "cartographicDegrees": cartographic_degrees,
    }), 200
