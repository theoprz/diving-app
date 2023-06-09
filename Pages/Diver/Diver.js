import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import DiverInfo from "../../Component/DiverInfo/DiverInfo";
import DiverDivingAvailable from "../../Component/DiverDivingAvailable/DiverDivingAvailable";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

function Diver(props) {
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
                        alertify.alert('Message', 'Ceci est une alerte.', function(){
                            alertify.success('Ok');
                        });
                    }
                })
                .catch((error) => {
                    console.log(error); // Handle any errors
                });
        }
    }, []);
    const [pageSelected, setPageSelected] = React.useState(4);

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
                        <p>Gestion de mes Informations</p>
                    </div>
                    <div
                        className={`mb-2 px-2 py-2 rounded-md ${
                            pageSelected === 2 ? "bg-cyan-200/75" : ""
                        }`}
                        onClick={() => setPageSelected(2)}
                    >
                        <p>Historiques des Plongées</p>
                    </div>
                    <div
                        className={`mb-2 px-2 py-2 rounded-md ${
                            pageSelected === 3 ? "bg-cyan-200/75" : ""
                        }`}
                        onClick={() => setPageSelected(3)}
                    >
                        <p>Plongées prévues</p>
                    </div>
                    <div
                        className={`mb-2 px-2 py-2 rounded-md ${
                            pageSelected === 4 ? "bg-cyan-200/75" : ""
                        }`}
                        onClick={() => setPageSelected(4)}
                    >
                        <p>Plongées disponibles</p>
                    </div>
                </div>

                <div className={"w-full bg-white mx-2 p-4 rounded-md shadow-md"}>
                    {pageSelected === 1 ? (
                        <DiverInfo/>
                    ) : pageSelected === 2 ? (
                        <p>Page 2</p>
                    ) : pageSelected === 3 ? (
                        <p>Page 3</p>
                    ) : (
                        <DiverDivingAvailable/>
                    )}
                </div>
            </div>
        </>
    );
}

export default Diver;
