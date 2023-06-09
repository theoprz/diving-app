import React from "react";
import { Link } from "react-router-dom";

function ProfilButton(props) {
  return (
    <div>
      <Link to={"/profil"} className={"hover:text-gray-300"}>
        Profil
      </Link>
    </div>
  );
}

export default ProfilButton;
