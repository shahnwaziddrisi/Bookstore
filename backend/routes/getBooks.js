import express from "express";
import bookModel from "../models/bookModel.js";

const Getrouter = express.Router();

const getBooks = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const selectedBook = await bookModel.findById(id);
      if (!selectedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json({
        Total_books: 1,
        Books_data: selectedBook,
      });
    } else {
      const allBooks = await bookModel.find({});

      return res.status(200).json({
        Total_books: allBooks.length,
        Books_data: allBooks,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

// Route to get all books: GET /books
Getrouter.get("/", getBooks);

// Route to get a single book by ID: GET /books/:id
Getrouter.get("/:id", getBooks);

export default Getrouter;
