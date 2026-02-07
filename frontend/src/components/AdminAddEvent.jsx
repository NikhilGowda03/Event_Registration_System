import { useState } from "react";
import { addEvent } from "../services/api";

export default function AdminAddEvent() {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (event.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (event.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!event.date) {
      newErrors.date = "Date is required";
    }

    if (!event.time) {
      newErrors.time = "Time is required";
    }

    if (event.date && event.time) {
      const selectedDateTime = new Date(`${event.date}T${event.time}`);
      const now = new Date();

      if (selectedDateTime <= now) {
        newErrors.dateTime = "Event date & time must be in the future";
      }
    }

    if (event.location.trim().length < 3) {
      newErrors.location = "Location must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await addEvent({
  title: event.title,
  description: event.description,
  date: event.date,
  time: event.time,
  location: event.location,
});


      alert("Event added successfully ");
      setEvent({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
      });
      setErrors({});
    } catch (err) {
      alert("Failed to add event ❌");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
        Admin Dashboard – Add Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Title
          </label>
          <input
            name="title"
            value={event.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows="3"
            value={event.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.description && (
            <p className="text-sm text-red-600 mt-1">{errors.description}</p>
          )}
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={event.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.date && (
              <p className="text-sm text-red-600 mt-1">{errors.date}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              name="time"
              value={event.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.time && (
              <p className="text-sm text-red-600 mt-1">{errors.time}</p>
            )}
          </div>
        </div>

        {errors.dateTime && (
          <p className="text-sm text-red-600">{errors.dateTime}</p>
        )}

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            name="location"
            value={event.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.location && (
            <p className="text-sm text-red-600 mt-1">{errors.location}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          + Create Event
        </button>
      </form>
    </div>
  );
}
