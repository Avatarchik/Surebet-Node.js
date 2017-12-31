import lxml.html
from bets import *
from parsing import *

table = '//body/table[@id="lineTable"]/tbody'
ev_name = '//td[contains(@class, "eventCellName")]/div[contains(@id, "event")]'
grid = '//div[@class="detailsDIV"]/table'

tr_event = "trEvent"
tr_event_child = "trEventChild"
tr_event_details = "trEventDetails"

hand_ids = [0, 1, 3]
total_ids = [0, 1, 2]


class RowInfo:
    def __init__(self, ev_class, node):
        self.ev_class = ev_class
        self.node = node


def parse(source):
    html = lxml.html.fromstring(source)
    row_nodes = xpath_with_check(html, table + '/tr')

    bookmaker = Sports()
    sports = {
        '1': bookmaker.soccer,
        '2': bookmaker.hockey,
        '3': bookmaker.basket,
        '4': bookmaker.tennis,
        '9': bookmaker.volley,
    }

    rows_info = []
    for row_node in row_nodes:
        row_classes = row_node.get('class').split(" ")
        if len(row_classes) == 1:
            continue
        if len(row_classes) != 3:
            raise ParseException('attribute @class in rowNode not found')

        sport_num = row_classes[1][10:]

        if sport_num not in sports.keys():
            continue

        row_class = row_classes[0]
        if row_class == tr_event:
            append_event(rows_info, prev_sport)

            prev_sport = sports[sport_num]
            rows_info.clear()

        rows_info.append(RowInfo(row_class, row_node))

    append_event(rows_info, prev_sport)
    return bookmaker


def append_event(rows_info, sport):
    if rows_info:
        append_not_empty(sport, parse_event(rows_info))


def parse_event(rows_info):
    node = rows_info[0].node
    name, is_blocked = get_event_info(node)

    teams = name.split('-')
    if len(teams) != 2 or '-' not in name:
        ParseException('event name\'s struct has changed')

    parts = []
    part_handled = is_blocked
    if part_handled:
        bets = handle_row(node)
        bets.part = 0
        parts.append(bets)

    for row_info in range(rows_info[1:]):
        ev_class, node = row_info
        if ev_class == tr_event_details:
            if part_handled:
                parse_event_details(parts[-1], node)
        elif ev_class == tr_event_child:
            name, is_blocked = get_event_info(node)

            part_handled = not is_blocked and is_part(name)
            if part_handled:
                bets = handle_row(node)
                part_num = int(name[0])
                bets.part = part_num

                parts.append(bets)

    return Event(*teams, parts) if parts else None


def is_part(name):
    for part_name in ['half', 'quarter', 'set', 'period']:
        if part_name in name:
            return True
    return False


def get_event_info(row_node):
    title = xpath_with_check(row_node, "." + ev_name)
    name = xpath_with_check(row_node, './/text()')

    is_blocked = title[0].get('class') == 'eventBlocked'

    return name.strip(), is_blocked


def parse_event_details(bets, node):
    grid_nodes = xpath_with_check(node, grid)

    allowed_bets = {
        'Hcap': bets.hand,
        'Totals': bets.total,
        'Team Totals-1': bets.ind_total1,
        'Team Totals-2': bets.ind_total2,
    }

    for grid_node in grid_nodes:
        caption = xpath_with_check(grid_node, './/thead/tr[1]/th/text()').strip()

        if caption not in allowed_bets.keys():
            continue

        grid_rows = xpath_with_check(grid_node, './/tbody/tr')

        for grid_row in grid_rows:
            grid_cols = xpath_with_check(grid_row, './/td')

            ids = hand_ids if caption == 'Hcap' else total_ids
            cond_bet = handle_cond_bet(grid_cols, ids)

            append_not_empty(allowed_bets[caption], cond_bet)

    return bets


def handle_row(row_node):
    bets = Bets()

    col_nodes = xpath_with_check(row_node, './/td')

    for idx, bet in enumerate(['o1', 'ox', 'o2', 'o1x', 'o12', 'ox2']):
        text_node = xpath_text(col_nodes[idx + 3])
        if len(text_node) > 0:
            bets.__setattr__(bet, float(text_node[0].text))

    hand = handle_cond_bet(col_nodes[9:13], hand_ids)
    append_not_empty(bets.hand, hand)

    total = handle_cond_bet(col_nodes[13:16], total_ids)
    append_not_empty(bets.total, total)

    return bets


def handle_cond_bet(nodes, ids):
    factors = []
    for id in ids:
        res = xpath_text(nodes[id])

        if len(res) > 1:
            ParseException('structure has changed: cond bet')
        if len(res) == 1:
            factors.append(float(res[0].text))

    if not factors:
        return None

    if len(factors) != 3:
        ParseException('structure has changed: cond bet')

    return CondBet(*factors)
