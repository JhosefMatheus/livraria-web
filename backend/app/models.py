from app import db


class User(db.Model):
    __tablename__ = "user"

    idUser = db.Column(db.Integer, primary_key=True, nullable=False)
    userFirstName = db.Column(db.String(255), nullable=False)
    userLastName = db.Column(db.String(255), nullable=False)
    userLogin = db.Column(db.String(255), nullable=False)
    userPassword = db.Column(db.CHAR(64), nullable=False)


    def __repr__(self):
        return f"<User {self.idUser}>"


class Author(db.Model):
    __tablename__ = "author"

    idAuthor = db.Column(db.Integer, primary_key=True, nullable=False)
    authorName = db.Column(db.String(255), nullable=False)
    books = db.relationship("Book", backref="author")


    def __repr__(self):
        return f"<Author {self.idAuthor}>"


class PublishingCompany(db.Model):
    __tablename__ = "publishingCompany"

    idPublishingCompany = db.Column(db.Integer, primary_key=True, nullable=False)
    publishingCompanyName = db.Column(db.String(255), nullable=False)
    books = db.relationship("Book", backref="publishingCompany")


    def __repr__(self):
        return f"<PublishingCompany {self.idPublishingCompany}>"


class Book(db.Model):
    __tablename__ = "book"

    idBook = db.Column(db.Integer, primary_key=True, nullable=False)
    bookTitle = db.Column(db.String(255), nullable=False)
    idAuthor = db.Column(db.Integer, db.ForeignKey("author.idAuthor"), nullable=False)
    idPublishingCompany = db.Column(db.Integer, db.ForeignKey("publishingCompany.idPublishingCompany"), nullable=False)


    def __repr__(self):
        return f"<Book {self.idBook}>"
