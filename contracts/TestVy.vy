# @version ^0.3.7



@external
def test():
    x: decimal = 101.0
    y: decimal = 199.0
    dx: decimal = 10.0
    ydx: decimal = y * dx  

    dy: decimal = ydx / x

    assert x * dy == y * dx, "shit"
