from app import app
from flask import request, make_response, jsonify
from DBManager import DBManager
import hashlib
from datetime import datetime, timedelta
import jwt

dbManager = DBManager()


@app.route("/loginVerify", methods=["POST"])
def login_verify():
    req = request.get_json()

    login = req["login"]
    password = req["password"]

    hashed_password = hashlib.sha256(password.encode("utf-8")).hexdigest()

    user = dbManager.get_user_by_login_password(login, hashed_password)

    if user:
        jwt_payload = {
            "userId": user.idUser,
            "userLogin": user.userLogin,
            "exp": datetime.utcnow() + timedelta(days=2)
        }

        token = jwt.encode(jwt_payload, app.config["SECRET_KEY"], algorithm="HS256")

        return make_response(jsonify({"token": token}), 200)

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

        return make_response(jsonify({"message": "Senha indisponível."}), 403)

    return make_response(jsonify({"message": "Login indisponível."}), 403)


@app.route("/tokenVerify", methods=["POST"])
def token_verify():
    req = request.headers

    token = req["Authorization"].strip("Bearer").strip()

    if token is None:
        return make_response(jsonify({"message": "token inexistente"}), 403)

    try:
        jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        
        return make_response(jsonify({"message": "deu certo"}), 200)

    except:
        return make_response(jsonify({"message": "token invaálido"}), 403)


@app.route("/getBooks", methods=["GET"])
def get_books():
    books = dbManager.get_books()

    json_data = []

    for book in books:
        current_author = dbManager.get_author_by_id(book.idAuthor)
        current_publishing_company = dbManager.get_publishing_company_by_id(book.idPublishingCompany)

        json_data.append({
            "id": book.idBook,
            "title": book.bookTitle,
            "authorName": current_author.authorName,
            "publishingCompanyName": current_publishing_company.publishingCompanyName
        })

    return make_response(jsonify(json_data), 200)


@app.route("/getAuthors", methods=["GET"])
def get_authors():
    authors = dbManager.get_authors()

    json_data = []

    for author in authors:
        json_data.append({
            "id": author.idAuthor,
            "name": author.authorName
        })

    return make_response(jsonify(json_data), 200)


@app.route("/getPublishingCompanys", methods=["GET"])
def get_publishing_companys():
    publishing_companys = dbManager.get_publishing_companys()

    json_data = []

    for publishing_company in publishing_companys:
        json_data.append({
            "id": publishing_company.idPublishingCompany,
            "name": publishing_company.publishingCompanyName
        })

    return make_response(jsonify(json_data), 200)


@app.route("/addBook", methods=["POST"])
def add_book():
    req = request.get_json()

    title = req["title"]
    author = req["author"]
    publishing_company = req["publishingCompany"]

    dbManager.insert_book(title, author, publishing_company)

    return make_response(jsonify({"message": "book added successfully."}), 200)
