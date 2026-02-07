import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔐 Attach JWT
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;
  return req;
});

// PUBLIC
export const getEvents = () => API.get("/events");
export const getEventById = (id) => API.get(`/events/${id}`);
export const registerUser = (data) => API.post("/register", data);

// ADMIN
export const addEvent = (data) => {
  return API.post("/events", {
    title: data.title,
    description: data.description,
    date: new Date(data.date), // YYYY-MM-DD ✅
    time: data.time,           // HH:mm string ✅
    location: data.location,
  });
};

export const getRegistrations = (eventId) =>
  API.get(`/registrations/${eventId}`);

export const deleteRegistration = (id) =>
  API.delete(`/registrations/delete/${id}`);

export const exportRegistrationsCSV = (eventId) =>
  API.get(`/registrations/export/${eventId}`, {
    responseType: "blob",
  });
  export const deleteEvent = (id) => API.delete(`/events/${id}`);

