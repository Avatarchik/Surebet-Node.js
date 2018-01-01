class CondBet:
    def __init__(self, cond, v1, v2) -> None:
        self.cond = cond
        self.v1 = v1
        self.v2 = v2


class Bets:
    def __init__(self) -> None:
        self.part = 0
        self.o1, self.ox, self.o2, self.o1x, self.o12, self.ox2, = (0.0 for i in range(6))
        self.total, self.ind_total1, self.ind_total2, self.hand = ([] for i in range(4))


class Event:
    def __init__(self, team1, team2, parts) -> None:
        self.team1 = team1
        self.team2 = team2
        self.parts = parts


class Sports:
    def __init__(self) -> None:
        self.soccer, self.tennis, self.hockey, self.basket, self.volley = ([] for i in range(5))


class Bookmakers:
    def __init__(self) -> None:
        self.fonbet, self.olimp, self.marat = (Sports() for i in range(3))
