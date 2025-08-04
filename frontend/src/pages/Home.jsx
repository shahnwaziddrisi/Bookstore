import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksCard from "../components/home/BooksCard.jsx";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://bookstore-api-tmw6.onrender.com/books")
      .then((res) => {
        setBooks(res.data.Books_data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 bg-[url('/bg-image.avif')] bg-cover bg-center h-screen">
      <div className="flex justify-between items-center font">
        <h1 className="text-3xl my-8 text-red-900 bg-red-300 rounded-md p-1.5 italic ">My Book Shelf</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-black text-4xl  bg-red-300 rounded-md p-1.5" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <BooksCard books={books} /> //i just need card
        // ) : showType === "table" ? (
        //   <BooksTable books={books} />
      )}
    </div>
  );
};

export default Home;
