from app.models import *


class DBManager:
    def __init__(self):
        pass

    def get_user_by_login_password(self, login, password):
        user = User.query.filter_by(userLogin=login, userPassword=password).first()

        return user
