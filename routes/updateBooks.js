import express from "express";
import bookModel from "../models/bookModel.js";

const Updaterouter = express.Router();

const updateBook = async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    const { id } = req.params;

    if (!title || !author || !publishYear) {
      return res.status(400).json({ message: "Send all the required fields" });
    }
    // findByIdAndUpdate(id,update,option(we did true,as we want to modify the book))
    const findingID = await bookModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!findingID) {
      return res.status(404).json({ message: "Book not found!" });
    }

    return res.status(200).json({ message: "Book updated successfully!", book: findingID });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

// 👇 Pass the ID as a parameter
Updaterouter.put("/:id", updateBook);

export default Updaterouter;
