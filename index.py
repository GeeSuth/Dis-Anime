import imp
from flask import render_template

def Index():
    return render_template("pages/index.html")

    