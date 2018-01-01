class ParseException(Exception):
    pass


def parse_factor(text):
    return float(text.strip())


def xpath_with_check(node, xpath):
    res = node.xpath(xpath)
    if not res:
        raise ParseException('node not found, xpath: {}'.format(xpath))
    return res


def append_not_empty(list, el):
    if el is not None:
        list.append(el)
