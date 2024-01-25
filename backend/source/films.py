#!/usr/bin/python

import psycopg2
from config import config
from psycopg2.extras import RealDictCursor
import json


def insert_film(film_name: str, speed: int, format: str):
    """ insert a new film into the films table """
    sql = """INSERT INTO films(film_name, speed, format) VALUES(%s, %s, %s) RETURNING film_id;"""
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
        cur.execute(sql, (film_name, speed, format))
        # get the generated id back
        film_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()        

    return film_id

def get_films():
    """ query data from the films table """
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT film_id, film_name, speed, format FROM films ORDER BY film_id")
        print(json.dumps(cur.fetchall(), indent=2))
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

