import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventList from "./components/EventList";
import EventDetails from "./components/EventDetails";
import RegisterForm from "./components/RegisterForm";
import Success from "./components/Success";
import AdminAddEvent from "./components/AdminAddEvent";
import AdminRegistrations from "./components/AdminRegistrations";
import AdminLogin from "./components/AdminLogin";
import AdminPage from "./components/AdminPage";
import AdminEvents from "./components/AdminEvents";


import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/register/:id" element={<RegisterForm />} />
          <Route path="/success" element={<Success />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/add-event" element={<AdminAddEvent />} />
          <Route path="/admin/registrations" element={<AdminRegistrations />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
