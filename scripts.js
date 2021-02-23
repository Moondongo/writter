const talkingSound = new Audio('./assets/sound/talking3.mp3')
const textDisplay = document.querySelector('.text');
const character = document.querySelector('.character');
const button = document.querySelector('.button');
let text;
let i = 0;
let pause;

button.addEventListener('click',()=>{
    text = document.querySelector('.text-area').value;
    if(text != null){
        end();
        update();
    }
});

function update(){
    talkingSound.pause();
    talkingSound.currentTime = 0;
    pause = 50;
    if(i < text.length){
        if(charEvaluation(i)){
            talkingSound.play();
            textDisplay.textContent += text[i];
        }
        i++;
        setTimeout(update, pause);
    }
}
function end(){
    i = 0;
    textDisplay.textContent = '';
}


function charEvaluation(index){
    let show = true;
    let token;
    if(text[index] === '|'){
        token = extractToken(index+1);
        show = false;
        switch (token){
            case 'distracted':
                character.style.backgroundPositionX = '0'
                break;
            case 'focus':
                character.style.backgroundPositionX = '-200px'
                break;
            case 'judging':
                character.style.backgroundPositionX = '-400px'
                break;
            case 'happy':
                character.style.backgroundPositionX = '-600px'
                break;
            case 'angry':
                character.style.backgroundPositionX = '-800px'
                break;
            case 'pause':
                pause = 1000;
                break;
            case 'jump':
                textDisplay.textContent = '';
                break;
        }
    }else{
        switch(text[index]){
            case ',':
                pause = 300;
                break;
            case ':':
                pause = 300;
                break;
            case '.':
                pause = 300;
                break;
        }
    }
    return show;
}
function extractToken(position){
    let str ='';
    while(true){
        if(text[position]!=='|'){
            str += text[position];
            position++;
        }else{
            i = position;
            break;
        }
    }
    return str;
}