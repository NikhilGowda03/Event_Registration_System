import { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../services/api";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await getEvents();
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure? This will delete the event and all its registrations."
      )
    ) {
      return;
    }

    try {
      await deleteEvent(id);
      fetchEvents();
    } catch (err) {
      alert("Failed to delete event");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow border">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Manage Events
      </h2>

      {events.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="border-t">
                  <td className="px-4 py-2 font-medium">{event.title}</td>
                  <td className="px-4 py-2">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{event.time}</td>
                  <td className="px-4 py-2">{event.location}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
