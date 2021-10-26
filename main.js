//making class
class Book{
    //constructor is a special method in js
    constructor(title,author,isbn){
        
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
//making objects of the constructor
// let book=new Book("Avenger","abhk","1234")
// console.log(book)
class UI{
    static addBookToList(book){
        const list = document.querySelector("#book-list")
    // console.log(list)
    const row = document.createElement("tr")//<tr></tr>
    row.innerHTML=`<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`
    // console.log(row)
    list.appendChild(row)
    }
    static ClearAllFields()
    {
        document.querySelector("#title").value="";
        document.querySelector("#author").value="";
        document.querySelector("#isbn").value="";
    }
    static showAlert(msg,className)
    {
        // console.log(className)
        const div = document.createElement("div")
        div.className= `alert alert-${className}`
        div.appendChild(document.createTextNode(msg))
        const container = document.querySelector(".container")
        const form = document.querySelector("#book-form")
        container.insertBefore(div,form)
        setTimeout(function(){
            document.querySelector(".alert").remove()
        },5000)
    }
    static displayBook(){
        // const StoreBooks=[{
        //     title:'Book One',
        //     author:'John Doe',
        //     isbn:'12345'
    
        // },{
        //     title:'Book Two',
        //     author:'John Yoo',
        //     isbn:'1288'
        // }]
        // const books=StoreBooks;
        const books= Store.getBooks();
    
        books.forEach(kitab => UI.addBookToList(kitab))
    }

    static deleteBook(x){
        if(x.target.classList.contains('delete')){
            if(confirm("Are ou want sure delete this  ?")){
        x.target.parentElement.parentElement.remove()
    
            }
        }
    }
}
class Store {
    static addBook(book)
    {
        const books=Store.getBooks();
        books.push(book)
        localStorage.setItem("books",JSON.stringify(books));
    }
    
    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null)
            books = [];
        else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }
    static removeBook()
    {
        
        const books= Store.getBooks();

    }
}
document.addEventListener('DOMContentLoaded',()=>{
    UI.ClearAllFields();
    UI.displayBook();

})
//Events
// function AddBook(e){
//     e.preventDefault()
//     console.log("Test")
// }

//ANNONAMOUS arrow function
// const AddBook = (e)=>{
//     e.preventDefault()
//     console.log("Test")
// }
document.querySelector("#book-form").addEventListener('submit',(e)=>{
    e.preventDefault()
    // console.log("TesT")
    const title =document.querySelector("#title").value;
    const author =document.querySelector("#author").value;
    const isbn =document.querySelector("#isbn").value;
    // console.log(title,author,isbn)
    //Doing Validation
    if(title== '' || author== '' || isbn== ''){
    UI.showAlert("Please add All the Fields","danger");
        return;
    }
    // alert("Please fill all the fields")
    const book =new Book(title,author,isbn);
    // console.log(book)
    
    UI.addBookToList(book)
    //Local storage
    Store.addBook(book)
    //clear all fileds
    UI.ClearAllFields();
    
    UI.showAlert("Book Added Successfully!!","success");
})
document.querySelector("#book-list").addEventListener('click',(x)=>{
    // console.log("TesT",x.target)
    UI.deleteBook(x);
    Store.removeBook(x.target.parentElement)
    UI.showAlert("Book Deleted Successfully","success");
})