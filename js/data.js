const STORAGE_KEY = "BOOKSHELF_APPS";

let books = {};

function isStorageExist(){
   if(typeof(Storage) === undefined){
        alert('Browser tidak mendukung local storage');
        return false;
   } 
   return true;
}

function saveBook(){
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event('ondatasaved'));
}

function loadDataFromStorage(){
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if(data !== null);
        books = data;

    document.dispatchEvent(new Event('ondataloaded'));
}

function updateBook(){
    if(isStorageExist())
        saveBook();
}

function composeBookObject(title, author, year, isCompleted){
    return{
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
}

function findBook(bookId){
    for(book of books){
        if(book.id === bookId)
            return book;
    }
    return null;
}

function findbookIndex(bookId){
    let index = 0;
    for(book of books){
        if(book.id === bookId)
            return index;

        index++;
    }
    return -1;
}

function refreshDataFromBooks(){
    const bookUncompleted = document.getElementById(ID_BOOK_UNCOMPLETED);
    const bookCompleted = document.getElementById(ID_BOOK_COMPLETED);

    for(let book of books){
        const newBook = makeBook(book.title, book.author, book.year, book.isCompleted);
        newBook[BOOK_ID] = book.id;

        console.log(newBook)

        // if(book.isCompleted){
        //     bookCompleted.append(newBook);
        // }else{
        //     bookUncompleted.append(newBook);
        // }
    }
}