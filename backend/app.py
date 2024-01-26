from flask import Flask, render_template
from api.films import films

app = Flask(__name__)

app.register_blueprint(films)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(port=8000, debug=True)