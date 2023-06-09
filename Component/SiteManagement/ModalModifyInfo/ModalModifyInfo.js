import React, { useState } from "react";

function ModalModifyInfo(props) {
  const [showModal, setShowModal] = useState(false);
  const [modifyInfo, setModifyInfo] = useState(false);
  const [valuesModified, setValuesModified] = useState(props.info);

  const invertModifyInfo = () => {
    setModifyInfo(!modifyInfo);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (modifyInfo) {
      console.log(valuesModified);
    } else {
      invertModifyInfo();
    }
  };

  return (
    <>
      <button
        className="text-white bg-lochmara-600 hover:bg-lochmara-700 focus:outline-none font-bold uppercase rounded-full text-sm px-5 py-2.5 text-center"
        type="button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Modify
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center fixed inset-0 z-50">
            <div className="relative w-full max-w-4xl">
              <div className="flex flex-col rounded-lg shadow-lg relative bg-white">
                <div className="p-5 w-full">
                  <h3 className={"text-3xl font-semibold"}>Info</h3>
                </div>
                <div className="p-5 w-full">
                  <form className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Site Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required={true}
                        defaultValue={props.info.name}
                        disabled={!modifyInfo}
                        onChange={(event) => {
                          setValuesModified({
                            ...valuesModified,
                            Site_Name: event.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Latitude
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required={true}
                        defaultValue={props.info.latitude}
                        disabled={!modifyInfo}
                        onChange={(event) => {
                          setValuesModified({
                            ...valuesModified,
                            Gps_Latitude: event.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Longitude
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required={true}
                        defaultValue={props.info.longitude}
                        disabled={!modifyInfo}
                        onChange={(event) => {
                          setValuesModified({
                            ...valuesModified,
                            Gps_Longitude: event.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required={true}
                        defaultValue={props.info.address}
                        disabled={!modifyInfo}
                        onChange={(event) => {
                          setValuesModified({
                            ...valuesModified,
                            Track_Type: event.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required={true}
                        defaultValue={props.info.zip_code}
                        disabled={!modifyInfo}
                        onChange={(event) => {
                          setValuesModified({
                            ...valuesModified,
                            Zip_Code: event.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required={true}
                        defaultValue={props.info.city}
                        disabled={!modifyInfo}
                        onChange={(event) => {
                          setValuesModified({
                            ...valuesModified,
                            City_Name: event.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Country
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required={true}
                        defaultValue={props.info.country}
                        disabled={!modifyInfo}
                        onChange={(event) => {
                          setValuesModified({
                            ...valuesModified,
                            Country_Name: event.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Additional Address
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required={true}
                        defaultValue={props.info.additional_address}
                        disabled={!modifyInfo}
                        onChange={(event) => {
                          setValuesModified({
                            ...valuesModified,
                            Additional_Address: event.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Tel
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required={true}
                        defaultValue={props.info.tel}
                        disabled={!modifyInfo}
                        onChange={(event) => {
                          setValuesModified({
                            ...valuesModified,
                            Tel_Number: event.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        URL
                      </label>
                      <input
                        type="url"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required={true}
                        defaultValue={props.info.url}
                        disabled={!modifyInfo}
                        onChange={(event) => {
                          setValuesModified({
                            ...valuesModified,
                            Information_URL: event.target.value,
                          });
                        }}
                      />
                    </div>
                  </form>
                </div>
                <div className="p-5 w-full flex justify-end">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setModifyInfo(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className={
                      modifyInfo
                        ? "bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        : "bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    }
                    type="button"
                    onClick={handleSubmit}
                  >
                    {modifyInfo ? "Save Changes" : "Modify"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default ModalModifyInfo;
