const playButton = document.querySelector("#play-button");
const playButtonAI = document.querySelector("#play-button-AI");
const optionButton = document.querySelector("#option-button");
const body = document.querySelector("body");
const vid = document.querySelector("video");
let playerAI = false;
let roundNumber = 0;
let overlay = document.querySelector(".overlay");

let p1Score = 0;
let p2Score = 0;
let currentP1;
let currentP2;
let game = document.querySelector(".game");
let p1Board = document.querySelector(".game .p1Tab .scored");
let p2Board = document.querySelector(".game .p2Tab .scored");


let p1Choice = "O";
let p2Choice = "X";
let HUMAN = p1Choice ;
let BOT = p2Choice;
let currentWinner = "Z";
let begun = false;
let turn = p1Choice;
let mainMenu = document.querySelector(".main-menu");
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

playButtonAI.addEventListener("click",()=>{
    playerAI = true;
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

let optionMenu = document.createElement("div");
    optionMenu.style.width = "30vw";
    optionMenu.style.height = "50vh";
    optionMenu.style.marginTop = "10vh";
    optionMenu.style.backgroundColor = "rgba(174, 0, 255, 0.8)";
    optionMenu.style.display = "flex";
    optionMenu.style.flexDirection = "column";
    optionMenu.style.borderRadius = "1rem"; 
    optionMenu.style.border = "1rem outset rgba(174, 0, 255, 0.8)";
    optionMenu.style.zIndex = "12";
    optionMenu.style.justifyContent = "flex-start";
    optionMenu.style.gap = "4rem";
    optionMenu.style.padding = "3rem";
    optionMenu.style.fontSize = "min(3.2vw,2.2rem)";
    optionMenu.style.alignItems = "center";

let themeOption = document.createElement("div");
let theme = document.createElement("input");
theme.type = "color";
themeOption.textContent = "Current Theme";
themeOption.style.display = "flex";
themeOption.style.gap = "2rem";
themeOption.style.backgroundColor = "rgba(253, 56, 56, 0.83)";
themeOption.style.borderRadius = "1rem";
themeOption.style.padding = "0.7rem";
themeOption.style.border = "0.4rem inset rgba(253, 56, 56, 0.83)";
theme.style.width = "3vw";
theme.style.height = "3vw";
theme.style.borderRadius = "1rem";
theme.style.background = "transparent";

theme.addEventListener("change",(e)=>{
    let header = document.querySelector(".header");
    let footer =  document.querySelector(".footer");

    footer.style.backgroundColor = e.target.value;
    header.style.backgroundColor = e.target.value;
    header.style.opacity = "0.8";
    footer.style.opacity = "0.99";
})




themeOption.appendChild(theme);
optionMenu.appendChild(themeOption);

let audioOption = document.createElement("div");
let audio = document.createElement("input");
audio.type = "checkbox";
audioOption.textContent = "Mute Audio?";
audioOption.style.display = "flex";
audioOption.style.gap = "4rem";
audioOption.style.backgroundColor = "rgba(253, 56, 56, 0.83)";
audioOption.style.borderRadius = "1rem";
audioOption.style.padding = "0.7rem";
audioOption.style.border = "0.4rem inset rgba(253, 56, 56, 0.83)";
audio.style.width = "3vw";
audio.style.height = "3vw";
audio.style.borderRadius = "2rem";
audioOption.appendChild(audio);
optionMenu.appendChild(audioOption);

let exitOption = document.createElement("button");
exitOption.textContent = "EXIT";
exitOption.style.width = "7vw";
exitOption.style.height = "3.5vw";
exitOption.style.borderRadius = "1rem";
exitOption.style.marginTop = "1rem";
exitOption.style.border = "0.4rem inset rgba(30, 255, 0, 0.83)";
exitOption.style.backgroundColor = "rgba(30, 255, 0, 0.83)";
exitOption.style.transition = "all 0.4s ease";
exitOption.addEventListener("mouseenter",()=>{

    exitOption.style.backgroundColor = "rgba(25, 184, 4, 0.83)";
    exitOption.style.border = "0.4rem inset rgba(131, 255, 114, 0.83)";
    exitOption.style.transform = "scale(1.2)";
})

exitOption.addEventListener("mouseleave",()=>{

    exitOption.style.backgroundColor = "rgba(30, 255, 0, 0.83)";
    exitOption.style.border = "0.4rem inset rgba(30, 255, 0, 0.83)";
    exitOption.style.transform = "scale(1)";
})

exitOption.addEventListener("click",()=>{
    optionMenu.style.display = "none";
    overlay.style.display = "none";
})

optionMenu.appendChild(exitOption);
optionButton.addEventListener("click",()=>{
    overlay.style.display = "flex";
    optionMenu.style.display = "flex";
    overlay.appendChild(optionMenu);

})
    overlay.addEventListener("click",(e)=>{
         e.stopPropagation();
        optionMenu.style.display = "none";
        overlay.style.display = "none";
    })

optionMenu.addEventListener("click", (e) => {
    e.stopPropagation();
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
    p2name.value = "";
    p1name.value = "";
    p2name.disabled = false;

    if(playerAI)
    {
        p2name.value = "AI";
        p2name.disabled = true;
        
    }
    





    realDeal.addEventListener("click",()=>{

        console.log(p1name.value);
        console.log(p2name.value);

        if(p1name.value && p2name.value){

            currentP1 = p1name.value;
            currentP2 = p2name.value;
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

    console.log("play game called again");

    let ttt = document.querySelector(".gameTab .ttt");
    ttt.style.display = "grid";
    let hamburger = document.querySelector(".game .hamburger");
    hamburger.style.display = "flex";
    let sidebar = document.querySelector(".game .sidebar");
    let exitBar = document.querySelector(".game .exit-bar");
    hamburger.addEventListener("click",()=>{
        console.log("hamburder clicked")
        overlay.style.display = "block";
        sidebar.classList.remove("inactive");
        overlay.addEventListener("click",()=>{
            overlay.style.display = "none";
            sidebar.classList.add("inactive");
        })
    });

    exitBar.addEventListener("click",()=>{
        overlay.style.display = "none";
        sidebar.classList.add("inactive");
    })

    let xit = document.querySelector(".xit");
    let estart = document.querySelector(".estart");

    estart.addEventListener("click",()=>{
        sidebar.classList.add("inactive");
        overlay.innerHTML = ""; // Clear previous content
        overlay.style.display = "none";
        p1Score = 0;
        p2Score = 0;
        roundNumber = 0;
        updateScore("Z");
        turn = p1Choice;
        playGame(); // Restart the game
        permission = true;
    })

    xit.addEventListener("click",()=>{
        sidebar.classList.add("inactive");
        overlay.innerHTML = ""; // Clear previous content
        overlay.style.display = "none";
        hamburger.style.display = "none";
        p1Score = 0;
        p2Score = 0;
        updateScore("Z");
        permission = true;
        playerAI = false;
        roundNumber = 0;
        body.classList.add("play");
        ttt.style.display = "none";
        setTimeout(()=>{
            body.classList.remove("play");          //EXIT
        },1400)
        setTimeout(()=>{
            game.style.display = "none";
            vid.style.display = "block";
            mainMenu.style.display = "flex";
        },1100)
    })







    p1TabName = document.querySelector(".game .p1Tab .tabName");
    p2TabName = document.querySelector(".game .p2Tab .tabName");

    p1TabName.textContent = currentP1;
    p2TabName.textContent = currentP2;


    overlay.style.display = "none";
   let turnCounter = 0;
    
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
                    if(playerAI){
                        console.log("INSIDE player AI block");
                      HUMAN = p1Choice ;
                      BOT = p2Choice;
                      let move =   findBestMove(board);
                      board[move.row][move.col] = "X";

                      console.log(move);
console.log(`Looking for element with row=${move.row}, col=${move.col}`);
console.log([...document.querySelectorAll("[data-indexI]")].map(e => `${e.dataset.indexI},${e.dataset.indexJ}`));


                     let element = document.querySelector(`[data-index-i='${move.row}'][data-index-j='${move.col}']`);


                      console.log(`element is ${element}`);

                      element.dataset.filled = "true"
                      element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#ffffff" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;
                      turnCounter++;
                      turn = p1Choice;
                      checkWin(board, "X", turnCounter); 
                    }
                } else if (turn === "X") {
                    console.log(" else case ran toa dd");
                    e.target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#ffffff" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;
                    e.target.dataset.filled = "true";
                    turn = "O";
                    turnCounter++;
                    board[e.target.dataset.indexI][e.target.dataset.indexJ] = "X";

                    checkWin(board, "X", turnCounter);

                    if(playerAI){
                      HUMAN = p1Choice ;
                      BOT = p2Choice;
                      let move =   findBestMove(board);

                      console.log(move);
                      console.log(`Looking for element with row=${move.row}, col=${move.column}`);
console.log([...document.querySelectorAll("[data-indexI]")].map(e => `${e.dataset.indexI},${e.dataset.indexJ}`));


                      board[move.row][move.col] = "O";
                      let element = document.querySelector(`[data-index-i='${move.row}'][data-index-j='${move.col}']`)



                     console.log(`element is ${element}`);

                      element.dataset.filled = "true"
                      element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>`;
                      turnCounter++;
                      turn = p1Choice;
                      checkWin(board, "O", turnCounter); 
                    }

                }
                 
                else if (turn == "Y"){
                     console.log("fake click works inside turn == Y");
                    HUMAN = p1Choice ;
                    BOT = p2Choice;
                    let move =   findBestMove(board);



                      board[move.row][move.col] = p2Choice;
                      let element = document.querySelector(`[data-index-i='${move.row}'][data-index-j='${move.col}']`)



                     console.log(`element is ${element}`);

                      element.dataset.filled = "true"
                      if(p2Choice == "O")
                      element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>`;
                      else
                      e.target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#ffffff" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;
                      turnCounter++;
                      turn = p1Choice;
                

                }
                    let bestMove = findBestMove(board);
                    console.log(`Best move: row ${bestMove.row}, col ${bestMove.col}`); 
            });


        }
    }

    console.log(" checking turn");
    console.log(turn);
    if(turn == "Y"){
        let fakeClick = document.querySelector(".ttt div");
         console.log(" fake clickin this ");
         console.log(fakeClick);
         setTimeout(()=>{
            fakeClick.click();
         },150)
        
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
    roundNumber++;
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
    retryButton.textContent = "Next Round";
    retryButton.style.padding = "0.5rem 1.5rem";
    retryButton.style.marginTop = "1.5rem";
    retryButton.style.fontSize = "1.2rem";
    retryButton.style.cursor = "pointer";
    retryButton.style.backgroundColor = "#fff";
    retryButton.style.color = "#333";
    retryButton.style.border = "none";
    retryButton.style.borderRadius = "0.5rem";

    let retryButton2 = document.createElement("button");
    retryButton2.textContent = "Restart";
    retryButton2.style.padding = "0.5rem 1.5rem";
    retryButton2.style.marginTop = "1.5rem";
    retryButton2.style.fontSize = "1.2rem";
    retryButton2.style.cursor = "pointer";
    retryButton2.style.backgroundColor = "#fff";
    retryButton2.style.color = "#333";
    retryButton2.style.border = "none";
    retryButton2.style.borderRadius = "0.5rem";

    let retryButton3 = document.createElement("button");
    retryButton3.textContent = "Exit";
    retryButton3.style.padding = "0.5rem 1.5rem";
    retryButton3.style.marginTop = "1.5rem";
    retryButton3.style.fontSize = "1.2rem";
    retryButton3.style.cursor = "pointer";
    retryButton3.style.backgroundColor = "#fff";
    retryButton3.style.color = "#333";
    retryButton3.style.border = "none";
    retryButton3.style.borderRadius = "0.5rem";

    retryButton.addEventListener("click", () => {
        overlay.innerHTML = ""; // Clear previous content
        overlay.style.display = "none";
        if(((roundNumber%2)%2)==1) turn = p2Choice;
        else
        turn = p1Choice;
        console.log(playerAI);
        console.log(p1Score);
        console.log(p2Score);
        if(playerAI && (roundNumber%2)==1) turn = "Y"
        console.log("turn set TO YYYYYY");
        console.log(turn);
        playGame();

         // next Round the game

        permission = true;
    });

        retryButton2.addEventListener("click", () => {
        overlay.innerHTML = ""; // Clear previous content
        overlay.style.display = "none";
        p1Score = 0;
        p2Score = 0;
        roundNumber = 0;
        updateScore("Z");
        turn = p1Choice;
        playGame(); // Restart the game
        permission = true;
    });

        retryButton3.addEventListener("click", () => {

            ttt.style.display = "none";

        overlay.innerHTML = ""; // Clear previous content
        overlay.style.display = "none";
        p1Score = 0;
        p2Score = 0;
        let hamburger = document.querySelector(".game .hamburger");
        hamburger.style.display = "none";
        updateScore("Z");
        permission = true;
        playerAI = false;
        roundNumber = 0;
        body.classList.add("play");

        setTimeout(()=>{
            body.classList.remove("play");          //EXIT
        },1400)
        setTimeout(()=>{
            game.style.display = "none";
            vid.style.display = "block";
            mainMenu.style.display = "flex";
        },1100)


    });


    retryMenu.appendChild(winMessage);
    retryMenu.appendChild(copyTTT);
    retryMenu.appendChild(retryButton);
    retryMenu.appendChild(retryButton2);
    retryMenu.appendChild(retryButton3);
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





// minimax for computer mode



// Check if game is over
function checkWinner(board) {
  const lines = [
    // Rows
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // Columns
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // Diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (
      board[a[0]][a[1]] &&
      board[a[0]][a[1]] === board[b[0]][b[1]] &&
      board[a[0]][a[1]] === board[c[0]][c[1]]
    ) {
      return board[a[0]][a[1]];
    }
  }

  return board.flat().includes("") ? null : "draw";
}

// Evaluate board (heuristic)
function evaluate(board) {
  const winner = checkWinner(board);
  if (winner === BOT) return +10;
  if (winner === HUMAN) return -10;
  return 0;
}

// Minimax with heuristic and depth limit
function minimax(board, depth, isMaximizing, maxDepth) {
  const score = evaluate(board);
  if (score !== 0 || checkWinner(board) === "draw" || depth === maxDepth) {
    return score;
  }

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          board[i][j] = BOT;
          best = Math.max(best, minimax(board, depth + 1, false, maxDepth));
          board[i][j] = "";
        }
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          board[i][j] = HUMAN;
          best = Math.min(best, minimax(board, depth + 1, true, maxDepth));
          board[i][j] = "";
        }
      }
    }
    return best;
  }
}

// Find best move for bot
function findBestMove(board, maxDepth = 4) {
  let bestVal = -Infinity;
  let bestMove = null;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        board[i][j] = BOT;
        let moveVal = minimax(board, 0, false, maxDepth);
        board[i][j] = "";

        if (moveVal > bestVal) {
          bestMove = { row: i, col: j };
          bestVal = moveVal;
        }
      }
    }
  }

  return bestMove;
}
