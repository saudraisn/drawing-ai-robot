from constants import *
import numpy as np
from helpers import *
import cv2
from sheet import Sheet


class Robot:

    # add lift and drop pen actions
    action_set = ['inc1', 'dec1', 'inc2', 'dec2']
    increment = 0.1

    def __init__(self, name, sheet_name = 'img/img0.png'):
        self.action_space = range(4)
        self.name = name
        self.canvas = np.zeros((600, 600, 3), dtype="uint8")
        self.sheet_name = sheet_name
        self.reset()

    def step(self, action):

        if action == 0:
            self.a1 += Robot.increment
        elif action == 1:
            self.a1 -= Robot.increment
        elif action == 2:
            self.a2 += Robot.increment
        elif action == 3:
            self.a2 -= Robot.increment

        old = (self.x2, self.y2)
        self.compute_coords()
        new = (self.x2, self.y2)

        reward, done = self.sheet.add_stroke((old, new))

        self.score += reward

        # print("step", reward, done, self.score)

        return self.get_state(), reward, done

    def compute_coords(self):
        self.x1 = self.l1 * np.cos(d2r(self.a1))
        self.y1 = self.l1 * np.sin(d2r(self.a1))
        self.x2 = self.x1 + self.l2 * np.cos(d2r(self.a2 + self.a1))
        self.y2 = self.y1 + self.l2 * np.sin(d2r(self.a2 + self.a1))

    def reset(self): 
        self.a1 = 45
        self.a2 = -90
        self.l1 = 30
        self.l2 = 30
        self.sheet_width = 22
        self.sheet_height = 30
        self.sheet_x = 30
        self.sheet_y = -15
        
        self.sheet = Sheet(self.sheet_x, self.sheet_y,
                           self.sheet_width, self.sheet_height, self.sheet_name)
        
        self.get_initial_angles()

        self.compute_coords()
        self.score = 0

        return self.get_state()

    def get_initial_angles(self):

        x, y = self.sheet.get_random_black_pixel_coords()

        a2 = - np.arccos((x**2 + y**2 - self.l1 **2 - self.l2 **2) / (2 * self.l1 * self.l2))
        a1 = np.arctan2(y,x) - np.arctan2(self.l2 * np.sin(a2), self.l1 + self.l2 * np.cos(a2))
        
        self.a1 = np.rad2deg(a1)
        self.a2 = np.rad2deg(a2)

        print('a1: ', self.a1)
        print('a2: ', self.a2)

        return self.a1, self.a2
        
    def get_state(self): 
        return np.concatenate((self.sheet.state.flatten(), [self.a1], [self.a2]))

    def render(self, wait=1):
        self.canvas.fill(0)

        self.sheet.render(self.canvas)

        cv2.line(self.canvas, c2p(0, 0), c2p(self.x1, self.y1), green, 3)
        cv2.line(self.canvas, c2p(self.x1, self.y1),
                 c2p(self.x2, self.y2), blue, 3)


        # coords = self.sheet.get_random_black_pixel_coords()

        # cv2.circle(self.canvas, v2p(coords), radius=2, color=red, thickness=-1)

        cv2.imshow(self.name, self.canvas)
        cv2.waitKey(wait)
