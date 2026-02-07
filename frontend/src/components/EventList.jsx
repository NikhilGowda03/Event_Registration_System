import { useEffect, useState } from "react";
import { getEvents } from "../services/api";
import { Link } from "react-router-dom";

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Available Events</h2>

      {events.length === 0 && <p className="text-center text-gray-500">No events available</p>}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {events.map((event) => (
          <div key={event._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                <span className="font-medium text-gray-700">Location:</span> {event.location}
              </p>
            </div>
            <Link
              to={`/event/${event._id}`}
              className="inline-block text-center mt-auto bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
