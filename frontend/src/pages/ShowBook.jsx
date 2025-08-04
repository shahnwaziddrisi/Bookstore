import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";
import Spinner from "../components/Spinner.jsx";

const ShowBook = () => {
  const [books, setBooks] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://bookstore-api-tmw6.onrender.com/books/${id}`)
      .then((res) => {
        setBooks(res.data.Books_data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);
  return (
    <div className="p-4 bg-[url('https://images.unsplash.com/photo-1502979932800-33d311b7ce56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-screen">
      <BackButton />
      <div className="flex flex-col items-center ">
        <h1 className="text-3xl my-8 text-gray-900 bg-gray-300 rounded-md p-1.5 ">
          About Book
        </h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col bg-gray-200 border-2 border-gray-100 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl shadow-gray-50 w-fit p-4">
            {/* <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Id</span>
              <span>{books._id}</span>
            </div> */}

            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Title</span>
              <span >{books.title}</span>
            </div>

            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Author</span>
              <span>{books.author}</span>
            </div>

            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Publish Year</span>
              <span>{books.publishYear}</span>
            </div>

            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Create Time</span>
              <span>{new Date(books.createdAt).toString()}</span>
            </div>

            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">
                Last Updated Time
              </span>
              <span>{new Date(books.updatedAt).toString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBook;
