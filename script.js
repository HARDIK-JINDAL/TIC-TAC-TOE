

const winPattern = [
    [0,1,2], [0,3,6], [0,4,8], [1,4,7],
    [2,5,8], [2,4,6], [3,4,5], [6,7,8]
];
let btn = document.querySelectorAll(".btn");
let turnO = true;  // Track whose turn it is, X's turn is true, O's is false
let reset = document.getElementById('restart');


btn.forEach((box) => {
    box.addEventListener('click', function() {
        
        
        if (box.innerText === '') {
            if (turnO) {
                box.innerText = 'X';  
                box.style.fontSize = '50px';  
                box.style.color="#7E3C6C";
                box.disabled = true;
            } else {
                box.innerText = 'O';  
                box.style.fontSize = '50px';  
                box.style.color="#7A1D6B";
                box.disabled = true;
            }

            // Toggle turn
            turnO = !turnO;  // Switch the turn after each move
            checkWinner();
        }
    });
});

function checkWinner() {
    for (let pattern of winPattern) {
        let pos1val = btn[pattern[0]].innerText;
        let pos2val = btn[pattern[1]].innerText;
        let pos3val = btn[pattern[2]].innerText;
        
        // Check if all positions have the same non-empty value
        if (pos1val === pos2val && pos2val === pos3val && pos1val !== '') {
            
            btn.forEach(function(button) {
                button.disabled = true;  // Disables the button
            });

            showWinner();
            
        }
    }
}

function showWinner() {
    let newDiv = document.createElement('div');  // Create a new div element
    newDiv.classList.add('winner');  // Add a class to the new div
    
    let winner = 'O';
    if (!turnO) {
        winner = 'X';  // If it's not player X's turn, player O is the winner
    }

    newDiv.innerText = `Winner is ${winner}`;   

    let contain = document.getElementsByClassName("container")[0];  // Get the container element
    contain.appendChild(newDiv);  // Append the new div to the container
}

reset.addEventListener("click",function(){
    btn.forEach(function(button){
        button.disabled=false;
        button.innerText="";
        let winnerMessage = document.querySelector('.winner');
        if (winnerMessage) {
            winnerMessage.remove();  // Remove the winner message
        }
    })
})