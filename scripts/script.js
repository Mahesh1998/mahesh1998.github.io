numRows = 6
numCols = 7
// default value is 0. Fill value 1 for player1 and 2 for player2
playerGrid = Array.from(Array(numRows), () => new Array(numCols).fill(0));
playerNames = ["", ""]
activePlayer = 1

/* Creating the grid */
function grid() {
    
    for (let i = 0; i < numRows; i++) {
        var row = document.getElementById('connect4Board').appendChild(document.createElement("div"));
        row.className = "row";
        row.id = "row" + i;
        for(j=0; j<numCols; j++) {
            var col = document.getElementById(row.id).appendChild(document.createElement("div"));
            col.className = 'col';
            col.id = "col-" + i + "-" + j;
        }
    };
};

function check_winner() {
    // Check horizontally
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col <= numCols - 4; col++) {
            if (playerGrid[row][col] === activePlayer &&
                playerGrid[row][col + 1] === activePlayer &&
                playerGrid[row][col + 2] === activePlayer &&
                playerGrid[row][col + 3] === activePlayer) {
                return true;
            }
        }
    }

    // Check vertically
    for (let col = 0; col < numCols; col++) {
        for (let row = 0; row <= numRows - 4; row++) {
            if (playerGrid[row][col] === activePlayer &&
                playerGrid[row + 1][col] === activePlayer &&
                playerGrid[row + 2][col] === activePlayer &&
                playerGrid[row + 3][col] === activePlayer) {
                return true;
            }
        }
    }

    // Check diagonally (top-left to bottom-right)
    for (let row = 0; row <= numRows - 4; row++) {
        for (let col = 0; col <= numCols - 4; col++) {
            if (playerGrid[row][col] === activePlayer &&
                playerGrid[row + 1][col + 1] === activePlayer &&
                playerGrid[row + 2][col + 2] === activePlayer &&
                playerGrid[row + 3][col + 3] === activePlayer) {
                return true;
            }
        }
    }

    // Check diagonally (bottom-left to top-right)
    for (let row = numRows - 1; row >= 3; row--) {
        for (let col = 0; col <= numCols - 4; col++) {
            if (playerGrid[row][col] === activePlayer &&
                playerGrid[row - 1][col + 1] === activePlayer &&
                playerGrid[row - 2][col + 2] === activePlayer &&
                playerGrid[row - 3][col + 3] === activePlayer) {
                return true;
            }
        }
    }

    // If no winner is found
    return false;
}

function fillColor(row, col){
    for(let i = numRows - 1; i >= 0; i--){
        if (playerGrid[i][col] == 0){
            let currentBlock = document.getElementById("col-" + i + "-" + col);

            if (activePlayer === 1) {
                playerGrid[i][col] = 1;
                currentBlock.classList.add("player1-background-color");
            }
            else {
                playerGrid[i][col] = 2;
                currentBlock.classList.add("player2-background-color");
            }
            if (check_winner()){
                let board = document.getElementById("connect4Board");
                board.classList.add("disabled-div");
                console.log("Player " + activePlayer + " won the game.");
                let gameOver = document.getElementById("game-over-data");
                gameOver.classList.remove("game-over-hide");
                let result = document.getElementById("winner-info");
                result.classList.add("result");
                result.innerHTML = playerNames[activePlayer - 1] + " won the match.";
            }
            break;
            
        }

    }
    if ((activePlayer + 1) % 2 === 0){
        activePlayer = 2;
    }
    else{
        activePlayer = 1;
    }

}

function startGame(event) {
    
    let playersData = document.getElementById("players-data");
    playerNames[0] = playersData.player1.value;
    playerNames[1] = playersData.player2.value;

    // close popup and display game
    document.getElementById("content").classList.remove("blur");
    document.getElementById("players-data-popup").classList.remove("popup-active");

    // display players information
    document.getElementById("player1Name").innerHTML = "Player1: " + playerNames[0];
    document.getElementById("player2Name").innerHTML = "Player2: " + playerNames[1];

}

function restartGame(e){
    e.preventDefault();
    location.reload();
}

function main(){

    document.getElementById("players-data-popup").classList.add("popup-active");
    document.getElementById("content").classList.add("blur");
    grid();


    let colElements = document.getElementsByClassName("col");
    for(let i = 0; i < colElements.length; i++){
        let elementLocation = colElements[i].id.split("-");
        colElements[i]
        .addEventListener("click", function(event) {
            fillColor(elementLocation[1], elementLocation[2]);
        });
    }

    
    let playersData = document.getElementById("players-data-form-submit").addEventListener("click", startGame);
    

    let gameOverForm = document.getElementById("game-over-data");
    gameOverForm.addEventListener("submit", restartGame);
}

main()





