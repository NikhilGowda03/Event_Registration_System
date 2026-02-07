import AdminAddEvent from "./AdminAddEvent";
import AdminEvents from "./AdminEvents";
import AdminRegistrations from "./AdminRegistrations";

export default function AdminPage() {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-16">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 border-b pb-4">
        Admin Dashboard
      </h1>

      {/* Add Event */}
      <section>
        <AdminAddEvent />
      </section>

      {/* Manage Events */}
      <section className="border-t pt-10">
        <AdminEvents />
      </section>

      {/* Registrations */}
      <section className="border-t pt-10">
        <AdminRegistrations />
      </section>
    </div>
  );
}
