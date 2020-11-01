from datetime import timedelta
from pyorbital.orbital import PyOrbital


class Orbital:
    def __init__(self, tle):
        self.orbit = Orbital(
            'ISS (ZARYA)',
            line1=tle.line1,
            line2=tle.line2
        )

    def calculate(self, start):
        cartographic_degrees = []
        for i in range(100):
            utc_time = start + timedelta(minutes=i)
            lon, lat, alt = iss_orbit.get_lonlatalt(utc_time)
            cartographic_degrees.append(i * 60)
            cartographic_degrees.append(lon)
            cartographic_degrees.append(lat)
            cartographic_degrees.append(alt * 1000)

        return cartographic_degrees
