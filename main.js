const cards = document.querySelectorAll('.flip-card');
const notification = document.querySelector('.notification');
const notificationLose = document.querySelector('.notification-lose');
const resetButtons = document.querySelectorAll('.reset');

let images = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Milwall_Crest.svg/1200px-Milwall_Crest.svg.png',
    'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Sheffield_Wednesday_badge.svg/1200px-Sheffield_Wednesday_badge.svg.png',
    'https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Reading_FC.svg/1200px-Reading_FC.svg.png',
    'https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/Blackburn_Rovers.svg/1200px-Blackburn_Rovers.svg.png',
    'https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Preston_North_End_FC.svg/1200px-Preston_North_End_FC.svg.png',
    'https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Swansea_City_AFC_logo.svg/1200px-Swansea_City_AFC_logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Bristol_City_crest.svg/1200px-Bristol_City_crest.svg.png',
    'https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/Cardiff_City_crest.svg/1200px-Cardiff_City_crest.svg.png'
]

function fillArray(){

    let arr = [];

    for(let i = 0;i < cards.length / 2;i++){
        arr.push(images[i]);
    }

   let newArr = [...arr,...arr];

   newArr.sort(() => Math.random() - 0.5);

   return newArr;
}

let array = fillArray();
let number = 0;

cards.forEach(card => {card.querySelector('img.flip-image').src = array[number]; number++;})

let firstCard;
let secondCard;
let condition = cards.length / 2;
let numTries = 3;

function flipCard(){
    if(!firstCard){
        firstCard = this.querySelector('img.flip-image');
    }else{
        secondCard = this.querySelector('img.flip-image');
    }

    this.querySelector('.flip-card-inner').style.transform = 'rotateY(180deg)';

    if(firstCard && secondCard){
        cards.forEach(card => card.style.pointerEvents = 'none');
        if(checkCards(firstCard, secondCard)){
            condition--;
            setTimeout(()=>{
                firstCard.closest('.flip-card').style.opacity = '0';
                secondCard.closest('.flip-card').style.opacity = '0';  
            },600);
        }else{
            numTries--;
            setTimeout(()=>{numTries > 0 ? alert(`You have ${numTries} more tries.`) : '';
            },1000);    
        }

        setTimeout(()=>{
            check();
            resetCards();
        }, 1000);
    }

}

function check(){
    if(condition == 0){
        notification.style.opacity = '1';
        notification.style.zIndex = '2';
    }

    if(numTries == 0){
       notificationLose.style.opacity = '1';
       notificationLose.style.zIndex = '2';
    }
}

function checkCards(card1,card2){
    if(card1.src == card2.src){
        return true;
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));

function resetCards(){
    cards.forEach(card => {
        card.querySelector('.flip-card-inner').style.transform = 'rotateY(0)';
        card.style.pointerEvents = 'initial';
    });
    firstCard = null;
    secondCard = null;
}

function resetGame(){
    let array = fillArray();
    let number = 0;
    cards.forEach(card => {
        card.querySelector('img.flip-image').src = array[number];
        number++;
        card.style.opacity = '1';
    });
    numTries = 3;
    condition = cards.length / 2;
    notification.style.opacity = '0';
    notification.style.zIndex = '-1';
    notificationLose.style.opacity = '0';
    notificationLose.style.zIndex = '-1';
}

resetButtons.forEach(resetButton => resetButton.addEventListener('click',resetGame));