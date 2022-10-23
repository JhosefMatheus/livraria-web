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

    
    def insert_book(self, title, author, publishing_company):
        authors = self.get_authors()
        publishing_companys = self.get_publishing_companys()

        author_id = None
        publishing_company_id = None

        author_verify = any(list(map(lambda current_author: current_author.authorName == author, authors)))

        if author_verify:
            current_author = Author.query.filter_by(authorName=author).first()

            author_id = current_author.idAuthor

        else:
            new_author = Author(authorName=author)

            db.session.add(new_author)
            db.session.flush()

            author_id = new_author.idAuthor

        publishing_company_verify = any(list(map(lambda current_publishing_company: current_publishing_company.publishingCompanyName
         == publishing_company, publishing_companys)))

        if publishing_company_verify:
            current_publishing_company = PublishingCompany.query.filter_by(publishingCompanyName=publishing_company).first()

            publishing_company_id = current_publishing_company.idPublishingCompany

        else:
            new_publishing_company = PublishingCompany(publishingCompanyName=publishing_company)

            db.session.add(new_publishing_company)
            db.session.flush()

            publishing_company_id = new_publishing_company.idPublishingCompany

        new_book = Book(bookTitle=title, idAuthor=author_id, idPublishingCompany=publishing_company_id)

        db.session.add(new_book)

        db.session.commit()

    
    def insert_author(self, author):
        authors = self.get_authors()

        author_verify = any(list(map(lambda current_author: current_author.authorName == author, authors)))

        if not author_verify:
            new_author = Author(authorName=author)

            db.session.add(new_author)

            db.session.commit()

    
    def insert_publishing_company(self, publishing_company):
        publishing_companys = self.get_publishing_companys()

        publishing_companys_verify = any(list(map(lambda current_publishing_company: current_publishing_company.publishingCompanyName == publishing_company, publishing_companys)))

        if not publishing_companys_verify:
            new_publishing_company = PublishingCompany(publishingCompanyName=publishing_company)

            db.session.add(new_publishing_company)

            db.session.commit()

    
    def get_book_by_id(self, book_id):
        book = Book.query.get(book_id)

        return book

    
    def update_book(self, book_id, book_title, author_name, publishing_company_name):
        current_book = Book.query.get(book_id)
        
        current_author = Author.query.get(current_book.idAuthor)
        current_publishing_company = PublishingCompany.query.get(current_book.idPublishingCompany)

        if current_book.bookTitle != book_title:
            current_book.bookTitle = book_title

        if current_author.authorName != author_name:
            current_author.authorName = author_name

        if current_publishing_company.publishingCompanyName != publishing_company_name:
            current_publishing_company.publishingCompanyName = publishing_company_name

        db.session.commit()

    
    def update_author(self, author_id, author_name):
        current_author = Author.query.get(author_id)

        if current_author.authorName != author_name:
            current_author.authorName = author_name

        db.session.commit()


    def update_publishing_company(self, publishing_company_id, publishing_company_name):
        current_publishing_company = PublishingCompany.query.get(publishing_company_id)

        if current_publishing_company.publishingCompanyName != publishing_company_name:
            current_publishing_company.publishingCompanyName = publishing_company_name

        db.session.commit()
