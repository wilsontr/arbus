from marshmallow import Schema, fields, post_load
from api.models.film import Film

class FilmSchema(Schema):
  name = fields.String(allow_none=False)
  speed = fields.Integer(allow_none=False)
  format = fields.String(allow_none=False)
  id = fields.Integer()  

  @post_load
  def make_film(self, data, **kwargs):
    return Film(**data)