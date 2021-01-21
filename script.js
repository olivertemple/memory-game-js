class Card{
    constructor(type, num){
        this.type = type;
        this.flip = false
        this.image = ("./resources/"+this.type+".png");
        this.key = this.type + String(num)
    }
    show(i){
        if (this.flip==true){
            console.log(this.type);
            this.elem = document.createElement("canvas");
            this.elem.setAttribute("id", this.key);
            this.elem.setAttribute("border","5px solid black")
            document.getElementById("memoryGame").appendChild(this.elem)
            var c = document.getElementById(this.key);
            var ctx = c.getContext("2d");
            var image = new Image();
            image.src = ("./resources/"+this.type+".png")
            image.onload = () => {
                ctx.drawImage(image,0,0,100,100);
            }
            
            this.lineBreak = document.createElement("br")
            if (i== 3){
                document.getElementById("memoryGame").appendChild(this.lineBreak)
            }else if (i==7){
                document.getElementById("memoryGame").appendChild(this.lineBreak)
            }else if (i==11){
                document.getElementById("memoryGame").appendChild(this.lineBreak)
            }
        }else{
            console.log(this.type);
            this.elem = document.createElement("canvas");
            this.elem.setAttribute("id", this.key)
            this.elem.setAttribute("border","5px solid black")
            document.getElementById("memoryGame").appendChild(this.elem)
            this.lineBreak = document.createElement("br")
            if (i== 3){
                document.getElementById("memoryGame").appendChild(this.lineBreak)
            }else if (i==7){
                document.getElementById("memoryGame").appendChild(this.lineBreak)
            }else if (i==11){
                document.getElementById("memoryGame").appendChild(this.lineBreak)
            }
        }
    }
    flipCard(deck){
        if (this.flip == false){
            this.flip = true;
            var c = document.getElementById(this.key);
            var ctx = c.getContext("2d");
            var image = new Image();
            image.src = ("./resources/"+this.type+".png")
            image.onload = () => {
                ctx.drawImage(image,0,0, 300, 150)
            }
            document.getElementById(this.key).setAttribute("style","background-color:orange")
            console.log("flipped "+this.key);
            deck.flippedCards.push(this);

            if (deck.flippedCards.length>=2){
                deck.moves +=1;
                if(deck.flippedCards[0].type==deck.flippedCards[1].type){
                    deck.correct.push(deck.flippedCards);
                    deck.correct.forEach(function(item){
                        item.forEach(function(elem){
                            document.getElementById(elem.key).setAttribute("style","background-color:green");
                        });
                    });
                    deck.flippedCards = []
                }else{
                    setTimeout(function(){
                        deck.flippedCards.forEach(function(item){
                            setTimeout(function(){
                                item.flip = false;
                                var canvas = document.getElementById(item.key);
                                var canvasContext = canvas.getContext("2d");
                                canvasContext.clearRect(0,0,300,150);
                                canvas.setAttribute("style","background-color:darkgrey")
                                deck.flippedCards = [];
                                console.log("clear")
                            }, 800);
                            document.getElementById(item.key).setAttribute("style","background-color:red")
                        });
                    },100);
                }
                
            }
        }
    }
}

class Deck{
    constructor(){
        this.cards = [new Card("square",0),new Card("square",1),new Card("triangle",0),new Card("triangle",1),new Card("circle",0),new Card("circle",1),new Card("leaf",0),new Card("leaf",1),new Card("bicycle",0),new Card("bicycle",1),new Card("plane",0),new Card("plane",1),new Card("car",0),new Card("car",1),new Card("phone",0),new Card("phone",1)]
        this.flippedCards = []
        this.correct = []
        this.moves = 0
    }
    shuffle(){
        var currentIndex = this.cards.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = this.cards[currentIndex];
            this.cards[currentIndex] = this.cards[randomIndex];
            this.cards[randomIndex] = temporaryValue;
        }
    }
    show(){
        document.getElementById("memoryGame").innerHTML=("")
        for (let i=0; i<this.cards.length; i++){
            this.cards[i].show(i)
        };
        
    }
    checkWin(){
        if (this.correct.length==8){
            console.log("WIN")
            document.getElementById("popupDiv").setAttribute("style","visibility:visible;" );
            document.getElementById("moves").innerHTML = ("You made "+this.moves+" moves")

        }
    }
}


function addEventListeners(deck){
    deck.cards.forEach(function(card){
        try {
            document.getElementById(card.key).addEventListener("click", function(){
                card.flipCard(deck);
                deck.checkWin();
                
            })
        } catch (error) {
            
        }
        
    });
}

function start(){
    document.getElementById("popupDiv").setAttribute("style","visibility: hidden")
    var deck = new Deck();
    deck.show();
    addEventListeners(deck);
}



if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}

