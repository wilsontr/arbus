#!/usr/bin/python

import psycopg2
from config import config

def insert_film(film_name: str, film_speed: int, film_format: str):
    """ insert a new film into the films table """
    sql = """INSERT INTO films(film_name, film_speed, film_format) VALUES(%s, %s, %s) RETURNING film_id;"""
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
        cur.execute(sql, (film_name, film_speed, film_format))
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

