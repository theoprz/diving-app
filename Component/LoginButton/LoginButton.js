import React from "react";
import { Link } from "react-router-dom";

function LoginButton(props) {
  return (
    <>
      <button className=" inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
        <span className=" px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          <Link to={"/register"}>Register</Link>
        </span>
      </button>
      <button
        className={
          "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        }
      >
        <Link to={"/login"}>Login</Link>
      </button>
    </>
  );
}

export default LoginButton;
