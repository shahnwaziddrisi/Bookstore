import express from "express";
import bookModel from "../models/bookModel.js";

const Addrouter = express.Router();

const addingBook = async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).json({ message: "Send All the required fields" });
    }

    const newBook = { title, author, publishYear };

    const book = await bookModel.create(newBook);

    return res.status(201).send(book);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

Addrouter.post("/", addingBook);

export default Addrouter;
