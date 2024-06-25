// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);

  useEffect(() => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const fetchFavouriteBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-fav-books",
          { headers }
        );
        setFavouriteBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching favourite books:", error);
        // Handle error state or display error message
      }
    };

    fetchFavouriteBooks();
  }, [FavouriteBooks]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {FavouriteBooks.length === 0 && <p>No favourite Books</p>}
      {FavouriteBooks.map((item, index) => (
        <div key={index}>
          <BookCard data={item} favourite={true} />
        </div>
      ))}
    </div>
  );
};

export default Favourites;
