class CondBet:
    def __init__(self, cond, v1, v2):
        self.cond = cond
        self.v1 = v1
        self.v2 = v2


class Bets:
    part = 0
    o1, ox, o2, o1x, o12, ox2, = (0.0 for i in range(6))
    total, ind_total1, ind_total2, hand = ([] for i in range(4))


class Event:
    def __init__(self, team1, team2, parts):
        self.team1 = team1
        self.team2 = team2
        self.parts = parts


class Sports:
    soccer, tennis, hockey, basket, volley = ([] for i in range(5))


class Bookmakers:
    fonbet, olimp, marat = (Sports() for i in range(3))
