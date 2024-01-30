from flask import Flask, render_template


def create_app():
    app = Flask(__name__)

    from api.films import films
    app.register_blueprint(films)

    @app.route('/')
    def index():
        return render_template('index.html')

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(port=8000, debug=True)
