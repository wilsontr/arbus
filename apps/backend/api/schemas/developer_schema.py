from marshmallow import Schema, fields, post_load
from api.models.developer import Developer

class DeveloperSchema(Schema):
  name = fields.String(allow_none=False)
  bottle_size_ml = fields.Integer(allow_none=False)
  id = fields.Integer()

  @post_load
  def make_developer(self, data, **kwargs):
    return Developer(**data)