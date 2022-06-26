const addBookBtn = document.querySelector('.add-book-btn');
const modal = document.querySelector('.modal');
const exitBtn = document.querySelector('.exit-btn');
const bookShelf = document.querySelector('.book-shelf');
const modalForm = document.querySelector('form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');


addBookBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

exitBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  titleInput.style.border = '2px solid #cbd5e1';
  authorInput.style.border = '2px solid #cbd5e1';
  pagesInput.style.border = '2px solid #cbd5e1';
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
});

window.onclick = function (e) {
  if (e.target === modal) {
    modal.style.display = 'none';
    titleInput.style.border = '2px solid #cbd5e1';
    authorInput.style.border = '2px solid #cbd5e1';
    pagesInput.style.border = '2px solid #cbd5e1';
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
  }
};

const libraryArray = [];

const Book = function createBook(title, author, pages) {
  (this.author = author),
    (this.title = title),
    (this.pages = pages),
    (this.readStatus = false);
};

Book.prototype.stat = function changeReadStat() {
  this.readStatus === true
    ? (this.readStatus = false)
    : (this.readStatus = true);
  console.log(this.readStatus);
};

const addBookToLibrary = function addBook(title, author, pages) {
  const newBook = new Book(title, author, pages);
  libraryArray.push(newBook);
};

const renderBooksToPage = function renderBooks() {
  let i = -1;
  libraryArray.forEach((book) => {
    i++;
    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('h3');
    const bookAuthor = document.createElement('h3');
    const bookPages = document.createElement('h3');
    const readStatBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    bookCard.classList.add('book');
    bookCard.dataset.libraryIndex = i;
    deleteBtn.classList.add('delete-btn');
    readStatBtn.classList.add('read-stat');
    readStatBtn.textContent = 'Not Read';
    deleteBtn.textContent = 'Remove';
    bookTitle.append(book.title);
    bookAuthor.append(book.author);
    bookPages.append(book.pages);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(readStatBtn);
    bookCard.appendChild(deleteBtn);
    bookShelf.appendChild(bookCard);

    deleteBtn.addEventListener('click', (e) => {
      libraryArray.pop(e.target.parentElement.dataset);
      e.target.parentElement.remove();
    });


    readStatBtn.addEventListener('click', (e) => {
      const index = bookCard.dataset.libraryIndex;
      libraryArray[index].stat();
      console.log(index)
      if (libraryArray[index].readStatus === true) {
        e.target.style.background = 'green';
        e.target.textContent = 'Read';
      }if (libraryArray[index].readStatus === false) {
        e.target.style.background = 'blue';
        e.target.textContent = 'Not Read';
      }
    });
  });
};


// removes all child elements
const clearPage = () => {
  while(bookShelf.firstChild){
    bookShelf.removeChild(bookShelf.firstChild)
  }
}

modalForm.addEventListener('submit', (e) => {
  if (
    titleInput.value === '' ||
    titleInput.value === 'null' ||
    authorInput.value === '' ||
    authorInput.value === 'null' ||
    pagesInput.value === '' ||
    pagesInput === 'null'
  ) {
    if (titleInput.value === '' || titleInput.value === 'null') {
      titleInput.style.border = '3px solid red';
    } else if (titleInput.value != '' || titleInput.value != 'null') {
      titleInput.style.border = '3px solid green';
    }
    if (authorInput.value === '' || authorInput.value === 'null') {
      authorInput.style.border = '3px solid red';
    } else if (authorInput.value != '' || authorInput.value != 'null') {
      authorInput.style.border = '3px solid green';
    }
    if (pagesInput.value === '' || pagesInput === 'null') {
      pagesInput.style.border = '3px solid red';
    } else if (pagesInput.value != '' || pagesInput.value != 'null') {
      pagesInput.style.border = '3px solid green';
    }

    e.preventDefault();
  } else if (
    titleInput.value != '' &&
    titleInput.value != 'null' &&
    authorInput.value != '' &&
    authorInput.value != 'null' &&
    pagesInput.value != '' &&
    pagesInput.value != 'null'
  ) {
    e.preventDefault();
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value);
    clearPage()
    renderBooksToPage();
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    titleInput.style.border = '2px solid #cbd5e1';
    authorInput.style.border = '2px solid #cbd5e1';
    pagesInput.style.border = '2px solid #cbd5e1';
    modal.style.display = 'none';
  }
});

