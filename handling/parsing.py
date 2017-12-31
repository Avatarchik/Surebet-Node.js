from lxml import etree


class ParseException(Exception):
    pass


def xpath_with_check(node, xpath):
    res = node.xpath(xpath)
    if not res:
        raise ParseException('node not found, xpath: %s'.format(xpath))
    return res


xpath_text = etree.XPath('.//text()')


def append_not_empty(list, el):
    if el is not None:
        list.append(el)
