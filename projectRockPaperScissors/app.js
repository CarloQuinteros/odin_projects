let humanScore=0;
let computerScore=0;

const piedra=document.querySelector('#piedra');
const papel=document.querySelector('#papel');
const tijera=document.querySelector('#tijera');
const img=document.querySelector('#jugador');
const compu=document.querySelector('#computadora');
const wrapped2=document.querySelector(".wrapped2");
const wrapped1=document.querySelector(".wrapped1");
const mensaje=document.querySelector(".mensaje");
const score=document.querySelector(".score");

function getComputerChoice(){
	let numeroAleatorio=Math.floor(Math.random()*3); // saldra un numero del  0 al 2
    let texto="";
    let imagen="";
	switch(numeroAleatorio){
		case 0:	
            texto="piedra";
            imagen='imagenes/piedra.jpg';
            break;
		case 1: 
            texto="papel";
            imagen='imagenes/papel.jpg';
            break;
        case 2:
            texto="tijera";
            imagen='imagenes/tijera.jpg';
            break;
		}
    return {texto , imagen};
	};

function playGame(humanChoice,computerChoice){
    let mensaje ="";
    if (humanChoice===computerChoice){
        mensaje="Empate"
    }
    else if (
        (humanChoice==='piedra' && computerChoice==='tijera')||
        (humanChoice==='papel' && computerChoice==='piedra')||
        (humanChoice==='tijera' && computerChoice==='papel')

    ){
        mensaje="Ganaste";
        humanScore++;
    }else{
        mensaje="Perdiste";
        computerScore++;
    }  
    return mensaje;
}  

function inicioJuego() {
    piedra.addEventListener('click',()=>{
        wrapped1.textContent="Jugador:piedra";
        img.src="imagenes/piedra.jpg";
        img.style.display='block';
        let resultadoComputadora = getComputerChoice(); // Llamamos a la función y guardamos el resultado
        wrapped2.textContent = "Computadora: "+resultadoComputadora.texto; // Mostramos la elección de la PC
        compu.src = resultadoComputadora.imagen; // Mostramos la imagen correspondiente
        compu.style.display='block';
        let resultadoHumano= playGame('piedra',resultadoComputadora.texto);
        mensaje.textContent=resultadoHumano;
        if (humanScore === 5 || computerScore === 5) {
            finalizarJuego();
        }    
    });

    papel.addEventListener('click',()=>{
        wrapped1.textContent="Jugador:papel";
        img.src="imagenes/papel.jpg";
        img.style.display='block';
        let resultadoComputadora = getComputerChoice(); // Llamamos a la función y guardamos el resultado
        wrapped2.textContent = "Computadora: "+resultadoComputadora.texto; // Mostramos la elección de la PC
        compu.src = resultadoComputadora.imagen; // Mostramos la imagen correspondiente
        compu.style.display='block';
        let resultadoHumano= playGame('papel',resultadoComputadora.texto);
        mensaje.textContent=resultadoHumano;
        if (humanScore === 5 || computerScore === 5) {
            finalizarJuego();
        }    

    });

    tijera.addEventListener('click',()=>{
        wrapped1.textContent="Jugador:tijera";
        img.src="imagenes/tijera.jpg";
        img.style.display='block';
        let resultadoComputadora = getComputerChoice(); // Llamamos a la función y guardamos el resultado
        wrapped2.textContent = "Computadora: "+resultadoComputadora.texto; // Mostramos la elección de la PC
        compu.src = resultadoComputadora.imagen; // Mostramos la imagen correspondiente
        compu.style.display='block';
        let resultadoHumano= playGame('tijera',resultadoComputadora.texto);
        mensaje.textContent=resultadoHumano;
        if (humanScore === 5 || computerScore === 5) {
            finalizarJuego();
        }    

    });
};


function finalizarJuego() {
    if (humanScore === 5) {
        score.innerText = `¡Felicidades! Ganaste el juego. Marcador final Humano:${humanScore} vs Computadora:${computerScore}`;
    } else {
        score.innerText = `La computadora ganó. ¡Sigue intentando!. Marcador final Humano:${humanScore} vs Computadora:${computerScore}`;
    }
    piedra.disabled=true;
    papel.disabled=true;
    tijera.disabled=true;
}    


// Llamada para iniciar el juego
inicioJuego();
