import numpy as np
import cv2
import random
from sheet import Sheet
from helpers import *
from constants import *
from robot import Robot

r1 = Robot('r1')
r2 = Robot('r2')

while True:
    r1.step(random.choice(r1.action_set))
    r1.render()
    # r2.step(random.choice(r2.action_set))
    # r2.render()

