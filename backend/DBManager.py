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
        user = User(userFirstName=first_name, userLastName=last_name, userLogin=login, userPassword=password)

        db.session.add(user)

        db.session.commit()


    def get_books(self):
        books = Book.query.all()

        return books

    
    def get_author_by_id(self, author_id):
        author = Author.query.get(author_id)

        return author

    
    def get_publishing_company_by_id(self, publishing_company_id):
        publishing_company = PublishingCompany.query.get(publishing_company_id)

        return publishing_company


    def get_authors(self):
        authors = Author.query.all()

        return authors


    def get_publishing_companys(self):
        publishing_companys = PublishingCompany.query.all()

        return publishing_companys
