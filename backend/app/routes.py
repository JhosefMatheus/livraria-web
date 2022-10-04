from app import app
from flask import request, make_response, jsonify
from DBManager import DBManager
import hashlib

dbManager = DBManager()


@app.route("/loginVerify", methods=["POST"])
def login_verify():
    req = request.get_json()

    login = req["login"]
    password = req["password"]

    hashed_password = hashlib.sha256(password.encode("utf-8")).hexdigest()

    user = dbManager.get_user_by_login_password(login, hashed_password)

    if user:
        return make_response(jsonify({"message": "login in succefull"}), 200)

    return make_response(jsonify({"message": "login or password doesn't match"}), 401)