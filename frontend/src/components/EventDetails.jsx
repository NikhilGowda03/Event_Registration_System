import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventById } from "../services/api";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    getEventById(id)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!event) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // ✅ Format date
  const formattedDate = new Date(event.date).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ✅ Format time from string (HH:mm → 12-hour)
  const formatTime = (timeStr) => {
    if (!timeStr) return "—";
    const [hours, minutes] = timeStr.split(":");
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const displayHour = h % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-md border border-gray-100">
      <Link
        to="/"
        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mb-4 inline-block"
      >
        ← Back to Events
      </Link>

      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {event.title}
      </h2>

      <p className="text-gray-700 leading-relaxed mb-6">
        {event.description}
      </p>

      <div className="border-t border-gray-100 pt-4 mb-6 space-y-2">
        {/* ✅ DATE */}
        <p className="text-gray-600">
          <span className="font-semibold text-gray-900">Date:</span>{" "}
          {formattedDate}
        </p>

        {/* ✅ TIME */}
        <p className="text-gray-600">
          <span className="font-semibold text-gray-900">Time:</span>{" "}
          {formatTime(event.time)}
        </p>

        {/* ✅ LOCATION */}
        <p className="text-gray-600">
          <span className="font-semibold text-gray-900">Location:</span>{" "}
          {event.location}
        </p>
      </div>

      <Link
        to={`/register/${event._id}`}
        className="block w-full text-center bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Register for Event
      </Link>
    </div>
  );
}
