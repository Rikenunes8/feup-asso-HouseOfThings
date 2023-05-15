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

# Thermometer Colors
THERMOMETER_POSITIVE = '#FF0000'
THERMOMETER_NEGATIVE = '#0000FF'


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


  def drawLight(self, connected, state, color = None):
    if color == None: LIGHT_ON if state else LIGHT_OFF
    self.screen.fill(BG_COLOR)
    text = "Connected" if connected else "Disconnected"
    self.drawText(text, TEXT_COLOR, 10, HEIGHT - self.font.size(text)[1]*1.5)
    pygame.draw.circle(self.screen, color, (WIDTH/2, HEIGHT/2), 100)
    pygame.display.update()
  
  def drawThermometer(self, temperature):
    self.screen.fill(BG_COLOR)
    text = f"{temperature}°C"
    temperature = max(min(temperature, 50), -10)
    self.drawText(text, TEXT_COLOR, 10, HEIGHT - self.font.size(text)[1]*1.5)
    pygame.draw.rect(self.screen, TEXT_COLOR, (WIDTH/2-11, HEIGHT/2-101, 1, 202))
    pygame.draw.rect(self.screen, TEXT_COLOR, (WIDTH/2+10, HEIGHT/2-101, 1, 202))
    pygame.draw.rect(self.screen, TEXT_COLOR, (WIDTH/2-11, HEIGHT/2-101, 22, 1))
    pygame.draw.rect(self.screen, TEXT_COLOR, (WIDTH/2-11, HEIGHT/2+100, 22, 1))
    color = THERMOMETER_POSITIVE if temperature > 20 else THERMOMETER_NEGATIVE
    pygame.draw.rect(self.screen, color, (WIDTH/2-10, HEIGHT/2-100 + (200-(temperature+10)/60 * 200), 20, (temperature+10)/60 * 200))
    # pygame.draw.circle(self.screen, TEXT_COLOR, (WIDTH/2, HEIGHT/2), 100, 10)
    pygame.display.update()
