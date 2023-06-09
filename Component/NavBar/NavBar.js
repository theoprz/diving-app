import React from "react";
import { Link } from "react-router-dom";

function NavBar(props) {
  return (
    <>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link
              to={"/register"}
              className={"hover:text-light-text-secondary"}
            >
              Register
            </Link>
          </li>
          <li>
            <Link to={"/diver"} className={"hover:text-light-text-secondary"}>
              Diver
            </Link>
          </li>
          <li>
            <Link
              to={"/instructor"}
              className={"hover:text-light-text-secondary"}
            >
              Instructor
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
