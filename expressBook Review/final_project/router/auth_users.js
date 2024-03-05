const express = require('express');
const jwt = require('jsonwebtoken');
const books = require("./booksdb.js");
const regd_users = express.Router();

// Assuming users are stored in a simple array
let users = [];

const isValid = (username) => {
    return users.some(user => user.username === username);
}

const authenticatedUser = (username, password) => {
    const user = users.find(user => user.username === username);
    return user && user.password === password;
}

// Only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!isValid(username)) {
        return res.status(400).json({ message: 'Invalid username' });
    }
    if (!authenticatedUser(username, password)) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Assuming authentication is successful, create JWT token
    const token = jwt.sign({ username: username }, 'secret_key');
    req.session.token = token;

    return res.status(200).json({ message: 'Login successful', token: token });
});

// Add a book review
regd_users.put("/auth/reviews/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const { review } = req.body;
    const token = req.session.token;
    if (!review) {
        return res.status(400).json({ message: 'Review is required' });
    }
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, 'secret_key', function(err, decoded) {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        } else {
            const username = decoded.username;
            if (!books[isbn]) {
                return res.status(404).json({ message: 'Book not found' });
            }
            books[isbn].reviews[username] = review;
            return res.status(200).json({ message: 'Review added/modified successfully' });
        }
    });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;