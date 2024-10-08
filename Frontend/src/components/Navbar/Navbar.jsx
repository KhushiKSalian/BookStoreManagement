// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  if (isLoggedIn === false) {
    links.splice(2, 3);
  }
  if (isLoggedIn === true && role === "user") {
    links.splice(4, 1);
  }
  if (isLoggedIn == true && role === "admin") {
    links.splice(3, 1);
  }
  // eslint-disable-next-line no-unused-vars
  const [MobileNav, setMobileNav] = useState("hidden");
  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 item-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433048.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">Book Store</h1>
        </Link>
        <div className="nav-links-bookheaven block md:flex items-center gap-4">
          <div className=" hidden md:flex gap-4">
            {links.map((items, i) => (
              <>
                {items.title === "Profile" || items.title === "Admin Profile" ? (
                  <Link
                    to={items.link}
                    className="hover:text-blue-500 border border-blue-500 transition-all duration-300"
                    key={i}
                  >
                    {items.title}
                  </Link>
                ) : (
                  <Link
                    to={items.link}
                    className="hover:text-blue-500 transition-all duration-300"
                    key={i}
                  >
                    {items.title}{" "}
                  </Link>
                )}
              </>
            ))}
          </div>
          {isLoggedIn === false && (
            <div className=" hidden md:flex gap-4">
              <Link
                to="/LogIn"
                className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 "
              >
                Log in
              </Link>
              <Link
                to="/SignUp"
                className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 "
              >
                Sign up
              </Link>
            </div>
          )}
          <button
            className=" md:hidden block text-white text-2xl hover:text-zinc-400"
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div
        className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            className="text-white text-5xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300"
            key={i}
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            {items.title}{" "}
          </Link>
        ))}
        {isLoggedIn === false && (
          <>
            <Link
              to="/LogIn"
              className={`${MobileNav} px-4  text-2xl font-semibold mb-8 py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}
            >
              Log in
            </Link>
            <Link
              to="/SignUp"
              className={`${MobileNav} px-3 text-2xl font-semibold mb-8 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
