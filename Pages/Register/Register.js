import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
const { v4: uuidv4 } = require('uuid');

function Register(props) {
  let navigate = useNavigate();
  const [register, setRegister] = useState({
    id: uuidv4(),
    first_name: "",
    last_name: "",
    email: "",
    birth_date: "",
    diver_qualification: "",
    instructor_qualification: "",
    nitrox_qualification: "",
    license_number: "",
    license_expiration_date: "",
    medical_expiration_date: "",
    password: "",
    passwordConfirmation: "",
    theme: "light",
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const canSubmit = () => {
    if (
        register.first_name !== "" &&
        register.last_name !== "" &&
        register.email !== "" &&
        register.birth_date !== "" &&
        register.diver_qualification !== "" &&
        register.nitrox_qualification !== "" &&
        register.license_number !== "" &&
        register.license_expiration_date !== "" &&
        register.medical_expiration_date !== "" &&
        register.password !== "" &&
        register.passwordConfirmation !== "" &&
        register.password === register.passwordConfirmation
    ) {
      setIsSubmit(true);
    }
  };

  //Display the current date minus 16 years in MM/DD/YYYY format
  const todayMinus16Year = new Date();
  todayMinus16Year.setFullYear(todayMinus16Year.getFullYear() - 16);

  return (
      <div className={"w-full"}>
        <h1 className={"text-2xl font-bold mb-6 text-center"}>Register Form</h1>
        <form
            className={"w-full max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md"}
            onSubmit={(event) => {
              event.preventDefault();
              fetch("http://localhost:5000/api/users/signup", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(register),
              }).then((response) => response.json())
                  .then((data) => {
                    navigate("/", {replace: true});
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                    navigate("/register", {replace: true})
                  })
            }}
        >
          <h2 className={"text-xl font-bold mb-6"}>Personal Information</h2>
          <div className={"grid grid-cols-1 gap-4 sm:grid-cols-2"}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  onChange={(event) => {
                    setRegister({ ...register, first_name: event.target.value });
                    canSubmit();
                  }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  onChange={(event) => {
                    setRegister({ ...register, last_name: event.target.value });
                    canSubmit();
                  }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  onChange={(event) => {
                    setRegister({ ...register, email: event.target.value });
                    canSubmit();
                  }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Birth Date
              </label>
              <input
                  type="date"
                  max={todayMinus16Year.toISOString().split("T")[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  onChange={(event) => {
                    setRegister({ ...register, birth_date: event.target.value });
                    canSubmit();
                  }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  onChange={(event) => {
                    setRegister({ ...register, password: event.target.value });
                    canSubmit();
                  }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password Confirmation
              </label>
              <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  onChange={(event) => {
                    setRegister({
                      ...register,
                      passwordConfirmation: event.target.value,
                    });
                    canSubmit();
                  }}
              />
            </div>
          </div>

          <h2 className={"text-xl font-bold my-6"}>Diver Information</h2>
          <div className={"grid grid-cols-1 gap-4 sm:grid-cols-2"}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Diver Qualification
              </label>
              <select
                  name=""
                  id=""
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  onChange={(event) => {
                    setRegister({
                      ...register,
                      diver_qualification: event.target.value,
                    });
                    canSubmit();
                  }}
              >
                <option value=""></option>
                <option value="1">Aucun</option>
                <option value="2">Etoiles de Mer 1</option>
                <option value="3">Etoiles de Mer 2</option>
                <option value="4">Etoiles de Mer 3</option>
                <option value="5">Bronze</option>
                <option value="6">Argent</option>
                <option value="7">Or</option>
                <option value="8">N1</option>
                <option value="9">N2</option>
                <option value="10">N3</option>
                <option value="11">N4</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Instructor Qualification
              </label>
              <select
                  name=""
                  id=""
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  onChange={(event) => {
                    setRegister({
                      ...register,
                      instructor_qualification: event.target.value,
                    });
                    canSubmit();
                  }}
              >
                <option value=""></option>
                <option value="1">Aucun</option>
                <option value="2">E1</option>
                <option value="3">E2</option>
                <option value="4">E3</option>
                <option value="5">E4</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nox Qualification
              </label>
              <select
                  name=""
                  id=""
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  onChange={(event) => {
                    setRegister({
                      ...register,
                      nitrox_qualification: event.target.value,
                    });
                    canSubmit();
                  }}
              >
                <option value=""></option>
                <option value="1">Aucun</option>
                <option value="2">Nitrox</option>
                <option value="3">Nitrox Confirmé</option>
                <option value="4">Moniteur Nitrox</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                License Number
              </label>
              <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  onChange={(event) => {
                    setRegister({ ...register, license_number: event.target.value });
                    canSubmit();
                  }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                License Expiration Date
              </label>
              <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  onChange={(event) => {
                    setRegister({
                      ...register,
                      license_expiration_date: event.target.value,
                    });
                    canSubmit();
                  }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Medical Certificate Expiration Date
              </label>
              <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  onChange={(event) => {
                    setRegister({
                      ...register,
                      medical_expiration_date: event.target.value,
                    });
                    canSubmit();
                  }}
              />
            </div>
          </div>

          <div className={"flex justify-center"}>
            <button
                type={"submit"}
                className={`bg-blue-500  text-white font-bold py-2 px-4 rounded ${
                    isSubmit ? "hover:bg-blue-700" : "cursor-not-allowed opacity-50"
                }`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
  );
}

export default Register;
