import { useEffect, useState } from "react";
import {
  getEvents,
  getRegistrations,
  exportRegistrationsCSV,
  deleteRegistration as deleteRegApi,
} from "../services/api";

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

    const res = await exportRegistrationsCSV(selectedEvent);
    const blob = new Blob([res.data], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "registrations.csv";
    a.click();
  };

  const deleteRegistration = async (id) => {
    if (!window.confirm("Are you sure you want to delete this registration?"))
      return;

    await deleteRegApi(id);
    setRegistrations((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white mt-10 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin – View Registrations</h2>

        <div className="flex gap-4">
          <select
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="border px-4 py-2 rounded"
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
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            View
          </button>
        </div>
      </div>

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
          {registrations.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No registrations found
              </td>
            </tr>
          ) : (
            registrations.map((r) => (
              <tr key={r._id}>
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.email}</td>
                <td className="p-3">{r.phone}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => deleteRegistration(r._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {registrations.length > 0 && (
        <div className="mt-4 text-right">
          <button
            onClick={downloadCSV}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Download CSV
          </button>
        </div>
      )}
    </div>
  );
}
