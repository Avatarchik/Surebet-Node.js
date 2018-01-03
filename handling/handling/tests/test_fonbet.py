import pytest
from os import path

from handling import *
from handling.fonbet import parse
from handling.parsing import ParseException
from . import *

resource_dir = path.join(package_dir, 'fonbet')


def abs_path(filename):
    return path.join(resource_dir, filename)


def test_samples():
    for num in range(3):
        filename = abs_path('sample{}.html'.format(num))
        with open(filename) as file:
            html = file.read()
        parse(html)
        logging.info('PASS: sample{}'.format(num))


def test_known_result():
    filename = abs_path('knownRes.json')
    with open(filename) as file:
        known_res = json.load(file)

    filename = abs_path('knownRes.html')
    with open(filename) as file:
        html = file.read()

    fonbet = parse(html)
    fonbet.format()

    assert obj_to_json(fonbet) == json_dumps(known_res)

    logging.info('PASS: known result')


def test_broken_structure():
    filename = abs_path('brokenStruct.html')
    with open(filename) as file:
        html = file.read()

    with pytest.raises(ParseException, message='Expecting ParseException'):
        parse(html)

    logging.info('PASS: broken structure')
