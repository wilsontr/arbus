from flask import request
from flask_restful import Resource, abort
from sqlalchemy.orm.exc import NoResultFound

from api.database import db
from sqlalchemy.exc import IntegrityError
from api.models.film import Film
from api.schemas.film_schema import FilmSchema

FILMS_ENDPOINT = "/api/films"

class FilmsResource(Resource):
    def get(self, id=None):
      if not id: 
        return self._get_all_films(), 200
      
      try:
        return self._get_film_by_id(id), 200
      except NoResultFound:
        abort(404, message="Film not found")

    def _get_film_by_id(self, id):
      film = Film.query.filter_by(id=id).first()
      film_json = FilmSchema().dump(film)

      if not film_json:
        raise NoResultFound()

      return film_json

    def _get_all_films(self):
      films = Film.query.all()
      films_json = [FilmSchema().dump(film) for film in films]
      return { "films": films_json, "success": True }

    def post(self):
      film = FilmSchema().load(request.get_json())

      try:
        db.session.add(film)
        db.session.commit()
      except IntegrityError as e:
        abort(500)
      else:
        return { "success": True }, 201

    def delete(self, id):
      existing_film = Film.query.filter_by(id=id).one_or_none()

      if (existing_film):
        db.session.delete(existing_film)
        db.session.commit()
        return { "success": True }
      else:
        abort(404)

    def put(self, id):
      existing_film = Film.query.filter_by(id=id).one_or_none()

      if (existing_film):
        update_film = FilmSchema().load(request.get_json())
        existing_film.name = update_film.name
        existing_film.speed = update_film.speed
        existing_film.format = update_film.format
        db.session.merge(existing_film)
        db.session.commit()
        return { "success": True }
      else:
        abort(404)
            
      