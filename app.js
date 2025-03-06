let gamSeq=[];
let userSeq=[];

let started=false;
let level=0;
let highScored=0;

let highScore=document.querySelector("#highScore");

btns=['red','yellow','green','purple'];

let h2=document.querySelector('h2');

let start=document.getElementById('start');

function gameOn(){
    if(started==false){
        started=true;
        levelup();
    }
}

start.addEventListener("click",gameOn);

document.addEventListener("keypress",gameOn);

function levelup(){
    userSeq=[];
    level++;
    
    h2.innerText=`level ${level-1}`;

    let randIdx=Math.floor(Math.random()*4);
    let ranCol=btns[randIdx];
    let randBtn=document.querySelector(`.${ranCol}`);
    gamSeq.push(ranCol);
    console.log(gamSeq);

    gamFlash(randBtn);
}

function gamFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250)
}

allBtn=document.querySelectorAll(".btn");

for(btn of allBtn){
    btn.addEventListener("click",userPress);
}

function userPress(){
    let btn=this;
    let userCol=btn.getAttribute("id");

    

    userSeq.push(userCol);
    userFlash(btn);

    checkAns(userSeq.length-1);
}

function userFlash(btn){
    btn.classList.add('userFlash');
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250)
}

function checkAns(idx){
    if(gamSeq[idx]===userSeq[idx]){
        if(gamSeq.length==userSeq.length){
            setTimeout(levelup,1000);
        }
    }
    else{
        h2.innerText=`Game Over...! Your Score is ${level-1}\n Press Any key To Continue`;

        document.querySelector('body').style.backgroundColor="red";

        setTimeout(function(){
            document.querySelector('body').style.backgroundColor="white";

        },250);

        if(highScored<level){
            highScored=level-1;

            highScore.innerText=`High Score is ${highScored}`;
        }

        started=false;
        level=0;
        userSeq=[];
        gamSeq=[];
    }
}
