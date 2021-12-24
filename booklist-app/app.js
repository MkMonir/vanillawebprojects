"use strict";

// Book Class : Represents a book
class Book {
  constructor(title, aurther, isbn) {
    this.title = title;
    this.aurther = aurther;
    this.isbn = isbn;
  }
}

// UL Class : Handle UL Task
class UI {
  constructor() {}
  static displayBooks() {
    // const storedBooks = [
    //   {
    //     title: "Book One",
    //     aurther: "Jhon Doe",
    //     isbn: 3434434,
    //   },
    //   {
    //     title: "Book Two",
    //     aurther: "Jhane Doe",
    //     isbn: 454545,
    //   },
    // ];
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const html = `
        <tr>
            <td>${book.title}</td>
            <td>${book.aurther}</td>
            <td class="isbn">${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        </tr>
      `;

    list.insertAdjacentHTML("beforeend", html);
  }

  // Delete book
  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.closest("tr").remove();
    }
  }

  // Show alert validation
  static showAlert(message, className) {
    const alertHtml = `
        <div class="alert alert-${className}">${message}</div>
      `;
    const form = document.getElementById("book-form");

    form.insertAdjacentHTML("beforebegin", alertHtml);

    // Remove alert after some seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  // Clear input fields
  static clearFields() {
    const title = (document.querySelector("#title").value = "");
    const author = (document.querySelector("#author").value = "");
    const isbn = (document.querySelector("#isbn").value = "");
  }
}

// Store Class : Handle Storage
class Store {
  constructor() {}
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event Add Books
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    //Instatiate book
    const book = new Book(title, author, isbn);

    // Add book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Book added alert
    UI.showAlert("Book Added", "success");

    // Clear fields
    UI.clearFields();
  }
});

// Event Remove Books
document.getElementById("book-list").addEventListener("click", (e) => {
  e.preventDefault();

  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from localstorage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Book removed alert
  UI.showAlert("Book Removed", "success");
});
