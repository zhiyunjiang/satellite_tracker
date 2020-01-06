from flask import jsonify
from datetime import datetime
from pyorbital.orbital import Orbital
from pyorbital.tlefile import Tle
from app import application


@application.route("/api/czmls", methods=["GET"])
def get_czmls():
    iss_tle = Tle('ISS (ZARYA)', 'app/tle/iss.tle')
    iss_orbit = Orbital(
        'ISS (ZARYA)',
        line1=iss_tle.line1,
        line2=iss_tle.line2
    )
    now = datetime.utcnow()
    lon, lat, alt = iss_orbit.get_lonlatalt(now)
    return jsonify({"lon": lon, "lat": lat, "alt": alt}), 200
