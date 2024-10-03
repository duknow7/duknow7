const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list');
const bookCount = document.getElementById('book-count');
const deleteAllBtn = document.getElementById('delete-all');
const refreshBtn = document.getElementById('refresh');

let books = JSON.parse(localStorage.getItem('books')) || [];
let editIndex = null; // Добавляем переменную для хранения индекса редактируемой книги

function displayBooks() {
    bookList.innerHTML = '';
    books.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
            <div>
                <strong>${book.title}</strong> by ${book.author} (${book.year}) - ${book.genre} - ${book.status}
            </div>
            <div>
                <button onclick="editBook(${index})">Редактировать</button>
                <button onclick="deleteBook(${index})">Удалить</button>
            </div>
        `;
        bookList.appendChild(bookItem);
    });
    updateBookCount();
}

function updateBookCount() {
    bookCount.textContent = `Количество книг: ${books.length}`;
}

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newBook = {
        title: bookForm.title.value,
        author: bookForm.author.value,
        year: bookForm.year.value,
        genre: bookForm.genre.value,
        status: bookForm.status.value
    };

    if (editIndex !== null) { // Если редактируем книгу
        books[editIndex] = newBook; // Обновляем книгу
        editIndex = null; // Сбрасываем индекс
    } else {
        books.push(newBook); // Добавляем новую книгу
    }

    localStorage.setItem('books', JSON.stringify(books));
    bookForm.reset();
    displayBooks();
});

function editBook(index) {
    const book = books[index];
    bookForm.title.value = book.title;
    bookForm.author.value = book.author;
    bookForm.year.value = book.year;
    bookForm.genre.value = book.genre;
    bookForm.status.value = book.status;

    editIndex = index; // Сохраняем индекс редактируемой книги
}

function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}

deleteAllBtn.addEventListener('click', () => {
    books = [];
    localStorage.removeItem('books');
    displayBooks();
});

refreshBtn.addEventListener('click', () => {
    location.reload();
});

// Инициализация отображения книг
displayBooks();

const input = document.querySelector(".text-read")

const select = document.querySelector(".read")

input.addEventListener('change', (event) => {
    event.target.value;
    const genre=event.target.value;
    const allBooks=JSON.parse(localStorage.getItem ("books"));
    books= allBooks.filter(function(book) {return book.genre.includes (genre)});
    displayBooks ()
    
})

select.addEventListener ('change', (event) =>{
    const read=event.target.value.toLowerCase()
    const allBooks=JSON.parse(localStorage.getItem ("books"));
    if (read==="все книги") {books=allBooks} else {books= allBooks.filter(function(book) {return book.status.toLowerCase()===read})}
    displayBooks ()
    
})