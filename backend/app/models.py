from app import db


class User(db.Model):
    __tablename__ = "user"

    idUser = db.Column(db.Integer, primary_key=True, nullable=False)
    userFirstName = db.Column(db.String(255), nullable=False)
    userLastName = db.Column(db.String(255), nullable=False)
    userLogin = db.Column(db.String(255), nullable=False)
    userPassword = db.Column(db.CHAR(64), nullable=False)
