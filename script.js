const gameArea = document.querySelector('.grid-container');
let move = 0;
let winner = '';
const gameStatus = document.querySelector('.game-status');
const popup = document.querySelector('.popup');
const popupButton = document.querySelector('.popup-button');
const resultsList = document.querySelector('.results-list');
const resultsButton = document.querySelector('.results-button');
const closeResultsButton = document.querySelector('.close-results-button');
const tableItems = JSON.parse(localStorage.getItem('tableItems')) || [];
let tableItem;
console.log(tableItems);

function checkMove(event) {
    if(event.target.classList.contains('grid-item') && event.target.innerHTML === ''){
    move % 2 === 0 ? event.target.innerHTML = 'X' : event.target.innerHTML = 'O';
    move++;
    }
}

function checkVictory() {
    const cells = document.querySelectorAll('.grid-item');
    const winningСombination = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [0,4,8]
    ];

    for(let i=0; i < winningСombination.length; i++){
        if(cells[winningСombination[i][0]].innerHTML === 'X' && cells[winningСombination[i][1]].innerHTML === 'X' && cells[winningСombination[i][2]].innerHTML  === 'X'){
            winner = 'Crosses';
            writeScoreData(winner, move);
            writeResultsList();
            return prepareResult(winner, move);
        } else if(cells[winningСombination[i][0]].innerHTML === 'O' && cells[winningСombination[i][1]].innerHTML === 'O' && cells[winningСombination[i][2]].innerHTML  === 'O'){
            winner = 'Noughts';
            writeScoreData(winner, move); 
            writeResultsList();
            return prepareResult(winner, move);
        } 
    }
        
    if(move === 9){
        winner = 'It\'s draw!';
        writeScoreData(winner, move);
        writeResultsList();
        return prepareResult(winner, move);
    }
}

gameArea.addEventListener('click', (event) => {
    checkMove(event);
    checkVictory();
});

function prepareResult(winner, move){
    if(winner === 'It\'s draw!'){
        gameStatus.innerHTML = `${winner}`;
    }else{
        gameStatus.innerHTML =`${winner} won in ${move} moves`;
    }
    popup.classList.add('open');
    soundClick();
    const iconContainer = document.querySelector('.icon-container');
    iconContainer.classList.add('icon-container-little');
}

function closeModal() {
    popup.classList.remove('open');
    location.reload();
}

function soundClick() {
    const audio = new Audio(); 
    audio.src = `./assets/audio/squid-game-theme.mp3`; 
    audio.autoplay = true; 
  }

function writeScoreData(winner, move) {
    tableItem = {
       'winner': winner,
       'move': move
    }
    tableItems.unshift(tableItem);
    tableItems.splice(10);
    localStorage.setItem('tableItems', JSON.stringify(tableItems));
}

function writeResultsList() {
    console.log(tableItems);
    for(let i=0; i < tableItems.length; i++){
        let listItem = document.createElement('li');
        listItem.className = "list-item";
        listItem.innerHTML = `${tableItems[i].winner} - ${tableItems[i].move} moves`;
        resultsList.append(listItem);
    }
}

function openResults() {
    resultsList.classList.add('open-results');
    closeResultsButton.classList.add('open-results');
}

function closeResults() {
    resultsList.classList.remove('open-results');
    closeResultsButton.classList.remove('open-results');
}

popupButton.addEventListener('click', closeModal);
resultsButton.addEventListener('click', openResults);
closeResultsButton.addEventListener('click', closeResults);
writeResultsList();
