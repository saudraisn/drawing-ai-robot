from constants import *
import numpy as np
import cv2
from helpers import *
from random import randrange


class Sheet:

    brush_size = 0.5

    def __init__(self, x, y, width, height):
        # x and y are in cm, bottom left corner
        self.x = x
        self.y = y
        self.width = width
        self.height = height

        self.strokes = []

        self.state = np.zeros(
            (int(height * ppcm), int(width * ppcm)), dtype="uint8")

        self.initial_state = np.copy(self.state)

        # self.load_img(f'img/img{randrange(6)}.png')
        self.load_img(f'img/allblack.png')

    def load_img(self, path):
        print("load img", path)
        im_gray = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
        self.state = cv2.resize(
            im_gray, (self.width * ppcm, self.height * ppcm))

        self.state = cv2.threshold(self.state, 127, 255, cv2.THRESH_BINARY)[1]

        self.state = 255-self.state

        self.initial_state = np.copy(self.state)

    def render(self, canvas):
        # cv2.rectangle(canvas, c2p(self.x, self.y), c2p(self.x +
        # self.width, self.y + self.height), white, -1)

        pixel_brush_size = int(Sheet.brush_size * ppcm)

        top_left = c2p(self.x, self.y + self.height)

        img = 255 - np.stack((self.state,)*3, axis=-1)

        canvas[top_left[1]: top_left[1] + self.state.shape[0],
               top_left[0]: top_left[0] + self.state.shape[1], :] = img

        # for stroke in self.strokes:
        #     p1 = np.array(stroke[0])
        #     p2 = np.array(stroke[1])

        #     cv2.line(canvas, v2p(p1), v2p(p2), red, pixel_brush_size)

    def add_stroke(self, stroke):
        reward = 0

        pixel_brush_size = int(Sheet.brush_size * ppcm)

        p1 = np.array(stroke[0])
        p2 = np.array(stroke[1])

        self.strokes.append(stroke)

        new_state = np.copy(self.state)

        top_left = np.array(c2p(self.x, self.y + self.height))

        c1 = v2p(p1)
        c2 = v2p(p2)

        cv2.line(new_state, c1 - top_left,
                             c2 - top_left, 0, pixel_brush_size)

        reward = np.sum(self.state - new_state)
        self.state = new_state
        return reward
