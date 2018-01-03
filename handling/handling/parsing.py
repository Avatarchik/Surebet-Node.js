class ParseException(Exception):
    pass


class StructureException(ParseException):
    def __init__(self, msg) -> None:
        super().__init__('structure has changed: {}'.format(msg))


def parse_factor(text):
    return float(text.strip())


def xpath_with_check(node, xpath):
    res = node.xpath(xpath)
    if not res:
        raise ParseException('node not found, xpath: {}'.format(xpath))
    return res


def parse_teams(name, sep):
    teams = name.split(sep)
    if len(teams) != 2 or sep not in name:
        raise StructureException('event name')
    return teams
