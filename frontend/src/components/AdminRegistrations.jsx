import { useEffect, useState } from "react";
import API, { getEvents, getRegistrations } from "../services/api";

export default function AdminRegistrations() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Load events on page load
  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res.data))
      .catch(() => alert("Failed to load events"));
  }, []);

  // 🔹 View registrations for selected event
  const handleView = async () => {
    if (!selectedEvent) return alert("Select an event");

    try {
      setLoading(true);
      const res = await getRegistrations(selectedEvent);
      setRegistrations(res.data);
    } catch (err) {
      alert("Unauthorized or failed to fetch registrations");
    } finally {
      setLoading(false);
    }
  };
  //download csv
const downloadCSV = () => {
  if (!selectedEvent) return alert("Select an event");

  const url = `${import.meta.env.VITE_API_URL}/api/registrations/export/${selectedEvent}`;
  window.open(url, "_blank");
};


  // 🔹 Delete registration
  const deleteRegistration = async (id) => {
    if (!window.confirm("Are you sure you want to delete this registration?"))
      return;

    try {
      await API.delete(`/registrations/delete/${id}`);
      setRegistrations((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert("Failed to delete registration");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white mt-10 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Admin – View Registrations
        </h2>

        <div className="flex gap-3">
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="border px-4 py-2 rounded-md"
          >
            <option value="">Select Event</option>
            {events.map((e) => (
              <option key={e._id} value={e._id}>
                {e.title}
              </option>
            ))}
          </select>

          <button
            onClick={handleView}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            View
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : registrations.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No registrations found
                </td>
              </tr>
            ) : (
              registrations.map((r) => (
                <tr key={r._id} className="border-t">
                  <td className="p-3">{r.name}</td>
                  <td className="p-3">{r.email}</td>
                  <td className="p-3">{r.phone}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => deleteRegistration(r._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Download CSV */}
      {registrations.length > 0 && (
        <div className="mt-6 text-right">
          <button
            onClick={downloadCSV}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Download CSV
          </button>
        </div>
      )}
    </div>
  );
}
