import logging

import os

from handling.fonbet import parse
from . import package_dir

resource_dir = os.path.join(package_dir, 'fonbet')


def test_samples():
    for num in range(3):
        filename = os.path.join(resource_dir, 'sample{}.html'.format(num))
        with open(filename) as file:
            html = file.read()
            parse(html)
        logging.info('sample{} handled'.format(num))
