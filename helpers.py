import numpy as np


def d2r(deg):
    return deg * np.pi / 180


# coord to pixel
def c2p(x, y):
    ppcm = 8
    return (int(x * ppcm + 100), int(300 - y * ppcm))

def v2p(vect):
    ppcm = 8
    return np.array([int(vect[0] * ppcm + 100), int(300 - vect[1] * ppcm)])
