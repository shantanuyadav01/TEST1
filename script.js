const buttons = document.querySelectorAll(".pick");
const myScoreEle = document.getElementById("your-score");
const pcScoreEle = document.getElementById("computer-score");
const bottom = document.getElementById("bottom");
const result = document.getElementById("result");
const playAgain = document.getElementById("play-again");
const playAgainWin = document.getElementById("play-again-win");
const your_choice = document.getElementById("your-choice");
const pc_choice = document.getElementById("pc-choice");
const against = document.getElementById("against");
const matchDraw = document.getElementById("draw");
const rulesPopup = document.getElementById("popup");
const scoreCard = document.getElementById("scorecard");
const winPage = document.getElementById("winPage");
const yourFinal = document.getElementById("your-final");
const pcFinal = document.getElementById("pc-final");

// Function Buttons
const buttonNext = document.getElementById("next");
const buttonRules = document.getElementById("rules");
const buttonRulesWin = document.getElementById("rules-win");
const closeBtn = document.getElementById("close");

const options = ["paper", "rock", "scissors"];

let userMove = undefined;
let myScore = Number(getMyScore());
let pcScore = Number(getPCScore());

buttons.forEach((button) => {
	button.addEventListener("click", () => {
		userMove = button.getAttribute("selection");
		winner();
	});
});

playAgain.addEventListener("click", () => {
	bottom.style.display = "flex";
	result.style.display = "none";
	buttonRules.style.visibility = "visible";
	buttonNext.style.visibility = "hidden";
	buttonRulesWin.style.visibility = "hidden";
});
playAgainWin.addEventListener("click", () => {
	scoreCard.style.display = "flex";
	bottom.style.display = "flex";
	result.style.display = "none";
	winPage.style.display = "none";
});

buttonRules.addEventListener("click", () => {
	rulesPopup.style.display = "flex";
});
buttonRulesWin.addEventListener("click", () => {
	rulesPopup.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
	rulesPopup.style.display = "none";
});
buttonNext.addEventListener("click", () => {
	scoreCard.style.display = "none";
	bottom.style.display = "none";
	result.style.display = "none";
	winPage.style.display = "flex";
	buttonRules.style.visibility = "visible";
	buttonNext.style.visibility = "hidden";
	buttonRulesWin.style.visibility = "hidden";
});

function winner() {
	const pcMove = randomMove();
	displayResult(your_choice, userMove);
	displayResult(pc_choice, pcMove);
	if (userMove === pcMove) {
		//draw
		matchDraw.innerText = "TIE UP";
		against.style.visibility = "hidden";
		playAgain.innerText = "Replay";
		// buttonRulesWin.style.visibility = "hidden";
		buttonRules.style.visibility = "visible";
		buttonNext.style.visibility = "hidden";
		pc_choice.classList.remove("winner");
		your_choice.classList.remove("winner");
	} else if (
		(userMove === "paper" && pcMove === "rock") ||
		(userMove === "rock" && pcMove === "scissors") ||
		(userMove === "scissors" && pcMove === "paper")
	) {
		//user won
		updateMyScore(1);
		matchDraw.innerText = "You Won";
		against.style.visibility = "visible";
		playAgain.innerText = "Play Again";
		buttonNext.style.visibility = "visible";
		buttonRules.style.visibility = "hidden";
		buttonRulesWin.style.visibility = "visible";
		your_choice.classList.add("winner");
		pc_choice.classList.remove("winner");
		// buttonRules.style.marginRight = "170px";
	} else {
		//pc won
		updatePCScore(1);
		matchDraw.innerText = "You Lost";
		against.style.visibility = "visible";
		playAgain.innerText = "Play Again";
		// buttonRulesWin.style.visibility = "hidden";
		buttonRules.style.visibility = "visible";
		buttonNext.style.visibility = "hidden";
		pc_choice.classList.add("winner");
		your_choice.classList.remove("winner");
	}
	// display result
	bottom.style.display = "none";
	result.style.display = "flex";
}

function updateMyScore(value) {
	myScore += value;
	myScoreEle.innerText = myScore;
	updateMyScoreLocalStorage();
}

function updatePCScore(value) {
	pcScore += value;
	pcScoreEle.innerText = pcScore;
	updatePCScoreLocalStorage();
}

function randomMove() {
	return options[Math.floor(Math.random() * options.length)];
}

function displayResult(selected, option) {
	selected.classList.remove("btn-rock");
	selected.classList.remove("btn-paper");
	selected.classList.remove("btn-scissors");

	const icon = selected.querySelector("img");
	selected.classList.add(`btn-${option}`);
	icon.src = `./assets/${option}.png`;
	icon.alt = option;
}

function updateMyScoreLocalStorage() {
	return localStorage.setItem("myScore", myScore);
}
function updatePCScoreLocalStorage() {
	return localStorage.setItem("pcScore", pcScore);
}

function getMyScore() {
	const numReg = /^-?[\d.]+(?:e-?\d+)?$/;
	let myScore;
	if (
		localStorage.getItem("myScore") === null ||
		!localStorage.getItem("myScore").match(numReg)
	) {
		localStorage.setItem("myScore", "0");
		myScore = "0";
	} else {
		myScore = localStorage.getItem("myScore");
		myScoreEle.innerText = localStorage.getItem("myScore");
	}

	return myScore;
}
function getPCScore() {
	const numReg = /^-?[\d.]+(?:e-?\d+)?$/;
	let pcScore;
	if (
		localStorage.getItem("pcScore") === null ||
		!localStorage.getItem("pcScore").match(numReg)
	) {
		localStorage.setItem("pcScore", "0");
		pcScore = "0";
	} else {
		pcScore = localStorage.getItem("pcScore");
		pcScoreEle.innerText = localStorage.getItem("pcScore");
	}

	return pcScore;
}
