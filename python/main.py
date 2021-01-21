import random
import PySimpleGUI as sg
class Card:
    def __init__(self, type, num):
        self.type = type
        self.flip = False
        self.image = ("./python/resources/"+self.type+".png")
        self.key = self.type + str(num)
        self.layout = sg.Button(image_filename=self.image, image_subsample=3, key=self.key)
    
    def show(self):
        print(self.type)

    def flipCard(self):
        self.flip = True

class Deck:
    def __init__(self):
        self.cards = [Card("square",0),Card("square",1),Card("triangle",0),Card("triangle",1),Card("circle",0),Card("circle",1),Card("leaf",0),Card("leaf",1),Card("bicycle",0),Card("bicycle",1),Card("plane",0),Card("plane",1),Card("car",0),Card("car",1),Card("phone",0),Card("phone",1)]

    def shuffle(self):
        for i in range(len(self.cards)):
            r = random.randint(0,i)
            self.cards[i], self.cards[r] = self.cards[r], self.cards[i]
            

    def show(self):
        for item in self.cards:
            if item.flip == True:
                item.show()
    
    def display(self, layout):
        i=0
        list = []
        for item in self.cards:
            print(item.key)
            if item.flip == False:
                list.append(item.layout)                
            i+=1
            if i ==4:
                layout.append(list)
                list = []
                i=0

    def go(self, card1, card2):
        deck.cards[card1].show()
        deck.cards[card2].show()
        if self.cards[card1].type == self.cards[card2].type:
            self.cards[card1].flipCard()
            self.cards[card2].flipCard()


deck = Deck()
deck.shuffle()
layout = []

deck.display(layout)

window = sg.Window("Memory Game", layout, resizable=True)

while True:
    event, values = window.read()

    for item in deck.cards:
        if event == item.key:
            print(item.key)