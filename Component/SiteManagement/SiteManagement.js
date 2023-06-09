import React, { useEffect, useState } from "react";
import ModalModifyInfo from "./ModalModifyInfo/ModalModifyInfo";

async function getSitesDatas(setSites) {
  try {
    const response = await fetch("http://localhost:5000/api/sites/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      // Handle the data
      setSites(data);
      return data;
    } else {
      // Handle the error
      throw new Error("Request failed with status: " + response.status);
    }
  } catch (error) {
    // Handle any other errors
    console.error(error);
  }
}

function SiteManagement(props) {
  const [sites, setSites] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const [pagesNumber, setPagesNumber] = useState(1);

  useEffect(() => {
    getSitesDatas(setSites).then((data) => {
      setPagesNumber(Math.ceil(data.length / dataPerPage));
      console.log(data);
    });
  }, []);

  return (
    <div>
      <h2 className={"text-xl font-bold mb-6"}>Site Management</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="h-full space-x-2">
          <label htmlFor="" className="text-gray-700 text-sm font-bold mb-2">
            First Name :{" "}
          </label>
          <input
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            onChange={(event) => {
              setSearch(event.target.value);
              setPagesNumber(
                Math.ceil(
                  sites.filter((site) =>
                    site.name
                      .toLowerCase()
                      .includes(event.target.value.toLowerCase())
                  ).length / dataPerPage
                )
              );
            }}
          />
        </div>

        <div className={"px-3 py-2"}>
          <ul className={"flex justify-center"}>
            <button
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
              className={
                "border rounded mx-1 px-3 py-1.5 text-gray-700 text-sm font-bold transition-all duration-300 hover:bg-neutral-100"
              }
            >
              Previous
            </button>
            <button
              className="w-10 border rounded mx-1 px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-100"
              onClick={() => {
                if (currentPage > 2) {
                  setCurrentPage(currentPage - 2);
                }
              }}
            >
              {currentPage - 2 > 0 ? currentPage - 2 : null}
            </button>
            <button
              className="w-10 border rounded mx-1 px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-100"
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              {currentPage - 1 > 0 ? currentPage - 1 : null}
            </button>
            <button className="w-10 border rounded mx-1 px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-100">
              {currentPage}
            </button>
            <button
              className="w-10 border rounded mx-1 px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-100"
              onClick={() => {
                if (currentPage < pagesNumber) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              {currentPage + 1 < pagesNumber + 1 ? currentPage + 1 : null}
            </button>
            <button
              className="w-10 border rounded mx-1 px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-100"
              onClick={() => {
                if (currentPage < pagesNumber - 1) {
                  setCurrentPage(currentPage + 2);
                }
              }}
            >
              {currentPage + 2 < pagesNumber + 1 ? currentPage + 2 : null}
            </button>
            <button
              disabled={currentPage === pagesNumber}
              onClick={() => {
                if (currentPage < pagesNumber) {
                  setCurrentPage(currentPage + 1);
                }
              }}
              className={
                "border rounded mx-1 px-3 py-1.5 text-gray-700 text-sm font-bold transition-all duration-300 hover:bg-neutral-100"
              }
            >
              Next
            </button>
          </ul>
        </div>
      </div>

      {sites.length === 0 ? (
        <p>Loading</p>
      ) : (
        <table className={"min-w-full text-left text-sm font-light"}>
          <thead className={"border-b bg-white font-medium"}>
            <tr>
              <th className={"w-9 px-1 py-2 text-center"}>ID</th>
              <th className={"w-96 px-1 py-2 text-center"}>Site Name</th>
              <th className={"w-32 px-1 py-2 text-center"}>Latitude</th>
              <th className={"w-32 px-1 py-2 text-center"}>Longitude</th>
              <th className={"w-28 px-1 py-2 text-center"}>Zip Code</th>
              <th className={"w-40 px-1 py-2 text-center"}>City</th>
              <th className={"w-32 px-1 py-2 text-center"}>Country</th>
              <th className={"w-32 px-1 py-2 text-center"}>Modify</th>
            </tr>
          </thead>
          <tbody>
            {sites
              .filter((site) =>
                site.name.toLowerCase().includes(search.toLowerCase())
              )
              .filter((site, index) => {
                return (
                  index < currentPage * dataPerPage &&
                  index >= (currentPage - 1) * dataPerPage
                );
              })
              .map((site, index) => (
                <tr
                  className={"border-b even:bg-white odd:bg-neutral-100"}
                  key={index}
                >
                  <td className="whitespace-nowrap w-9 px-1 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap w-96 px-1 py-2 text-center">
                    {site.name}
                  </td>
                  <td className="whitespace-nowrap w-32 px-1 py-2 text-center">
                    {site.latitude}
                  </td>
                  <td className="whitespace-nowrap w-32 px-1 py-2 text-center">
                    {site.longitude}
                  </td>
                  <td className="whitespace-nowrap w-28 px-1 py-2 text-center">
                    {site.zip_code}
                  </td>
                  <td className="whitespace-nowrap w-40 px-1 py-2 text-center">
                    {site.city}
                  </td>
                  <td className="whitespace-nowrap w-32 px-1 py-2 text-center">
                    {site.country}
                  </td>
                  <td
                    className={
                      "whitespace-nowrap px-1 py-2 flex flex-col items-center"
                    }
                  >
                    <ModalModifyInfo info={site} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SiteManagement;
