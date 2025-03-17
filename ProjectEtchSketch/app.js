const container = document.querySelector(".container");
const btn=document.querySelector(".btn");

for (let i = 1; i <=16 *16; i++) {
    //for (let j=1; j<=16; j++){
        let squareDivs = document.createElement("div");
        container.appendChild(squareDivs);
        squareDivs.style.width='calc(100% / 16)';
        squareDivs.style.height='calc(100% / 16)';
        squareDivs.addEventListener('mouseover',()=>{
            squareDivs.style.backgroundColor=newColor();
        });
    //}    
};

function newColor(){
    const r=Math.floor(Math.random()*256);
    const g=Math.floor(Math.random()*256);
    const b=Math.floor(Math.random()*256);
    const nuevoColor=`rgb(${r},${g},${b})`;
    return nuevoColor;
}

function nuevoGrid(size){
   container.innerHTML="";
   for (let i = 1; i <=size; i++) {
        for (let j=1; j<=size; j++){
                let squareDivs = document.createElement("div");
                squareDivs.style.width=`calc(100% / ${size})`;
                squareDivs.style.height=`calc(100% / ${size})`;
                squareDivs.addEventListener('mouseover',()=>{
                    squareDivs.style.backgroundColor=newColor();
                });
            container.appendChild(squareDivs);    
        }    
    }
}



function gridSize(){
   const size= parseInt(prompt('Elije un tamaño de grid desde 2 a 100')); 
   if (size<2 || size>100 || isNaN(size)){
    alert('el numero que elejiste no esta dentro del rango');
    return;
   }
   nuevoGrid(size);
}


btn.addEventListener('click',()=>{
    gridSize();
})

