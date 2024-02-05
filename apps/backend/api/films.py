#!/usr/bin/python

import psycopg2
from psycopg2.extras import RealDictCursor
from flask import Blueprint, Flask, abort, request
from api.config import config

app = Flask(__name__)

films = Blueprint('films', __name__)


@films.route('/api/film', methods=['POST'])
def insert_film():
    if request.is_json:
        """ insert a new film into the films table """
        data = request.json
        name = data.get('name')
        speed = data.get('speed')
        format = data.get('format')
        sql = """INSERT INTO films(name, speed, format) VALUES(%s, %s, %s) RETURNING id;"""
        conn = None
        film_id = None
        try:
            # read database configuration
            params = config()
            # connect to the PostgreSQL database
            conn = psycopg2.connect(**params)
            # create a new cursor
            cur = conn.cursor()
            # execute the INSERT statement
            cur.execute(sql, (name, speed, format))
            # get the generated id back
            film_id = cur.fetchone()[0]
            # commit the changes to the database
            conn.commit()
            # close communication with the database
            cur.close()
            return {"id": film_id, "success": True}
        except (Exception, psycopg2.DatabaseError) as error:
            app.logger.exception(Exception)
            abort(500)
        finally:
            if conn is not None:
                conn.close()

        return film_id


@films.route('/api/film/<int:film_id>', methods=['PUT'])
def update_film(film_id: int):
    if request.is_json:
        """update a film in the films table"""
        data = request.json
        name = data.get('name')
        speed = data.get('speed')
        format = data.get('format')
        sql = """UPDATE films SET name = %s, speed = %s, format = %s WHERE id = %s;"""
        conn = None
        try: 
            params = config()
            conn = psycopg2.connect(**params)
            cur = conn.cursor()
            cur.execute(sql, (name, speed, format, film_id))
            conn.commit()
            cur.close()
            return { "success": True }
        except (Exception, psycopg2.DatabaseError) as error:
            app.logger.exception(Exception)
            abort(500)
        finally:
            if conn is not None:
                conn.close();


@films.route('/api/film/<int:film_id>', methods=['DELETE'])
def delete_film(film_id: int):
    """delete a film from the films table"""
    sql = """DELETE FROM films WHERE id = %s;"""
    conn = None
    try: 
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        cur.execute(sql, [film_id])
        conn.commit()
        cur.close()
        return { "success": True }
    except (Exception, psycopg2.DatabaseError) as error:
        app.logger.exception(Exception)
        abort(500)
    finally:
        if conn is not None:
            conn.close();


@films.route('/api/films', methods=['GET'])
def get_films():
    """ query data from the films table """
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(
            "SELECT id, name, speed, format FROM films ORDER BY id")
        return {"films": cur.fetchall(), "success": True}
    except (Exception, psycopg2.DatabaseError) as error:
        print(Exception)
        app.logger.exception(Exception)
        abort(500)
    finally:
        if conn is not None:
            conn.close()
