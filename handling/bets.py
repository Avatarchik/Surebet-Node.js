class CondBet:
    cond = 0.0
    v1, v2 = 0.0, 0.0

    def is_not_empty(self):
        return self.v1 != 0 and self.v2 != 0


class Bets:
    part = 0
    o1, ox, o2, o1x, o12, ox2, = (0.0 for i in range(6))
    total, ind_total1, ind_total2, hand = (CondBet() for i in range(4))


class Event:
    team1, team2 = "", ""
    parts = []

    def is_not_empty(self):
        return len(self.parts) != 0


class Sports:
    soccer, tennis, hockey, basket, volley = (Event() for i in range(5))


class Bookmakers:
    fonbet, olimp, marat = (Sports() for i in range(3))


class Teams:
    team1, team2 = "", ""
