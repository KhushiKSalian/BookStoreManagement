import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-all-orders",
          { headers }
        );
        if (Array.isArray(response.data.data)) {
          setAllOrders(response.data.data.filter(order => order != null));
        } else {
          console.error("Invalid data received from API:", response.data);
          setAllOrders([]);
        }
        console.log("API response data:", response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setAllOrders([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = allOrders[i]?._id;
    if (!id) {
      console.error("Invalid order ID");
      return;
    }
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response = await axios.put(
        `http://localhost:3000/api/v1/update-status/${id}`,
        values,
        { headers }
      );
      alert(response.data.message);
      setAllOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === id ? { ...order, status: values.status } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

  if (isLoading) {
    return (
      <div className="h-[100%] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-[100%] p-0 md:p-4 text-zinc-100">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        All orders
      </h1>
      <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
        <div className="w-[3%]">
          <h1 className="text-center">Sr.</h1>
        </div>
        <div className="w-[22%]">
          <h1 className="">Books</h1>
        </div>
        <div className="w-[45%]">
          <h1 className="">Description</h1>
        </div>
        <div className="w-[9%]">
          <h1 className="">Price</h1>
        </div>
        <div className="w-[16%]">
          <h1 className="">Status</h1>
        </div>
        <div className="w-[5%]">
        <FaUser />
        </div>
      </div>
      {allOrders.length > 0 ? (
        allOrders.map((item, i) => (
          <div
            key={item?._id || i}
            className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer"
          >
            <div className="w-[3%]">
              <h1 className="text-center">{i + 1}</h1>
            </div>
            <div className="w-[40%] md:w-[22%]">
              <Link
                to={`/view-book-details/${item?.book?._id}`}
                className="hover:text-blue-300"
              >
                {item?.book?.title || 'N/A'}
              </Link>
            </div>
            <div className="w-0 md:w-[45%] hidden md:block">
              <h1 className="">{item?.book?.desc?.slice(0, 50) || 'N/A'}...</h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1 className="">${item?.book?.price || 'N/A'}</h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1 className="font-semibold">
                <button
                  className="hover:scale-105 transition-all duration-300"
                  onClick={() => setOptions(i)}
                >
                  {item?.status === "order placed" ? (
                    <div className="text-yellow-500">{item.status}</div>
                  ) : item?.status === "Cancelled" ? (
                    <div className="text-red-500">{item.status}</div>
                  ) : (
                    <div className="text-green-500">{item?.status || 'N/A'}</div>
                  )}
                </button>
                <div className={options === i ? "flex" : "hidden"}>
                  <select
                    name="status"
                    className="bg-gray-800"
                    onChange={change}
                    value={values.status}
                  >
                    {[
                      "Order placed",
                      "Out for delivery",
                      "Delivered",
                      "Cancelled",
                    ].map((status, index) => (
                      <option value={status} key={index}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    className="text-green-500 hover:text-pink-600 mx-2"
                    onClick={() => {
                      setOptions(-1);
                      submitChanges(i);
                    }}
                  >
                    <FaCheck />
                  </button>
                </div>
              </h1>
            </div>
            <div className="w-[10%] md:w-[5%]">
              <button
                className="text-xl hover:text-orange-500"
                onClick={() => {
                  setUserDiv("fixed");
                  setUserDivData(item?.user);
                }}
              >
                <IoOpenOutline />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setUserDiv={setUserDiv}
        />
      )}
    </div>
  );
};

export default AllOrders;
