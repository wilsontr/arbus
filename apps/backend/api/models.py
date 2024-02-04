from app import db

class Film(db.Model):
    """ Database model for B&W film """
    __tablename__ = 'films'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    speed = db.Column(db.Integer)
    format = db.Column(db.String(50))

    def __init__(self, name=None, speed=None, format=None)
        self.name = name
        self.speed = speed
        self.format = format