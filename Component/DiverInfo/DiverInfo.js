import React, { useState } from "react";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { HiEye, HiEyeOff } from "react-icons/hi";

function DiverInfo(props) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [userInfo, setUserInfo] = useState({
        id: props.id,
        lastname: props.lastname,
        firstname: props.firstname,
        birthdate: props.birthdate,
        mail: props.mail,
        password: props.password,
        confirmPassword: "",
        diverQual: props.diverQual,
        instructorQual: props.instructorQual,
        nitroxQual: props.nitroxQual,
        addQualification: props.addQualification,
        divingLicense: props.divingLicense,
        dateExpirationLicense: props.dateExpirationLicense,
        dateExpirationCertificationMedical: props.dateExpirationCertificationMedical,
    });
    const [prevUserInfo, setPrevUserInfo] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const diverQualOptions = ["Aucun", "Etoiles de Mer 1", "Etoiles de Mer 2","Etoiles de Mer 3","Bronze","Argent", "Or","N1","N2","N3","N4"];
    const instructorQualOptions = ["Aucun", "E1", "E2","E3","E4"];
    const nitroxQualOptions = ["Aucun", "Nitrox", "Nitrox Confirmé","Moniteur Nitrox"];

    const handleEditClick = () => {
        setPrevUserInfo({ ...userInfo });
        setIsEditMode(true);
    };

    const handleCancelClick = () => {
        if (prevUserInfo) {
            setUserInfo({ ...prevUserInfo });
            setPrevUserInfo(null);
        }
        setIsEditMode(false);
    };

    const handleSaveClick = () => {

        if (userInfo.password !== userInfo.confirmPassword) {
            alertify.error("The password and the confirmation don't match.");
        }

        else if (!userInfo.diverQual || !userInfo.instructorQual || !userInfo.nitroxQual) {
            alertify.error("Please select an option for each qualification.");
        }
        else {
            setIsEditMode(false);

        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value,
        }));
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="py-4 px-8">
            <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
            {isEditMode ? (
                <div>
                    <label className="block mb-2">Lastname:</label>
                    <input
                        type="text"
                        name="lastname"
                        value={userInfo.lastname}
                        onChange={handleChange}
                        className="w-full mb-2 p-2 border border-gray-300 rounded"
                    />
                    <label className="block mb-2">Firstname:</label>
                    <input
                        type="text"
                        name="firstname"
                        value={userInfo.firstname}
                        onChange={handleChange}
                        className="w-full mb-2 p-2 border border-gray-300 rounded"
                    />

                    <label className="block mb-2">Birthdate:</label>
                    <input
                        type="date"
                        name="birthdate"
                        value={userInfo.birthdate}
                        onChange={handleChange}
                        className="w-full mb-2 p-2 border border-gray-300 rounded"
                    />

                    <label className="block mb-2">E-Mail:</label>
                    <input
                        type="email"
                        name="mail"
                        value={userInfo.mail}
                        onChange={handleChange}
                        className="w-full mb-2 p-2 border border-gray-300 rounded"
                    />

                    <label className="block mb-2">Password:</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={userInfo.password}
                            onChange={handleChange}
                            className="w-full mb-2 p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2"
                        >
                            {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                        </button>
                    </div>
                    <label className="block mb-2">Confirm the password:</label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={userInfo.confirmPassword}
                            onChange={handleChange}
                            className="w-full mb-2 p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="button"
                            onClick={toggleShowConfirmPassword}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2"
                        >
                            {showConfirmPassword ? (
                                <HiEyeOff size={20} />
                            ) : (
                                <HiEye size={20} />
                            )}
                        </button>
                    </div>
                    <label className="block mb-2">Diver Qualifications:</label>
                    <select
                        name="diverQual"
                        value={userInfo.diverQual}
                        onChange={handleChange}
                        className="w-full mb-2 p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select</option>
                        {diverQualOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <label className="block mb-2">Instructor Qualifications:</label>
                    <select
                        name="instructorQual"
                        value={userInfo.instructorQual}
                        onChange={handleChange}
                        className="w-full mb-2 p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select</option>
                        {instructorQualOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <label className="block mb-2">Nitrox Qualifications:</label>
                    <select
                        name="nitroxQual"
                        value={userInfo.nitroxQual}
                        onChange={handleChange}
                        className="w-full mb-2 p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select</option>
                        {nitroxQualOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <label className="block mb-2">Other Qualifications:</label>
                    <input
                        type="text"
                        name="addQualification"
                        value={userInfo.addQualification}
                        onChange={handleChange}
                        className="w-full mb-2 p-2 border border-gray-300 rounded"
                    />
                    <label className="block mb-2">Number Diving License:</label>
                    <input
                        type="text"
                        name="divingLicense"
                        value={userInfo.divingLicense}
                        onChange={handleChange}
                        className="w-full mb-2 p-2 border border-gray-300 rounded"
                    />
                    <label className="block mb-2">
                        Expiration Date Diving License:
                    </label>
                    <input
                        type="date"
                        name="dateExpirationLicense"
                        value={userInfo.dateExpirationLicense}
                        onChange={handleChange}
                        className="w-full mb-2 p-2 border border-gray-300 rounded"
                    />
                    <label className="block mb-2">
                        Expiration Date Medical Certification
                    </label>
                    <input
                        type="date"
                        name="dateExpirationCertificationMedical"
                        value={userInfo.dateExpirationCertificationMedical}
                        onChange={handleChange}
                        className="w-full mb-2 p-2 border border-gray-300 rounded"
                    />
                    <button
                        onClick={handleSaveClick}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancelClick}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="border border-gray-300 rounded p-4">
                        <p className="font-bold">Lastname:</p>
                        <p>{userInfo.lastname}</p>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                        <p className="font-bold">Firstname:</p>
                        <p>{userInfo.firstname}</p>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                        <p className="font-bold">Birthdate:</p>
                        <p>{userInfo.birthdate}</p>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                        <p className="font-bold">Email:</p>
                        <p>{userInfo.mail}</p>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                        <p className="font-bold">Password:</p>
                        <p>*********</p>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                        <p className="font-bold">Diver Qualifications:</p>
                        <p>{userInfo.diverQual}</p>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                        <p className="font-bold">Instructor Qualifications:</p>
                        <p>{userInfo.instructorQual}</p>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                        <p className="font-bold">Nitrox Qualifications:</p>
                        <p>{userInfo.nitroxQual}</p>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                        <p className="font-bold">Other Qualifications:</p>
                        <p>{userInfo.addQualification}</p>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                        <p className="font-bold">Number diving license:</p>
                        <p>{userInfo.divingLicense}</p>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                        <p className="font-bold">Expiration date diving license:</p>
                        <p>{""}{userInfo.dateExpirationLicense}</p>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                        <p className="font-bold">Expiration date medical certification:</p>
                        <p>{""}{userInfo.dateExpirationCertificationMedical}</p>
                    </div>
                    <button
                        onClick={handleEditClick}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Modify
                    </button>
                </div>
            )}
        </div>
    );
}

export default DiverInfo;
