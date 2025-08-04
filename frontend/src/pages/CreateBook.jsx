import React, { useState } from "react";
import Spinner from "../components/Spinner.jsx";
import BackButton from "../components/BackButton.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post("https://bookstore-api-tmw6.onrender.com/books/create", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Created Succesfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("Error creating book", { variant: "error" });
        console.log(err);
      });
  };

  return (
    <div className="p-4 bg-[url('https://images.unsplash.com/photo-1599488059966-a42a2ab36991?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-screen">
      <BackButton />
      <div className="flex flex-col items-center">
        <h1 className="text-3xl my-8 text-gray-900 bg-gray-300 rounded-md p-1.5 ">Create Book</h1>
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col border-2 bg-gray-200 border-gray-100 rounded-xl w-[600px] p-4 mx-auto hover:shadow-xl shadow-gray-50">
          <div className="my-4 ">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500 ">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="text"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
