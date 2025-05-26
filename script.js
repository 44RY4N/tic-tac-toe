const playButton = document.querySelector("#play-button");
const body = document.querySelector("body");
const vid = document.querySelector("video");

let p1Choice = "O";
let p2Choice = "X";
let begun = false;

mainMenu = document.querySelector(".main-menu");

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




function playGame(){

    
}