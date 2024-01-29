# arbus

B&W film processing database using React/RTK/Vite/Python/Flask/PostgreSQL.

## Setup (macOS)

Clone this repo, then:

	brew install postgresql
	
Create a user named `postgres` and a table named `arbus` owned by this user, for example:

	psql postgres
	\du
	CREATE USER postgres;
	CREATE DATABASE arbus WITH OWNER postgres;

Make a copy of `database.ini` and set the correct database user and password.

In VSCode, create a new Venv environment. Then, in a VSCode terminal:
	
	cd backend
	python3 -m venv .venv
	pip3 install -r requirements.txt
	cd api
	python create_tables.py
	cd ..
	python app.py

