import express from "express";
import bookModel from "../models/bookModel.js";

const deleteRouter = express.Router();

const deleteBooks = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await bookModel.findByIdAndDelete(id); // ✅ Await the deletion

    if (!book) {
      return res.status(404).json({ message: "Book not found!!" }); // ✅ status before json
    }

    return res.status(200).json({ message: "Book deleted Successfully!!" }); // ✅ status before json
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

deleteRouter.delete("/:id", deleteBooks);

export default deleteRouter;
