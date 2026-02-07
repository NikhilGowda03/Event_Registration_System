export default function Success() {
  return (
    <div className="max-w-md mx-auto mt-20 p-8 text-center bg-white rounded-lg shadow-md border border-gray-100">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
      <p className="text-gray-600 mb-6">You have successfully registered for the event.</p>
      <a href="/" className="inline-block bg-indigo-600 text-white font-medium py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors">
        Back to Events
      </a>
    </div>
  );
}
