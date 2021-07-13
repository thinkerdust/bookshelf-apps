document.addEventListener('DOMContentLoaded', function(){
    const formBook = document.getElementById('inputBook');

    formBook.addEventListener('submit', function(event){
        event.preventDefault();
        storeBook();
    });

    if(isStorageExist){
        loadDataFromStorage();
    }
});

document.addEventListener('ondatasaved', function(){
    alert('Buku Berhasil Disimpan!');
});

document.addEventListener('ondataloaded', function(){
    refreshDataFromBooks();
})