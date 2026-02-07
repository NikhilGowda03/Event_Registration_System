import { useEffect, useState } from "react";
import { getEvents, getRegistrations } from "../services/api";

export default function AdminRegistrations() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    getEvents().then((res) => setEvents(res.data));
  }, []);

  const handleView = async () => {
    if (!selectedEvent) return alert("Select an event");
    const res = await getRegistrations(selectedEvent);
    setRegistrations(res.data);
  };

  const downloadCSV = async () => {
    if (!selectedEvent) return alert("Select an event");

    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/registrations/export/${selectedEvent}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (!response.ok) {
      alert("Failed to download CSV");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "registrations.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const deleteRegistration = async (id) => {
    if (!window.confirm("Are you sure you want to delete this registration?")) {
      return;
    }

    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/registrations/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    if (!res.ok) {
      alert("Failed to delete registration");
      return;
    }

    // ✅ Update UI instantly after delete
    setRegistrations((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white mt-10 rounded-lg shadow-md border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Admin – View Registrations
        </h2>

        <div className="flex gap-4 mt-4 md:mt-0">
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            onChange={(e) => setSelectedEvent(e.target.value)}
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
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            View
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {registrations.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No registrations found or no event selected.
                </td>
              </tr>
            ) : (
              registrations.map((r) => (
                <tr key={r._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {r.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {r.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {r.phone}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteRegistration(r._id)}
                      className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-full"
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

      {registrations.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            📥 Download CSV
          </button>
        </div>
      )}
    </div>
  );
}
