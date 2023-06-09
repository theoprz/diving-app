import React from "react";

const DiverDivingAvailable = () => {
    const events = [
        {
            title: 'Événement 1',
            location: 'Lieu 1',
            description: 'Description de l\'événement 1',
            startDate: '2023-06-01',
            endDate: '2023-06-05',
        },
        {
            title: 'Événement 2',
            location: 'Lieu 2',
            description: 'Description de l\'événement 2',
            startDate: '2023-06-10',
            endDate: '2023-06-15',
        },
    ];

    return (
        <div className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                    <h2 className="text-2xl font-bold text-gray-900 pt-0">Plongées Disponibles</h2>

                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {events.map((event, index) => (
                            <div
                                className="bg-white rounded-lg shadow-lg p-6 max-w-md"
                                key={index}
                            >
                                <h2 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h2>
                                <p className="text-gray-700 mb-4">Localisation: {event.location}</p>
                                <p className="text-gray-700 mb-4">Description: {event.description}</p>
                                <p className="text-gray-700 mb-4">Date de début: {event.startDate}</p>
                                <p className="text-gray-700 mb-4">Date de fin: {event.endDate}</p>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                    Inscription
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiverDivingAvailable;
