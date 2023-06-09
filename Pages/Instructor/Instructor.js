import React, { useState, useEffect } from "react";
import Calendar from "../../Component/Calendar/Calendar";
import DiverManagement from "../../Component/DiverManagement/DiverManagement";
import {useNavigate} from "react-router-dom";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import AdminManagement from "../../Component/AdminManagement/AdminManagement";
import SiteManagement from "../../Component/SiteManagement/SiteManagement";

function Instructor(props) {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            fetch("http://localhost:5000/api/users/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem('token')
                },
                body: JSON.stringify({token: localStorage.getItem('token')})
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json(); // Convert the response to JSON
                    } else {
                        navigate("/login", {replace: true});
                    }
                })
                .then(async (data) => {
                    if(data.decoded.rank !== 2){
                        await navigate("/", {replace: true});
                        alertify.error('Accès Impossible !');
                    }
                })
                .catch((error) => {
                    console.log(error); // Handle any errors
                });
        }else{
            navigate("/login")
        }
    }, []);
    const [pageSelected, setPageSelected] = React.useState(6);

    return (
        <>
            <div className={"flex w-full"}>
                <div
                    className={"w-full max-w-xs bg-white mx-2 p-4 rounded-md shadow-md"}
                >
                    <h2 className={"text-xl font-bold mb-6"}>Dashboard</h2>
                    <div
                        className={`mb-2 px-2 py-2 rounded-md ${
                            pageSelected === 1 ? "bg-cyan-200/75" : ""
                        }`}
                        onClick={() => setPageSelected(1)}
                    >
                        <p>Gestion des plongeurs</p>
                    </div>
                    <div
                        className={`mb-2 px-2 py-2 rounded-md ${
                            pageSelected === 2 ? "bg-cyan-200/75" : ""
                        }`}
                        onClick={() => setPageSelected(2)}
                    >
                        <p>Gestion des plannings</p>
                    </div>
                    <div
                        className={`mb-2 px-2 py-2 rounded-md ${
                            pageSelected === 3 ? "bg-cyan-200/75" : ""
                        }`}
                        onClick={() => setPageSelected(3)}
                    >
                        <p>Gestion des plongées</p>
                    </div>
                    <div
                        className={`mb-2 px-2 py-2 rounded-md ${
                            pageSelected === 4 ? "bg-cyan-200/75" : ""
                        }`}
                        onClick={() => setPageSelected(4)}
                    >
                        <p>Historique</p>
                    </div>
                    <div
                        className={`mb-2 px-2 py-2 rounded-md ${
                            pageSelected === 5 ? "bg-cyan-200/75" : ""
                        }`}
                        onClick={() => setPageSelected(5)}
                    >
                        <p>Gestion des sites de plongée</p>
                    </div>
                    <div
                        className={`mb-2 px-2 py-2 rounded-md ${
                            pageSelected === 6 ? "bg-cyan-200/75" : ""
                        }`}
                        onClick={() => setPageSelected(6)}
                    >
                        <p>Gestion admin</p>
                    </div>
                </div>

                <div
                    className={
                        "w-full bg-white mx-2 p-4 rounded-md shadow-md dark:bg-neutral-700"
                    }
                >
                    {pageSelected === 1 ? (
                        <DiverManagement />
                    ) : pageSelected === 2 ? (
                        <Calendar />
                    ) : pageSelected === 3 ? (
                        <p>Page 3</p>
                    ) : pageSelected === 4 ? (
                        <p>Page 4</p>
                    ) : pageSelected === 5 ? (
                        <SiteManagement />
                    ) : (
                        <AdminManagement />
                    )}
                </div>
            </div>
        </>
    );

}

export default Instructor;
