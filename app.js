"use strict"
var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display result
        var diceDOM = document.querySelector('.dice'); 
        diceDOM.style.display = 'block';
        diceDOM.src = 'img/dice-' + dice + '.png'; 

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice === 6 && lastDice === 6) {
            // Player loses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else if (dice !== 1) {
            // Add score 
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player
            nextPlayer();
        }
        
        lastDice = dice;

        // If dice was rolled, then disable input field so that players can not change the final score during the game
        var input = document.querySelector('.final-score');
        if (lastDice > 0) return input.disabled = true;
}});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var inputValue = document.querySelector('.final-score').value;
        var winningScore;

        // Undefined, 0, null or "" are COERCED to false
        // Anyhing else i coerced to true
        
        if(inputValue) {
            winningScore = inputValue;
        } else {
            winningScore = 100;
        }


        // Check if player won game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;}        
        else {
            // Next player
            nextPlayer();
}}});
/* Change score function - my way of doing it
document.querySelector('.btn-score').addEventListener('click', function() {
    winScore = document.querySelector('#win-score').value;
});
*/

function nextPlayer() {
        // Next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        // document.querySelector('.player-0-panel').classList.remove('active');
        // document.querySelector('.player-1-panel').classList.add('active');

        document.querySelector('.dice').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);

function init () {
    scores = [0, 0];
    roundScore = 0;
    lastDice = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.final-score').disabled = false;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// var x = document.querySelector('#score-0').textContent;





























