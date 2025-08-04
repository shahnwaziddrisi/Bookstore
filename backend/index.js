import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import addBooks from "./routes/addBooks.js";
import getBooks from "./routes/getBooks.js";
import updateBooks from "./routes/updateBooks.js";
import deleteBooks from "./routes/deleteBooks.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555;

// Middleware
app.use(
  cors({
    origin: [],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Default test route
app.get("/", (req, res) => {
  res.send("📚 Book API is live!");
});

// Route bindings
app.use("/books", getBooks); // GET /books , GET /books/:id
app.use("/books/create", addBooks); // POST /books/create
app.use("/books/edit", updateBooks); // PUT /books/edit/:id
app.use("/books/delete", deleteBooks); // DELETE /books/delete/:id

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
