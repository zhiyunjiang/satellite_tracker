import json
from datetime import datetime
from pyorbital.orbital import Orbital
from pyorbital.tlefile import Tle


def get_satelite_position(request):
    tle = [
        'ISS (ZARYA)',
        '1 25544U 98067A   20006.35292350  .00000958  00000-0  25157-4 0  9993',
        '2 25544  51.6451  74.1937 0005176 105.0978 350.5931 15.49541523206771',
    ]
    iss_orbit = Orbital(
        tle[0],
        line1=tle[1],
        line2=tle[2],
    )
    lon, lat, alt = iss_orbit.get_lonlatalt(datetime.utcnow())
    return json.dumps({"lon": lon, "lat": lat, "alt": alt * 1000}), 200
