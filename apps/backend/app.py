from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from api.database import db
from api.resources.films_resource import FilmsResource, FILMS_ENDPOINT

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///arbus"
    db.init_app(app)

    with app.app_context():
        db.create_all()

    # from api.films import films
    # app.register_blueprint(films)

    api = Api(app)
    api.add_resource(FilmsResource, FILMS_ENDPOINT, f"{FILMS_ENDPOINT}/<id>")

    @app.route('/')
    def index():
        return render_template('index.html')

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(port=8000, debug=True)
