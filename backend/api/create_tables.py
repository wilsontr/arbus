#!/usr/bin/python

import psycopg2
from api.config import config

def create_tables():
    """ create tables in the PostgreSQL database"""
    commands = (
        """
        CREATE TABLE films (
            film_id SERIAL PRIMARY KEY,
            film_name VARCHAR(255) NOT NULL,
            speed INTEGER NOT NULL,
            format VARCHAR(50) NOT NULL
        )
        """,
        """ 
        CREATE TABLE developers (
            developer_id SERIAL PRIMARY KEY,
            developer_name VARCHAR(255) NOT NULL,
            bottle_size_ml INTEGER
        )
        """,
        """ 
        CREATE TABLE sessions (
            session_id SERIAL PRIMARY KEY,
            session_date DATE NOT NULL,
            rolls INTEGER NOT NULL,
            dilution VARCHAR NOT NULL,
            dev_time VARCHAR NOT NULL,
            water_temp INTEGER DEFAULT 20,
            fresh_fixer BOOLEAN DEFAULT false,
            film_id INTEGER,
            developer_id INTEGER,
            FOREIGN KEY (film_id)
                REFERENCES films (film_id)
                ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (developer_id)
                REFERENCES developers (developer_id)
                ON UPDATE CASCADE ON DELETE CASCADE      
        )          
        """)    
    conn = None
    try:
        # read the connection parameters
        params = config()
        # connect to the PostgreSQL server
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        # create table one by one
        for command in commands:
            cur.execute(command)
        # close communication with the PostgreSQL database server
        cur.close()
        # commit the changes
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()    


if __name__ == '__main__':
    create_tables()    