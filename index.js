import express from "express";
import { mongoose } from "mongoose";
// import bookModel from "./models/bookModel.js";
import addBooks from "./routes/addBooks.js";
import getBooks from "./routes/getBooks.js";
import updateBooks from "./routes/updateBooks.js";
import deleteBooks from "./routes/deleteBooks.js";
import dotenv from "dotenv";

let app = express();
dotenv.config(); //to read env file

// middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome !!");
});

// routes
app.use("/addBooks", addBooks);
app.use("/getBooks", getBooks);
app.use("/updateBooks", updateBooks);
app.use("/deleteBooks", deleteBooks);

mongoose
  .connect(
    process.env.DB_URL
  )
  .then(() => {
    console.log("DB connected Successfully");
    app.listen(process.env.PORT, () => {
      console.log(
        `App is running at port number http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => console.log(err));
