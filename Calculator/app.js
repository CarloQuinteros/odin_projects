const display = document.querySelector("#display");
const botones= document.querySelectorAll(".num");
const clear = document.querySelector(".clear");
const btn_operator=document.querySelectorAll(".btn-operator");
const decimal = document.querySelector(".decimal");
const equal= document.querySelector("#equal");


let numeroActual ="";
let conjuntoNumeros= []; // en caso de tener varios numeros los va guardando;



botones.forEach(boton => {
        boton.addEventListener("click", () => {
            numeroActual += boton.textContent;
            display.value += boton.textContent;
        })
});

decimal.addEventListener("click",()=>{
    if (!numeroActual.includes('.')){
        numeroActual += decimal.textContent;
        display.value += decimal.textContent;
    }
})


btn_operator.forEach(operator =>{
    operator.addEventListener('click',() =>{
        if (numeroActual !==""){
        conjuntoNumeros.push(numeroActual);
        conjuntoNumeros.push(operator.textContent);
        display.value +=operator.textContent;
        numeroActual = "";
        }
    })
});


clear.addEventListener('click',() =>{
    display.value="";
    numeroActual="";
    conjuntoNumeros=[];
});


function calcularOperacion(expresionArray) {
    let operadores = {
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
    };

    // Convertimos números de string a número real
    let valores = expresionArray.map(item => (isNaN(item) ? item : parseFloat(item)));

    
    for (let i = 0; i < valores.length; i++) {
        if (valores[i] === "*" || valores[i] === "/") {
            let resultado = operadores[valores[i]](valores[i - 1], valores[i + 1]);
            valores.splice(i - 1, 3, resultado);
            i--; 
        }
    }

    for (let i = 0; i < valores.length; i++) {
        if (valores[i] === "+" || valores[i] === "-") {
            let resultado = operadores[valores[i]](valores[i - 1], valores[i + 1]);
            valores.splice(i - 1, 3, resultado);
            i--;
        }
    }

    return valores[0]; 
}



equal.addEventListener("click",() =>{
    if (numeroActual!==""){
        conjuntoNumeros.push(numeroActual);
    }
    if (conjuntoNumeros.length>=3){
        let resultado=calcularOperacion(conjuntoNumeros);
        display.value=resultado;
        numeroActual = resultado.toString();
        conjuntoNumeros = [];
    }
});