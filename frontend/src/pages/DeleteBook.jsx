import React, { useState } from "react";
import Spinner from "../components/Spinner.jsx";
import BackButton from "../components/BackButton.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`https://bookstore-api-tmw6.onrender.com/books/delete/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted Succesfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("Error deleting book!!", { variant: "error" });
        console.log(err);
      });
  };
  return (
    <div className="p-4 bg-[url('https://images.unsplash.com/photo-1628118256263-586593550616?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-screen">
      <BackButton />
      <div className="flex flex-col items-center">
        <h1 className="text-3xl my-8 text-gray-900 bg-gray-300 rounded-md p-1.5">Delete Book</h1>
        {loading ? <Spinner /> : null}
        <div className="flex flex-col items-center bg-gray-200 border-2 border-gray-400 rounded-xl w-[600px] p-8 mx-auto hover:shadow-xl shadow-gray-50">
          <h3 className="text-2xl">
            Are you sure,you want to delete this book?
          </h3>
          <button
            className="p-4 bg-red-600 text-white m-4 w-full cursor-pointer"
            onClick={handleDeleteBook}
          >
            Yes, Delete it!!
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
