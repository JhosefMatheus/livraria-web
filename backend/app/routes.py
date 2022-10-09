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


@app.route("/register", methods=["POST"])
def register():
    req = request.get_json()

    f_name = req["firstName"]
    l_name = req["lastName"]
    login = req["login"]
    password = req["password"]

    hashed_password = hashlib.sha256(password.encode("utf-8")).hexdigest()

    login_verify = dbManager.get_user_by_login(login)

    if not login_verify:
        password_verify = dbManager.get_user_by_password(hashed_password)

        if not password_verify:
            dbManager.insert_user(f_name, l_name, login, hashed_password)

            return make_response(jsonify({"message": "Registrado com sucesso!"}), 200)

        return make_response(jsonify({"message": "Senha indisponível"}), 403)

    return make_response(jsonify({"message": "Login indisponível"}), 403)