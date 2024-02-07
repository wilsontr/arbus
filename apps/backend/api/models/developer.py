from api.database import db

class Developer(db.Model):
    """ Database model for B&W developers """
    __tablename__ = 'developers'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    bottle_size_ml = db.Column(db.Integer)

    def __repr__(self):
        return (
            f"**Developer** "
            f"id: {self.id} "
            f"name: {self.name} "
            f"bottle_size_ml: {self.bottle_size_ml}"
            f"**Developer** "
        )    