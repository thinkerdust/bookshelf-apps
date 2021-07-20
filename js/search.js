const searchBook = document.getElementById('searchBook');

searchBook.addEventListener('submit', function(e){
    e.preventDefault();
    const searchBookTitle = document.getElementById('searchBookTitle').value.toLowerCase();
    const bookItem = document.querySelectorAll(".book_item");

    for (book of bookItem){
        let text = book.querySelector(".book_item > h2").innerText;
        if(text.toLowerCase().indexOf(searchBookTitle) > -1){
            book.style.display = '';
        }else{
            book.style.display = 'none';
        }
    }
    
})