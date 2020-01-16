import os
import json
from datetime import datetime, timedelta
from pyorbital.orbital import Orbital
from pyorbital.tlefile import Tle


def get_orbitals(request):
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
    res = {
        "epoch": start.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "availability": f'{start.strftime("%Y-%m-%dT%H:%M:%SZ")}/{end.strftime("%Y-%m-%dT%H:%M:%SZ")}',
        "position": {
            "lon": lon,
            "lat": lat,
            "alt": alt * 1000,
        },
        "cartographicDegrees": cartographic_degrees,
    }
    headers = {
        'Access-Control-Allow-Origin': os.getenv('APPLICATION_URL')
    }
    return json.dumps(res), 200, headers
