const myLibrary = [];
const btnAgregar = document.querySelector(".btn-agregar");
const booksAddTable = document.getElementById("books-add");
const dialog = document.getElementById("dialog");
const closeDialog=document.getElementById("close-dialog");
const form=document.querySelector(".form");
const cancelDialog=document.querySelector("#cancel-dialog");

function Books(title,author,numberPages,read){
    this.id = crypto.randomUUID(),
    this.title=title,
    this.author=author,
    this.numberPages=numberPages,
    this.read=read
       };
    


function addBookToLibrary(title,author,numberPages,read){
    myLibrary.push(new Books(title,author,numberPages,read));
}

addBookToLibrary("The Hobbit","JRR Tolkien",350,'Yes');
addBookToLibrary("The Lion, The Witch, and the Wardrobe","CS Lewis", 245, 'Yes')
addBookToLibrary("War and Peace","Leo Tolstoy",90000,'No');

function addBookToTable(){
    booksAddTable.replaceChildren();
    for (const book of myLibrary) {
        const tr = document.createElement("tr");
        booksAddTable.appendChild(tr);

        for (const valor in book) {
            if(valor !== 'id') {
                const td = document.createElement("td");
                td.textContent=book[valor];
                tr.appendChild(td);
                
            }
        }
        // Delete
        const deleteTd = document.createElement("td")
        const deleteButton = document.createElement("button");
        deleteButton.textContent='Delete';
        deleteButton.setAttribute("data-id",book.id);
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => deleteBook(book.id));
       // deleteButton.addEventListener("click", () => removeBook(book.id));
        deleteTd.appendChild(deleteButton);
        tr.appendChild(deleteTd);

        // Edit
        const toggleTd = document.createElement("td");
        const toggleButton = document.createElement("button");
        toggleButton.textContent = book.read === "Yes" ? "Mark as Unread" : "Mark as Read";
        toggleButton.setAttribute("data-id", book.id);
        toggleButton.classList.add("toggle-button");
        toggleButton.addEventListener("click", () => toggleBook(book.id));
        toggleTd.appendChild(toggleButton);
        tr.appendChild(toggleTd);
    }

    
}



btnAgregar.addEventListener('click',()=>{
    dialog.show();

});

cancelDialog.addEventListener('click',()=>{
    dialog.close();
    form.reset();
});

closeDialog.addEventListener('click',()=>{
    const title= document.getElementById("title");
    const author= document.getElementById("author");
    const numPages= document.getElementById("numPages");
    const readIt= document.querySelector('input[name="readIt"]:checked');
    if (title.value === "" || author.value  === "" || numPages.value === "") {
        alert("You must submit a value for all fields.")
    }
    else{
        addBookToLibrary(title.value,author.value,numPages.value,readIt.value);
        addBookToTable();
        dialog.close();
        form.reset();
    }

    
});


function deleteBook(bookId) {
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        addBookToTable();
    }
}

function toggleBook(bookid){
    const libro = myLibrary.find(book => book.id === bookid);
    if (libro) {
        libro.read = libro.read === 'Yes' ? 'No' : 'Yes';
        addBookToTable();
    } 

}

addBookToTable();