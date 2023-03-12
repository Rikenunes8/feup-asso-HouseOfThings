import pygame
import os
# os.environ["SDL_VIDEODRIVER"] = "dummy"

# GLOBAL PARAMETERS
WIDTH, HEIGHT, FONT_SIZE = 400, 300, 30 

# General Colors
BG_COLOR = '#F9F9F9'
TEXT_COLOR = '#000000'

# Light Colors
LIGHT_OFF = '#9D9FA4'
LIGHT_ON = '#FCF27C'


class Drawer:
  def __init__(self, title: str):
    pygame.display.set_caption(title)
    self.screen = pygame.display.set_mode((WIDTH, HEIGHT))  
    self.screen.fill(BG_COLOR)
    self.font = pygame.font.SysFont(None, FONT_SIZE)

  def drawText(self, text, color, x, y):
    textObj = self.font.render(text, 1, color)
    textRect = textObj.get_rect()
    textRect.topleft = (x, y)
    self.screen.blit(textObj, textRect)


  def drawLight(self, connected, state):
    text = "Connected" if connected else "Disconnected"
    self.drawText(text, TEXT_COLOR, 10, HEIGHT - self.font.size(text)[1]*1.5)
    pygame.draw.circle(self.screen, (LIGHT_ON if state else LIGHT_OFF), (WIDTH/2, HEIGHT/2), 100)
    pygame.display.update()
