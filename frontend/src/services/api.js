import axios from "axios";

// Base API instance
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// 🔐 Attach JWT token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// =======================
// PUBLIC APIs
// =======================
export const getEvents = () => API.get("/events");
export const getEventById = (id) => API.get(`/events/${id}`);
export const registerUser = (data) => API.post("/register", data);

// =======================
// ADMIN APIs
// =======================
export const addEvent = (data) =>
  API.post("/events", {
    title: data.title,
    description: data.description,
    date: new Date(data.date),
    time: data.time,
    location: data.location,
  });

export const getRegistrations = (eventId) =>
  API.get(`/registrations/${eventId}`);

export const deleteRegistration = (id) =>
  API.delete(`/registrations/delete/${id}`);

export const exportRegistrationsCSV = (eventId) =>
  API.get(`/registrations/export/${eventId}`, {
    responseType: "blob",
  });

export const deleteEvent = (id) =>
  API.delete(`/events/${id}`);

export default API;
