import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AnimatedHearts = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    {[...Array(10)].map((_, i) => (
      <span
        key={i}
        className="absolute text-pink-400 opacity-20 animate-heart-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 2 + 1.5}rem`,
          animationDelay: `${Math.random() * 4}s`,
        }}
      >
        💖
      </span>
    ))}
    <style>
      {`
        @keyframes heart-float {
          0% { transform: translateY(0) scale(1);}
          50% { transform: translateY(-40px) scale(1.2);}
          100% { transform: translateY(0) scale(1);}
        }
        .animate-heart-float {
          animation: heart-float 7s ease-in-out infinite;
        }
      `}
    </style>
  </div>
);

const DataPage = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("https://llov-backend.onrender.com/api/entries");
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };
    fetchEntries();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-400 p-4 transition-all duration-700 overflow-x-hidden">
      <AnimatedHearts />
      <div className="z-10 w-full max-w-lg mx-auto p-8 rounded-3xl shadow-2xl bg-white/30 backdrop-blur-2xl border border-white/40 mt-8 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-fuchsia-500 to-orange-400 drop-shadow-lg mb-8 text-center tracking-tight animate-slide-down">
          💖 Collected Data 💖
        </h1>
        {entries.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold text-pink-500 mb-4 text-center">All Entries</h2>
            <ul className="space-y-4">
              {entries.map((entry, index) => (
                <li
                  key={index}
                  className="bg-white/80 rounded-xl shadow p-4 flex flex-col items-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.07}s` }}
                >
                  <p className="text-gray-700 font-semibold text-lg flex items-center gap-2">
                    <span role="img" aria-label="user">🧑</span> {entry.yourName}
                    <span className="text-pink-400 text-2xl animate-bounce">❤️</span>
                    <span role="img" aria-label="partner">🧑</span> {entry.partnerName}
                  </p>
                  <p className="text-sm text-fuchsia-500 font-bold mt-2">
                    Love Percentage: <span className="text-pink-600">{entry.percentage}%</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-600 text-center">No data available yet.</p>
        )}
        <Link
          to="/"
          className="block mt-8 text-center py-2 px-6 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 text-white rounded-xl shadow hover:scale-105 transition-all font-semibold"
        >
          ← Back to Home
        </Link>
      </div>
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 1.2s cubic-bezier(.4,2,.6,1);
          }
          .animate-slide-down {
            animation: slideDown 1s cubic-bezier(.4,2,.6,1);
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95);}
            to { opacity: 1; transform: scale(1);}
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0);}
            50% { transform: translateY(-8px);}
          }
          .animate-bounce {
            animation: bounce 2.5s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default DataPage;