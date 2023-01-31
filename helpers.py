import numpy as np
from constants import ppcm

def d2r(deg):
    return deg * np.pi / 180

def r2d(rad):
    return rad * 180 / np.pi

# coord to pixel
def c2p(x, y):
    return np.array([int(x * ppcm + 100), int(300 - y * ppcm)])

# pixel to coord
def p2c(x, y):
    return np.array([(x - 100) / ppcm, (300 - y) / ppcm])

# vector to pixel
def v2p(vect):
    return np.array([int(vect[0] * ppcm + 100), int(300 - vect[1] * ppcm)])
