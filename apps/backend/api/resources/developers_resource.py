from flask import request
from flask_restful import Resource, abort
from sqlalchemy.orm.exc import NoResultFound

from api.database import db
from sqlalchemy.exc import IntegrityError
from api.models.developer import Developer
from api.schemas.developer_schema import DeveloperSchema

DEVELOPERS_ENDPOINT = "/api/developers"

class DevelopersResource(Resource):
    def get(self, id=None):
      if not id: 
        return self._get_all_developers(), 200
      
      try:
        return self.__getattribute__(id), 200
      except NoResultFound:
        abort(404, message="Developer not found")

    def _get_developer_by_id(self, id):
      developer = Developer.query.filter_by(id=id).first()
      developer_json = DeveloperSchema().dump(developer)

      if not developer_json:
        raise NoResultFound()

      return developer_json

    def _get_all_developers(self):
      developers = Developer.query.all()
      developers_json = [DeveloperSchema().dump(developer) for developer in developers]
      return { "developers": developers_json, "success": True }

    def post(self):
      developer = DeveloperSchema().load(request.get_json())

      try:
        db.session.add(developer)
        db.session.commit()
      except IntegrityError as e:
        abort(500)
      else:
        return { "success": True }, 201

    def delete(self, id):
      existing_developer = Developer.query.filter_by(id=id).one_or_none()

      if (existing_developer):
        db.session.delete(existing_developer)
        db.session.commit()
        return { "success": True }
      else:
        abort(404)

    def put(self, id):
      existing_developer = Developer.query.filter_by(id=id).one_or_none()

      if (existing_developer):
        update_film = DeveloperSchema().load(request.get_json())
        existing_developer.name = update_film.name
        existing_developer.bottle_size_ml = update_film.bottle_size_ml
        db.session.merge(existing_developer)
        db.session.commit()
        return { "success": True }
      else:
        abort(404)
            
      