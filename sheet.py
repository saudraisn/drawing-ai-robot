from constants import *
import numpy as np
import cv2
from helpers import *
from random import randrange


class Sheet:

    brush_size = 0.5

    def __init__(self, x, y, width, height, img_path):
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
        self.load_img(img_path)

    def load_img(self, path):
        print("load img", path)
        im_gray = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
        self.state = cv2.resize(
            im_gray, (self.width * ppcm, self.height * ppcm))

        self.state = cv2.threshold(self.state, 127, 255, cv2.THRESH_BINARY)[1]

        self.state = (255-self.state) / 255
        self.state[self.state == 0] = -1

        self.initial_state = np.copy(self.state)

    def render(self, canvas):
        # cv2.rectangle(canvas, c2p(self.x, self.y), c2p(self.x +
        # self.width, self.y + self.height), white, -1)

        pixel_brush_size = int(Sheet.brush_size * ppcm)

        top_left = c2p(self.x, self.y + self.height)

        img = self.state * 255
        img[img == -255] = 128

        img = np.stack((img,)*3, axis=-1)

        canvas[top_left[1]: top_left[1] + self.state.shape[0],
               top_left[0]: top_left[0] + self.state.shape[1], :] = img

        # for stroke in self.strokes:
        #     p1 = np.array(stroke[0])
        #     p2 = np.array(stroke[1])

        #     cv2.line(canvas, v2p(p1), v2p(p2), red, pixel_brush_size)

    def debug(self):
        print("debug sheet")
        img = np.copy(self.state)
        img = 255 - np.stack((img * 255,)*3, axis=-1)
        cv2.imshow("sheet", img)
        cv2.waitKey(0)


    def add_stroke(self, stroke):
        reward = 0
        done = False

        pixel_brush_size = int(Sheet.brush_size * ppcm)

        p1 = np.array(stroke[0])
        p2 = np.array(stroke[1])

        self.strokes.append(stroke)

        new_state = np.copy(self.state)

        top_left = self.top_left()

        c1 = v2p(p1)
        c2 = v2p(p2)

        s2 = c2 - top_left

        if(self.initial_state[s2[1]][s2[0]] == -1):
            done = True

        cv2.line(new_state, c1 - top_left,
                             c2 - top_left, 0, pixel_brush_size)

        new_state[self.initial_state == -1] = -1

        reward = np.sum(self.state - new_state)

        if done: 
            reward = -100
        
        self.state = new_state

        return reward, done
    
    def top_left(self):
        return c2p(self.x, self.y + self.height)

    def top_left_coord(self):
        return np.array([self.x, self.y + self.height])

    def get_random_black_pixel_coords(self): 
        black_pixels = np.argwhere(self.state == 1)
        # random_pixel = black_pixels[randrange(len(black_pixels))]
        random_pixel = black_pixels[0]

        sheet_coord = np.array([random_pixel[1] / ppcm, - random_pixel[0] / ppcm])

        return sheet_coord + self.top_left_coord()
