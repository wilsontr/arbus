from api.database import db

class Film(db.Model):
    """ Database model for B&W film """
    __tablename__ = 'films'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    speed = db.Column(db.Integer, nullable=False)
    format = db.Column(db.String(50))

    def __repr__(self):
        return (
            f"**Film** "
            f"id: {self.id} "
            f"name: {self.name} "
            f"speed: {self.speed}"
            f"format: {self.format}"
            f"**Film** "
        )    