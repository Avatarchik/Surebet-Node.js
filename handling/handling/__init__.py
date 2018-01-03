import json
import logging

logging.basicConfig(level=logging.INFO)

_json_params = {'indent': '\t', 'sort_keys': True}


def json_dump(obj, fp, **kwargs):
    json.dump(obj, fp, **_json_params, **kwargs)


def json_dumps(obj, **kwargs):
    return json.dumps(obj, **_json_params, **kwargs)


def obj_to_json(obj):
    return json_dumps(obj, default=lambda o: o.__dict__)


def set_exist_attr(object, name, value):
    getattr(object, name)  # raise AttributeError if attr is not exist
    setattr(object, name, value)
