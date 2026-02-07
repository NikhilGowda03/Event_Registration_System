import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ type }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to={type === "admin" ? "/admin" : "/"} className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-indigo-600 tracking-tight">EventSys</span>
                        </Link>

                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {type === "user" ? (
                                <Link
                                    to="/"
                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Events
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/admin"
                                        className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        to="/admin/registrations"
                                        className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        Registrations
                                    </Link>
                                    <Link 
                                        to="/admin/events"
                                        className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        Events
                                    </Link>

                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center">
                        {type === "user" ? (
                            <Link
                                to="/admin/login"
                                className="text-gray-500 hover:text-indigo-600 text-sm font-medium px-3 py-2 rounded-md transition-colors"
                            >
                                Admin Login
                            </Link>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="text-gray-500 hover:text-red-600 text-sm font-medium px-3 py-2 rounded-md transition-colors"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
