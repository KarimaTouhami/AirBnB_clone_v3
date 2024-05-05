#!usr/bin/python3
"""
script to start a flask web application
"""

from models import State, City, Amenity, Place, storage
from flask import Flask, render_template
import uuid

app = Flask(__name__)
app.debug = True


@app.teardown_appcontext
def teardown(Exception):
    """
    remove the current SQLAlchemy Session
    """
    storage.close()


@app.route("/3-hbnb", strict_slashes=False, methods=["GET", "POST"])
def last():
    """

    /hbnb_filters: display a HTML page like 6-index.html,
    which was done during the project 0x01. AirBnB clone - Web static
        State, City and Amenity objects must be loaded
        from DBStorage and sorted by name (A->Z)
    """
    return render_template(
        "3-hbnb.html",
        states=storage.all(State),
        amenities=storage.all(Amenity),
        places=storage.all(Place),
        cache_id=uuid.uuid4()
    )


if __name__ == "__main__":
    app.run()
