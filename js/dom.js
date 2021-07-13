const ID_BOOK_COMPLETED = "completeBookshelfList";
const ID_BOOK_UNCOMPLETED = "incompleteBookshelfList";
const BOOK_ID = "bookId";

function makeBook(title, author, year, isCompleted){
    const bookTitle = document.createElement("h2");
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("author");
    bookAuthor.innerText = "Penulis : " + author;

    const bookYear = document.createElement("p");
    bookYear.classList.add("year");
    bookYear.innerText = "Tahun : " + year;

    const btnSection = document.createElement("div");
    btnSection.classList.add("action");

    const section = document.createElement("article");
    section.classList.add("book_item");
    section.append(bookTitle, bookAuthor, bookYear);
    section.append(btnSection);

    if(isCompleted){
        btnSection.append(unfinishedBtn(), deleteBtn());
    }else{
        btnSection.append(finishedBtn(), deleteBtn());
    }

    return section;
}

function unfinishedBtn(){
    return createBtn("btn_unfinished", "Belum Selesai Di Baca", "green", function(event){
        unfinishedBook(event.target.parentElement.parentElement)
    })
}

function finishedBtn(){
    return createBtn("btn_finished", "Selesai Di Baca", "green", function(event){
        finishedBook(event.target.parentElement.parentElement)
    })
}

function deleteBtn(){
    return createBtn("btn_delete", "Hapus Buku", "red", function(event){
        deleteBook(event.target.parentElement.parentElement)
    })
}

function createBtn(btnclass, text, color, eventListener){
    const button = document.createElement("button");
    button.innerText = text;
    button.classList = btnclass;
    button.classList = color;
    button.addEventListener("click", function(event){
        eventListener(event);
    });
    return button;
}

function storeBook(){
    const uncompletedBook = document.getElementById(ID_BOOK_UNCOMPLETED);
    const completedBook = document.getElementById(ID_BOOK_COMPLETED);

    const bookTitleVal = document.getElementById("inputBookTitle").value;
    const bookAuthorVal = document.getElementById("inputBookAuthor").value;
    const bookYearVal = document.getElementById("inputBookYear").value;
    const isCompletedVal = document.getElementById("inputBookIsComplete");

    if (isCompletedVal.checked === true){
        const newBook = makeBook(bookTitleVal, bookAuthorVal, bookYearVal, true);

        const bookObject = composeBookObject(bookTitleVal, bookAuthorVal, bookYearVal, true);

        newBook[BOOK_ID] = bookObject.id;
        books.push(bookObject);

        completedBook.append(newBook);
        updateBook();
    }else{
        const newBook = makeBook(bookTitleVal, bookAuthorVal, bookYearVal, false);

        const bookObject = composeBookObject(bookTitleVal, bookAuthorVal, bookYearVal, false);

        newBook[BOOK_ID] = bookObject.id;
        books.push(bookObject);

        uncompletedBook.append(newBook);
        updateBook();
    }
}

function finishedBook(bookElement){
    const bookCompleted = document.getElementById(ID_BOOK_COMPLETED);

    const bookTitle = bookElement.querySelector(".book_item > h2").innerText;
    const bookAuthor = bookElement.querySelector(".author").innerText.replace("Penulis : ","");
    const bookYear = bookElement.querySelector(".year").innerText.replace("Tahun : ", "");

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);

    const book = findBook(bookElement[BOOK_ID]);
    book.isCompleted = true;
    newBook[BOOK_ID] = book.id;

    bookCompleted.append(newBook);
    bookElement.remove();

    updateBook();
}

function unfinishedBook(bookElement){
    const bookUncompleted = document.getElementById(ID_BOOK_UNCOMPLETED);

    const bookTitle = bookElement.querySelector(".book_item > h2").innerText;
    const bookAuthor = bookElement.querySelector(".author").innerText.replace("Penulis : ","");
    const bookYear = bookElement.querySelector(".year").innerText.replace("Tahun : ", "");

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);
    
    const book = findBook(bookElement[BOOK_ID]);
    book.isCompleted = false;
    newBook[BOOK_ID] = book.id;

    bookUncompleted.append(newBook);
    bookElement.remove();

    updateBook();
}

function deleteBook(bookElement){
    const bookPosition = findbookIndex(bookElement[BOOK_ID]);
    books.splice(bookPosition, 1);

    bookElement.remove();
    updateBook();
}