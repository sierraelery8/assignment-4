// imports express
const express = require('express');

// creates app instance
const app = express();

// middleware to parse JSON
app.use(express.json());

// Books for bookstore API
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        copiesAvailable: 5
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        copiesAvailable: 3
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        copiesAvailable: 7
    }
];


// GET all books
app.get('/api/books', (req, res) => {
    res.json(books);
});

// GET book by ID
app.get('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
});

// POST new book
app.post('/api/books', (req, res) => {
    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        copiesAvailable: req.body.copiesAvailable
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT update book
app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.genre = req.body.genre || book.genre;
    book.copiesAvailable = req.body.copiesAvailable ?? book.copiesAvailable;

    res.json(book);
});

// DELETE book
app.delete('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = books.splice(index, 1);
    res.json(deletedBook[0]);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
