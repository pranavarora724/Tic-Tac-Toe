let currentPlayer = "X";

let player_turn = document.querySelector(".player_turn");
let boxes = document.querySelectorAll(".box");
let btn = document.querySelector(".btn");

let winning_chances = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6],
];

let arr = ["","","","","","","","",""];

let check = false;
let check_tie = false;

let winner = "";

onLoad();

function onLoad(){
    // let ind = 0;
    boxes.forEach((box , index) => {
        box.addEventListener("click" , ()=>{

            handle_click(index);
            // ind++;
        });       
    });
    
}

function handle_click(index)
{
    if(arr[index] == "")
    {
        arr[index]=currentPlayer;
        boxes[index].innerText = `${currentPlayer}`;

        // make that Box unclickable
        boxes[index].style.pointerEvents = "none";

        
        // Check agar koi bnda jeet to nhi gaya
        checkGameOver();

        if(check_tie==true && check==false)
        player_turn.innerText = `MATCH TIED !!`;


        if(check == true)
        player_turn.innerText=`WINNER = ${currentPlayer}`;
       else
        swapPlayer();

        
        if(check_tie==true && check==false)
        player_turn.innerText = `MATCH TIED !!`;

        btn.classList.add("btn_active");
        btn.addEventListener("click" , ()=>{
            newGame();
        });
       
    }
}

function swapPlayer()
{
    if(currentPlayer == "X")
    {
        currentPlayer = "O";
        player_turn.innerText = "Player Turn = O";
    }
    else{
        currentPlayer = "X";
        player_turn.innerText = "Player Turn = X";
    }
}

function checkGameOver(){

    // CHECK IF GAME TIED
    let count = 0;
    for(let i=0 ; i<arr.length;i++)
    {
        if(arr[i]==="")
        count++;
    }

    if(count==0)
    {
        // GAME TIED
        player_turn.innerText = `MATCH TIED !!`;
        check_tie = true;
        
    }

    winning_chances.forEach((win) =>{

        // console.log(win);
        
        if( ( arr[win[0]] == arr[win[1]]  && arr[win[0]] == arr[win[2]] )  && 
        arr[win[0]]!="" && arr[win[1]]!= "" && arr[win[2]] !="" )
        {

            winner = currentPlayer;

            player_turn.innerText = `WINNER = ${currentPlayer}`;

            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            });

            boxes[win[0]].classList.add("win");
            boxes[win[1]].classList.add("win");
            boxes[win[2]].classList.add("win");

            check = true;
        }
    });
}

function newGame()
{
     arr = ["","","","","","","","",""];
     currentPlayer = "X";
      check = false;


    boxes.forEach((box , index) =>{
        box.innerText="";
        box.classList.add(`box` ,`box${index+1}`);
        box.classList.remove("win");
        box.style.pointerEvents = "all";
    });

    onLoad();
}