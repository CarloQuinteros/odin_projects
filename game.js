let humanScore=0;
let computerScore=0;

function getComputerChoice(){
	let numeroAleatorio=Math.floor(Math.random()*3); // saldra un numero del  0 al 2
	switch(numeroAleatorio){
		case 0:	return "Rock";
		case 1: return	"Paper";
		default: return "Scissors";
		}
	}

//console.log(getComputerChoice());


function getHumanChoice(){
	let opcion=prompt("Elije una opcion");
	let opciones =['Rock','Paper','Scissors'];
	if (opciones.includes(opcion)){
		return opcion;
		}
	else {
		console.log("Error elije entre las opciones Rock,Papers,Scissors");
		return null;
	
		}
	}
//console.log(getHumanChoice());	

function playGame(humanChoice,computerChoice){
	console.log(`Humano: ${humanChoice}`);
    console.log(`Computadora: ${computerChoice}`);
	if (humanChoice===computerChoice){
		console.log("Empate");
		return "Tie";
		}
	else if (humanChoice==='Rock' && computerChoice==='Scissors'){
		console.log("You Won");
		//return "You won, Rock beats Scissors";
		humanScore++;
		}	
	else if (humanChoice==='Rock' && computerChoice==='Paper'){
		console.log("You loose");
		//return "You loose, Paper beats Rock";
		computerScore++;
		}
	else if (humanChoice==='Paper' && computerChoice==='Scissors'){
		console.log("You loose");
		//return "You loose, Scissors beats Paper";
		computerScore++;
		}	
	else if (humanChoice==='Paper' && computerChoice==='Rock'){
		console.log("You Won");
		//return "You won, Paper beats Rock";
		humanScore++;
		}		
	else if (humanChoice==='Scissors' && computerChoice==='Rock'){
		console.log("You loose");
		//return "You loose, Rock beats Scissors";
		computerScore++;
		}	
	else if (humanChoice==='Scissors' && computerChoice==='Paper'){
		console.log("You Won");
		//return "You won, Scissors beats Paper";
		humanScore++;
		}		
	}

function inicioJuego(){
	while (humanScore<5 && computerScore<5){
	
		let humanChoice = getHumanChoice();
		if (!humanChoice) continue; // Si la entrada es inválida, repetir la ronda
		let computerChoice = getComputerChoice();
		playGame(humanChoice, computerChoice);
		}
	// Mostrar el resultado final
    if (humanScore === 5) {
        console.log(`¡Felicidades! Ganaste el juego. Marcador final Humano:${humanScore} vs Computadora:${computerScore}`);
    } else {
        console.log(`La computadora ganó. ¡Sigue intentando!. Marcador final Humano:${humanScore} vs Computadora:${computerScore}`);
    }	
}	
	
inicioJuego();	