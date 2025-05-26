const playButton = document.querySelector("#play-button");
const body = document.querySelector("body");
const vid = document.querySelector("video");

let overlay = document.querySelector(".overlay");

let p1Score = 0;
let p2Score = 0;
let p1Board = document.querySelector(".game .p1Tab .scored");
let p2Board = document.querySelector(".game .p2Tab .scored");


let p1Choice = "O";
let p2Choice = "X";
currentWinner = "Z";
let begun = false;
let turn = p1Choice;
mainMenu = document.querySelector(".main-menu");
let permission = true;

playButton.addEventListener("click",()=>{
    console.log(" click working")
    body.classList.add("play");
    setTimeout(()=>{
        mainMenu.style.display = "none";
        initiateGame();                     //only reveal if game initiates
        setTimeout(()=>{
            body.classList.remove("play")
        },300);
          
    },1100)
    
});



//function to control game
function initiateGame(){
console.log("inside initiate function");

vid.style.display = "none";

let selectionMenu = document.querySelector(".player-selection");
selectionMenu.style.display = "flex";
generateSelection();
if(begun)
{
console.log("return true all is well");
}

else{
console.log("I check but not begun");
}

}





// function to generate player selection menu

function generateSelection(){

    let playerSelection = document.querySelector(".player-selection");

    let playerOneBox = document.querySelector(".player-one");
    let playerTwoBox = document.querySelector(".player-two");


    let p1Circ = document.querySelector(".player-one .select > .Scircle");
    let p1Cros = document.querySelector(".player-one .select > .Scross");
    let p2Circ = document.querySelector(".player-two .select > .Scircle");
    let p2Cros = document.querySelector(".player-two .select > .Scross");
    let selectBox = document.querySelector(".selection-box");
    let opts = [];
    opts.push(p1Circ);
    opts.push(p1Cros);
    opts.push(p2Circ);
    opts.push(p2Cros);
    
    for(let item of opts){
        item.addEventListener("click",(e)=>{
            
             console.log(" click working");
             const value = e.currentTarget.getAttribute("data-value");
             if(e.currentTarget.parentElement.parentElement.classList.contains("player-one")){
                playerOneBox.classList.add("selected");
                setTimeout(()=>{
                    playerOneBox.classList.remove("selected");
                },400)
             }
             else{
                playerTwoBox.classList.add("selected");
                setTimeout(()=>{
                    playerTwoBox.classList.remove("selected");
                },400)
             }
             console.log(value);
            if(value == "O")
            {
                p1Choice = "O";
                p2Choice = "X";
                selectBox.classList.add("circle");
                selectBox.classList.remove("cross");
            }
            else{
                p2Choice = "O";
                p1Choice = "X";
                selectBox.classList.add("cross");
                selectBox.classList.remove("circle");
            }
        })
    }

    let realDeal = document.querySelector(".start-button .real");
    let p1name = document.querySelector(".player-one>input")
    let p2name = document.querySelector(".player-two>input")







    realDeal.addEventListener("click",()=>{

        console.log(p1name.value);
        console.log(p2name.value);

        if(p1name.value && p2name.value){


    setTimeout(()=>{
     body.classList.add("play");
    },300)
       

        setTimeout(()=>{
        playerSelection.style.display = "none";    //only reveal if game initiates
        setTimeout(()=>{
            turn = p1Choice;
            playGame();
            body.classList.remove("play")
        },1200);
        return true;
          
    },1400)
        }
        else{
            alert("Enter Both User Names");
        }
    })

}




function playGame() {

    overlay.style.display = "none";
    turnCounter = 0;
    let game = document.querySelector(".game");
    game.style.display = "flex";

    let boxes = Array.from(document.querySelectorAll(".ttt div"));
    let board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i][j] = "";

        
            const index = j + (3 * i);
            const oldBox = boxes[index];
            const newBox = oldBox.cloneNode(false); 
            oldBox.replaceWith(newBox);
            boxes[index] = newBox; 

            newBox.innerHTML = ``;
            console.log("initialez datasets and evnet listne");
            newBox.dataset.indexI = i;
            newBox.dataset.indexJ = j;
            newBox.dataset.filled = false;

            newBox.addEventListener("click", (e) => {

                console.log(board);
                console.log("current permission");
                console.log(permission);

                if (!permission) return;
                console.log("game click working");
                console.log(e.target.dataset.filled);

                if (e.target.dataset.filled == "true") {
                    console.log(" goes to if block???");
                    return;
                } else if (turn === "O") {
                    console.log(" goes to else if not happenenin block???");
                    e.target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>`;
                    e.target.dataset.filled = "true";
                    turn = "X";
                    turnCounter++;
                    board[e.target.dataset.indexI][e.target.dataset.indexJ] = "O";

                    checkWin(board, "O", turnCounter);
                } else if (turn === "X") {
                    console.log(" else case ran toa dd");
                    e.target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#ffffff" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;
                    e.target.dataset.filled = "true";
                    turn = "O";
                    turnCounter++;
                    board[e.target.dataset.indexI][e.target.dataset.indexJ] = "X";

                    checkWin(board, "X", turnCounter);
                }
            });
        }
    }
}


function checkWin(board, player, tnum) {



    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i].every(cell => cell === player)) {
            return roundEnd(player);
        }
    }

    // Check columns
    for (let j = 0; j < 3; j++) {
        if (board.every(row => row[j] === player)) {
            return roundEnd(player);
        }
    }

    // Check main diagonal
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
        return roundEnd(player);
    }

    // Check anti-diagonal
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        return roundEnd(player);
    }

        if(tnum == 9){
        console.log("ITS A DRAW")
        permission = false;
        return roundEnd("Z");
    }

    return;
}




function roundEnd(winner){
    updateScore(winner);
    console.log("round has ended");
    let winPlayer = "none";
    console.log(`p1Choice is ${p1Choice}`);
    console.log(`p2Choice is ${p2Choice}`);
    console.log(`winner is ${winner}`);
    if(p1Choice == winner){
        winPlayer = "Player One"
    }
    else if (p2Choice == winner){
        winPlayer = "Player Two"
    }

    console.log(`winPlayer is ${winPlayer}`);

    permission = false;
    setTimeout(()=>{
        overlay.style.display = "flex";    
    }, 2400);

    let retryMenu = document.createElement("div");
    retryMenu.classList.add("retry-menu");
    retryMenu.style.width = "40vw";
    retryMenu.style.height = "auto";
    retryMenu.style.backgroundColor = "#333";
    retryMenu.style.color = "#fff";
    retryMenu.style.marginTop = "20vh";
    retryMenu.style.padding = "2rem";
    retryMenu.style.display = "flex";
    retryMenu.style.flexDirection = "column";
    retryMenu.style.alignItems = "center";
    retryMenu.style.borderRadius = "1rem";
    retryMenu.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.5)";

    let ttt = document.querySelector(".gameTab .ttt");
    const copyTTT = ttt.cloneNode(true);
    copyTTT.style.display = "grid";
    copyTTT.style.gridTemplateColumns = "1fr 1fr 1fr";
    copyTTT.style.gridTemplateRows = "1fr 1fr 1fr";
    copyTTT.style.height = "27vw";
    copyTTT.style.width = "27vw";
    Array.from(copyTTT.children).forEach(child => {
        child.style.width = "9vw";
        child.style.height = "9vw";
    });

    let winMessage = document.createElement("h1");
    winMessage.textContent = (winPlayer == "none") ? "IT'S A DRAW ;(" : `${winPlayer} has Won!!!`;
    winMessage.style.marginBottom = "1rem";

    let retryButton = document.createElement("button");
    retryButton.textContent = "Play Again";
    retryButton.style.padding = "0.5rem 1.5rem";
    retryButton.style.marginTop = "1.5rem";
    retryButton.style.fontSize = "1.2rem";
    retryButton.style.cursor = "pointer";
    retryButton.style.backgroundColor = "#fff";
    retryButton.style.color = "#333";
    retryButton.style.border = "none";
    retryButton.style.borderRadius = "0.5rem";

    retryButton.addEventListener("click", () => {
        overlay.innerHTML = ""; // Clear previous content
        overlay.style.display = "none";
        playGame(); // Restart the game
        permission = true;
    });

    retryMenu.appendChild(winMessage);
    retryMenu.appendChild(copyTTT);
    retryMenu.appendChild(retryButton);
    overlay.appendChild(retryMenu);
}


function updateScore(winner){
    if(p1Choice == winner){
        p1Score++;
    }
    else if (p2Choice == winner){
        p2Score++;
    }
    
    p1Board.textContent = p1Score;
    p2Board.textContent = p2Score;
    return;
}

updateScore("Z");

// white circle
// <svg  cxmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>

// white cross
// <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>

