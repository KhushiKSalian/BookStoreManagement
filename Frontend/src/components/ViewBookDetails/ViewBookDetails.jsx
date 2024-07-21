// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import Loader from "../Loader/Loader";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleFavourite = async () => {
    const response = await axios.put(
      "http://localhost:3000/api/v1/add-book-to-fav",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:3000/api/v1/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const deleteBook = async () => {
    const response = await axios.delete(
      "http://localhost:3000/api/v1/delete-book",
      { headers }
    );
    alert(response.data.message);
    navigate("/all-books");
  };
  return (
    <>
      {Data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 lg:flex-row flex-col items-start flex gap-8">
          <div className=" w-full lg:w-3/6">
            {" "}
            <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded">
              <img
                src={Data.url}
                alt="/"
                className=" h-[50vh] md:h-[60vh] lg:h-[70vh] rounded"
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-col md:flex-row items-center justify-between lg:justify-start mt-8 lg:mt-0 lg:flex-col ">
                  <button
                    className="bg-white rounded  lg:rounded-full flex items-center justify-center lg:text-3xl text-4xl p-3 text-red-500"
                    onClick={handleFavourite}
                  >
                    <FaHeart />{" "}
                    <span className="ms-4 block lg:hidden">Favourites</span>
                  </button>
                  <button
                    className=" rounded md:mt-0 lg:rounded-full text-4xl p-3 mt-8 bg-blue-500 text-white lg:text-3xl lg:mt-8 flex items-center justify-center"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                    <span className="ms-4 block lg:hidden">Add to cart</span>
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex  flex-col md:flex-row items-center justify-between lg:justify-start mt-8 lg:mt-0 lg:flex-col ">
                  <Link
                    to={`/updateBook/${id}`}
                    className="bg-white rounded lg:rounded-full flex items-center justify-center lg:text-3xl text-4xl p-3"
                  >
                    <FaEdit />
                    <span className="ms-4 block lg:hidden">Edit</span>
                  </Link>
                  <button
                    onClick={deleteBook}
                    className="bg-white rounded lg:rounded-full text-4xl p-3 mt-8 md:mt-0 text-red-500 lg:text-3xl lg:mt-8 flex items-center justify-center"
                  >
                    <MdDelete />
                    <span className="ms-4 block lg:hidden">Delete Book</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {Data.title}
            </h1>
            <p className="text-zinc-400 mt-1">by {Data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" /> {Data.language}
            </p>
            <p className="text-zinc-100 mt-4 text-3xl font-semibold">
              Price: ₹{Data.price}{" "}
            </p>
          </div>
        </div>
      )}
      {!Data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />{" "}
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
