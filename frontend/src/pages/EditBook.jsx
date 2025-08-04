import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner.jsx";
import BackButton from "../components/BackButton.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://bookstore-api-tmw6.onrender.com/books/${id}`)
      .then((res) => {
        setAuthor(res.data.Books_data.author);
        setPublishYear(res.data.Books_data.publishYear);
        setTitle(res.data.Books_data.title);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("An error happened.Please check console.");
        console.log(err);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`https://bookstore-api-tmw6.onrender.com/books/edit/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Edited Succesfully", { variant: "success" });

        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Error editing book!!", { variant: "error" });
        setLoading(false);
      });
  };

  return (
    <div className="p-4 bg-[url('https://images.unsplash.com/photo-1581447109266-0498adb54e6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-screen">
      <BackButton />
      <div className="flex flex-col items-center">
        <h1 className="text-3xl my-8 text-gray-900 bg-gray-300 rounded-md p-1.5">Edit Book</h1>
        {loading ? <Spinner /> : null}
        <div className="flex flex-col bg-gray-200 border-2 border-gray-100 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl shadow-gray-50  p-4 w-[600px] mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
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

          <button className="p-2 bg-gray-400 m-8 cursor-pointer hover:text-[#800020]" onClick={handleEditBook} >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
