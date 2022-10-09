from app.models import *
from app import db


class DBManager:
    def __init__(self):
        pass

    def get_user_by_login_password(self, login, password):
        user = User.query.filter_by(userLogin=login, userPassword=password).first()

        return user

    
    def get_user_by_login(self, login):
        user = User.query.filter_by(userLogin=login).first()

        return user


    def get_user_by_password(self, password):
        user = User.query.filter_by(userPassword=password).first()

        return user


    def insert_user(self, first_name, last_name, login, password):
        user = User(first_name, last_name, login, password)

        db.session.add(user)

        db.session.commit()
