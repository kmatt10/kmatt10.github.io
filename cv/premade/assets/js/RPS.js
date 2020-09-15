function computerPlay () {
	let choice = Math.floor(Math.random()*100)%3;
	switch(choice) {
		case 0:
			return 'rock';
			break;
		case 1:
			return 'paper';
			break;
		case 2:
			return 'scissor';
			break;
		default:
			return "this shouldn't happen (computerPlay)";
	}
}

function toggleButtons(){
	for (let i = 0; i < l-1; i++){
		buttons[i].disabled = (buttons[i].disabled) ? false : true;
	}
}

function resetGame(){
	playerScore = 0;
	computerScore = 0;
	round = 1;
	update();
	finalEle.style.display = "none";
	resultEle.style.display = "none";
	resetEle.style.display = "none";
	toggleButtons();
}

function update(res = ""){
	let resultText = document.createTextNode(res);
	let newPlayerScore = document.createTextNode("Player Score: " + playerScore);
	let newCompScore = document.createTextNode("Javar Score: " + computerScore);
	let newRound = document.createTextNode("round " + round);
	
	playerScoreEle.replaceChild(newPlayerScore,playerScoreEle.childNodes[0]);
	compScoreEle.replaceChild(newCompScore,compScoreEle.childNodes[0]);
	roundEle.replaceChild(newRound,roundEle.childNodes[0]);
	
	if (resultEle.style.display == "none"){
		resultEle.style.display = "block";
	}
	resultEle.replaceChild(resultText,resultEle.childNodes[0]);
}

function playRound(e, computerSelection = computerPlay()){
	const ele = e.target;
	let playerSelection = ele.id;
	console.log("In playRound");
	console.log(playerSelection);
	console.log(computerSelection);
	let result = ''
	switch(playerSelection.substr(0,1).toLowerCase()) {
		case 'r':
			result = (computerSelection == 'paper') ? "You Lose! Paper beats Rock":
					(computerSelection == 'scissor') ? 'You Win! Rock beats Scissor':
					'Draw! Rock v Rock'
			console.log(result);
			// return result;
			break;
		case 'p':
			result = (computerSelection == 'rock') ? "You Win! Paper beats Rock":
					(computerSelection == 'scissor') ? 'You Lose! Scissor beats Paper':
					'Draw! paper v paper'
			console.log(result);
			//return result;
			break;
		case 's':
			result = (computerSelection == 'paper') ? "You Win! Scissor beats Paper":
					(computerSelection == 'Rock') ? 'You Lose! Rock beats Scissors':
					'Draw! Scissor v Scissor'
			console.log(result);
			//return result;
			break;
	}
	
	let pos = result.indexOf("Lose!");
	if(pos == -1){
			if(result.indexOf("Draw!") == -1){
				playerScore++;
			}
		} else {
			computerScore++;
		}
	//Set the elements on the page
	round++
	update(result);
	
	
	
	if(playerScore == 5 || computerScore == 5){
		toggleButtons();
		const ending = (playerScore > computerScore) ? "You Won!" : "You Lost!";
		let finalRes = document.createTextNode(ending);
		finalEle.replaceChild(finalRes,finalEle.childNodes[0]);
		finalEle.style.display = "block";
		resetEle.style.display = "block";
	}
}

let playerScore = 0;
let computerScore = 0;
let round = 0;
const playerScoreEle = document.getElementById("playerScore");
const compScoreEle = document.getElementById("pcScore");
const roundEle = document.getElementById("round");
const resultEle = document.getElementById("subtext");
const finalEle = document.getElementById("finalResult");
const resetEle = document.getElementById("resetGame");
let buttons = document.getElementsByTagName("button");
const l = buttons.length;
for (let i = 0; i < l-1; i++){
	buttons[i].onclick = playRound;
	console.log(buttons[i].id);
}
resetEle.onclick = resetGame;