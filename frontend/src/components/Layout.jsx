import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    const location = useLocation();
    const path = location.pathname;

    // Determine which navbar to show
    let navbarType = "user";

    // If it's an admin page
    if (path.startsWith("/admin")) {
        navbarType = "admin";
    }

    // Special case: Admin Login page shouldn't have a navbar (or just user navbar, user requested NO navbar on login typically, or minimal)
    // Re-reading requirements: "Visible: Only after successful admin login". 
    // "Admin Login page" is listed under "User Pages" scope/context in some interpretations, or just a standalone. 
    // Requirement: "Admin access is UI-driven... Admin sees admin navbar only after login".
    // Let's hide Admin Navbar on /admin/login. Maybe show User Navbar or nothing.
    // "User Navbar... Optional: Admin Login link".
    // Let's show User Navbar on Login page (so they can go back), BUT the requirements say: "Admin Navbar... Visible: Only after successful admin login".
    // So on /admin/login, we definitely DO NOT show Admin Navbar.
    // We can show User Navbar or nothing. "Clean Admin Dashboard layout... Top admin navbar".
    // Let's treat /admin/login as a "Public" page for now, so "user" navbar or clean. 
    // Let's show NO navbar for login to keep it "Clean" and "focused", or User navbar. 
    // Requirement: "User Navbar... Visible on: Event list, Event details, Registration pages". Doesn't explicitly say Login.
    // Requirement: "User Navbar... Optional: 'Admin Login' link". This implies you are on a page with User Navbar to click it.

    const isAdminPage = path.startsWith("/admin");
    const isLoginPage = path === "/admin/login";

    // If it's admin login, we can show User navbar (for navigation back) OR nothing.
    // Let's show nothing for a "Professional, Minimal" login screen.

    // If we are authenticated (we don't check token here strictly as per rules "DO NOT change auth logic", but we can infer context).
    // Actually, simpler logic: 
    // IF /admin/login -> No Navbar (or User Navbar). Let's go with User Navbar as it's a safe default, or None. 
    // Let's go with None for Login to match "Clean" aesthetic.

    const showAdminNav = isAdminPage && !isLoginPage;
    const showUserNav = !isAdminPage;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            {showAdminNav && <Navbar type="admin" />}
            {showUserNav && <Navbar type="user" />}
            {!showAdminNav && !showUserNav && (
                // Fallback for Login page if we want NO navbar, 
                // but wait, showUserNav is !isAdminPage. 
                // If path is /admin/login: isAdminPage=true, showAdminNav=false. showUserNav=false.
                // So NO navbar. Perfect.
                <div className="absolute top-4 left-4">
                    <a href="/" className="text-gray-500 hover:text-gray-900 text-sm font-medium">&larr; Back to Events</a>
                </div>
            )}

            <main className="flex-grow w-full">
                {children}
            </main>

            <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} EventSys. Internal Admin Tool.
                </div>
            </footer>
        </div>
    );
}
