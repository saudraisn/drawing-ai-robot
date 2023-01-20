from constants import *
import numpy as np
from helpers import d2r, c2p
import cv2
from sheet import Sheet


class Robot:

    # add lift and drop pen actions
    action_set = ['inc1', 'dec1', 'inc2', 'dec2']
    increment = 0.5

    def __init__(self, name):
        self.name = name

        self.old_coord = (0, 0)

        self.lines = []

        self.a1 = 45
        self.a2 = -90
        self.l1 = 30
        self.l2 = 30
        self.sheet_width = 22
        self.sheet_height = 30
        self.sheet_x = 30
        self.sheet_y = -15
        self.sheet = Sheet(self.sheet_x, self.sheet_y,
                           self.sheet_width, self.sheet_height)
        self.compute_coords()

        self.canvas = np.zeros((600, 600, 3), dtype="uint8")
        self.score = 0

    def step(self, action):

        if action == 'inc1':
            self.a1 += Robot.increment
        elif action == 'dec1':
            self.a1 -= Robot.increment
        elif action == 'inc2':
            self.a2 += Robot.increment
        elif action == 'dec2':
            self.a2 -= Robot.increment

        old = (self.x2, self.y2)
        self.compute_coords()
        new = (self.x2, self.y2)

        self.score += self.sheet.add_stroke((old, new))

        print("score: ", self.score)

    def compute_coords(self):
        self.x1 = self.l1 * np.cos(d2r(self.a1))
        self.y1 = self.l1 * np.sin(d2r(self.a1))
        self.x2 = self.x1 + self.l2 * np.cos(d2r(self.a2 + self.a1))
        self.y2 = self.y1 + self.l2 * np.sin(d2r(self.a2 + self.a1))

    def render(self):
        self.canvas.fill(0)

        self.sheet.render(self.canvas)

        cv2.line(self.canvas, c2p(0, 0), c2p(self.x1, self.y1), green, 3)
        cv2.line(self.canvas, c2p(self.x1, self.y1),
                 c2p(self.x2, self.y2), blue, 3)

        cv2.imshow(self.name, self.canvas)
        cv2.waitKey(1)
