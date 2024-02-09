from marshmallow import Schema, fields, post_load
from api.models.developer import Developer
from api.utils.camel_case import camelcase

class DeveloperSchema(Schema):
  name = fields.String(allow_none=False)
  bottle_size_ml = fields.Integer(allow_none=False)
  id = fields.Integer()

  def on_bind_field(self, field_name, field_obj):
    field_obj.data_key = camelcase(field_obj.data_key or field_name)

  @post_load
  def make_developer(self, data, **kwargs):
    return Developer(**data)