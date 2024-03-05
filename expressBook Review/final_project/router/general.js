const express = require('express');
const books = require("./booksdb.js");
const isValid = require("./auth_users.js").isValid;
const users = require("./auth_users.js").users;
const public_users = express.Router();



// Function to fetch all books using Axios with async-await
async function getAllBooks() {
    try {
        const response = await axios.get('http://your_api_endpoint/books');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch books');
    }
}

// Function to fetch book details by ISBN using Axios with async-await
async function getBookByISBN(isbn) {
    try {
        const response = await axios.get(`http://your_api_endpoint/books/isbn/${isbn}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch book by ISBN');
    }
}

// Function to fetch book details by Author using Axios with async-await
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`http://your_api_endpoint/books/author/${author}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch books by author');
    }
}

// Function to fetch book details by Title using Axios with async-await
async function getBooksByTitle(title) {
    try {
        const response = await axios.get(`http://your_api_endpoint/books/title/${title}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch books by title');
    }
}

// Get all books available in the shop
app.get('/books', async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.json(books);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Get book details based on ISBN
app.get('/books/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
        const book = await getBookByISBN(isbn);
        return res.json(book);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Get book details based on Author
app.get('/books/author/:author', async (req, res) => {
    const author = req.params.author;
    try {
        const books = await getBooksByAuthor(author);
        return res.json(books);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Get book details based on Title
app.get('/books/title/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const books = await getBooksByTitle(title);
        return res.json(books);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
In this implementation, Axios is used to make HTTP requests asynchronously. The functions getAllBooks, getBookByISBN, getBooksByAuthor, and getBooksByTitle are defined using async-await to handle asynchronous requests. These functions fetch data from the API endpoints for different tasks. Then, the Express routes are defined to handle requests for each task, calling the appropriate async functions and handling any errors that may occur during the process.



User
put the functions and routes in separate file called general.js and connect to main file index.js
ChatGPT
Here's how you can structure the code into separate files general.js and index.js:

general.js:

javascript
Copy code
// general.js

const express = require('express');
const axios = require('axios');
const generalRouter = express.Router();

// Function to fetch all books using Axios with async-await
async function getAllBooks() {
    try {
        const response = await axios.get('http://your_api_endpoint/books');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch books');
    }
}

// Function to fetch book details by ISBN using Axios with async-await
async function getBookByISBN(isbn) {
    try {
        const response = await axios.get(`http://your_api_endpoint/books/isbn/${isbn}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch book by ISBN');
    }
}

// Function to fetch book details by Author using Axios with async-await
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`http://your_api_endpoint/books/author/${author}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch books by author');
    }
}

// Function to fetch book details by Title using Axios with async-await
async function getBooksByTitle(title) {
    try {
        const response = await axios.get(`http://your_api_endpoint/books/title/${title}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch books by title');
    }
}


public_users.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    // Check if the username already exists
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    // Add the user to the users array
    users.push({ username, password });
    return res.status(201).json({ message: 'User registered successfully' });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    return res.json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = Object.values(books).find(book => book.isbn === isbn);
    if (book) {
        return res.json(book);
    } else {
        return res.status(404).json({ message: 'Book not found' });
    }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const booksByAuthor = Object.values(books).filter(book => book.author === author);
    if (booksByAuthor.length > 0) {
        return res.json(booksByAuthor);
    } else {
        return res.status(404).json({ message: 'Books by author not found' });
    }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const booksWithTitle = Object.values(books).filter(book => book.title === title);
    if (booksWithTitle.length > 0) {
        return res.json(booksWithTitle);
    } else {
        return res.status(404).json({ message: 'Books with title not found' });
    }
});

// Get book review
public_users.get('/reviews/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book) {
        return res.json(book.reviews);
    } else {
        return res.status(404).json({ message: 'Book not found' });
    }
});


public_users.delete('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    if (!books[isbn]) {
        return res.status(404).json({ message: 'Book not found' });
    }

    delete books[isbn];

    return res.status(200).json({ message: 'Book deleted successfully' });
});

module.exports = router;
module.exports.general = public_users;