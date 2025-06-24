import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import DataPage from "./DataPage";

const AnimatedHearts = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    {[...Array(12)].map((_, i) => (
      <span
        key={i}
        className={`absolute text-pink-400 opacity-30 animate-heart-float`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 2 + 1.5}rem`,
          animationDelay: `${Math.random() * 4}s`,
        }}
      >
        ❤️
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
          animation: heart-float 6s ease-in-out infinite;
        }
      `}
    </style>
  </div>
);

const App = () => {
  const [yourName, setYourName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [lovePercentage, setLovePercentage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");

if (!verified) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (password === "your-secret-code") setVerified(true);
    }}>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button>Enter</button>
    </form>
  );
}


  const calculateLove = async () => {
    setError("");
    if (!yourName.trim() || !partnerName.trim()) {
      setError("Both names are required!");
      return;
    }
    setLoading(true);
    const percentage = Math.floor(Math.random() * 101);
    setLovePercentage(percentage);

    const newEntry = { yourName, partnerName, percentage };

    try {
      await axios.post("https://llov-backend.onrender.com/api/entries", newEntry);
      setIsSubmitted(true);
    } catch (error) {
      setError("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setYourName("");
    setPartnerName("");
    setLovePercentage(null);
    setIsSubmitted(false);
    setError("");
  };

  return (
    <Router>
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-400 transition-all duration-700 overflow-x-hidden">
        <AnimatedHearts />
        <div className="z-10 flex flex-col items-center justify-center w-full min-h-screen">
          <Routes>
            <Route
              path="/"
              element={
                !isSubmitted ? (
                  <div className="w-full max-w-md mx-auto p-8 rounded-3xl shadow-2xl bg-white/30 backdrop-blur-2xl border border-white/40 mt-8 animate-fade-in">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-fuchsia-500 to-orange-400 drop-shadow-lg mb-8 text-center tracking-tight animate-slide-down">
                      <span role="img" aria-label="heart">💖</span> Love Calculator
                    </h1>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-base font-semibold mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={yourName}
                        onChange={(e) => setYourName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all bg-white/70"
                        required
                        autoFocus
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-base font-semibold mb-2">
                        Partner's Name
                      </label>
                      <input
                        type="text"
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        placeholder="Enter partner's name"
                        className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all bg-white/70"
                        required
                      />
                    </div>
                    {error && (
                      <div className="mb-4 text-red-500 text-sm font-semibold animate-shake">
                        {error}
                      </div>
                    )}
                    <button
                      onClick={calculateLove}
                      disabled={loading}
                      className={`w-full py-3 mt-2 text-white bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all font-bold text-lg flex items-center justify-center gap-2 ${
                        loading ? "opacity-60 cursor-not-allowed" : ""
                      } animate-bounce-slow`}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                          </svg>
                          Calculating...
                        </>
                      ) : (
                        <>
                          <span role="img" aria-label="sparkles">✨</span> Calculate Love
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="w-full max-w-md mx-auto p-8 rounded-3xl shadow-2xl bg-white/30 backdrop-blur-2xl border border-white/40 mt-8 text-center animate-fade-in">
                    <h2 className="text-3xl font-bold text-pink-500 mb-4 flex items-center justify-center gap-2 animate-slide-down">
                      {/* <span role="img" aria-label="prank">😜</span> Sorry! You got pranked! */}
                    </h2>
                    <p className="text-lg text-gray-700 mb-2">
                      {/* Your Partner's name is sent to Manish */}
                    </p>
                    <p className="text-lg text-red-400 mb-4 font-bold mt-4">
                      {yourName} <span className="text-2xl">❤️</span> {partnerName}
                    </p>
                    <p className="text-lg text-gray-700">
                      Your love percentage is{" "}
                      <span className="text-pink-500 font-bold text-2xl animate-bounce">
                        {lovePercentage}%
                      </span>
                    </p>
                    <button
                      onClick={resetForm}
                      className="mt-6 py-2 px-6 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 text-white rounded-xl shadow hover:scale-105 transition-all font-semibold"
                    >
                      Go Back to Form
                    </button>
                  </div>
                )
              }
            />
            <Route path="/data" element={<DataPage />} />
          </Routes>
          <div className="mt-10 flex flex-col items-center gap-2 z-10">
            <p className="text-white text-sm opacity-90 drop-shadow">
              Made with <span className="animate-pulse">❤️</span> for fun!
            </p>
            <p className="text-white text-sm opacity-80 drop-shadow">
              Designed By Manish Basnet
            </p>
            <Link
              to="/data"
              className="block mt-2 text-fuchsia-100 hover:text-white hover:underline font-semibold transition-all text-lg"
            >
              <span role="img" aria-label="data">📊</span> View Collected Data
            </Link>
          </div>
        </div>
        {/* Animations */}
        <style>
          {`
            .animate-fade-in {
              animation: fadeIn 1.2s cubic-bezier(.4,2,.6,1);
            }
            .animate-slide-down {
              animation: slideDown 1s cubic-bezier(.4,2,.6,1);
            }
            .animate-shake {
              animation: shake 0.4s;
            }
            .animate-bounce-slow {
              animation: bounce 2.5s infinite;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.95);}
              to { opacity: 1; transform: scale(1);}
            }
            @keyframes slideDown {
              from { opacity: 0; transform: translateY(-40px);}
              to { opacity: 1; transform: translateY(0);}
            }
            @keyframes shake {
              10%, 90% { transform: translateX(-2px);}
              20%, 80% { transform: translateX(4px);}
              30%, 50%, 70% { transform: translateX(-8px);}
              40%, 60% { transform: translateX(8px);}
            }
            @keyframes bounce {
              0%, 100% { transform: translateY(0);}
              50% { transform: translateY(-8px);}
            }
          `}
        </style>
      </div>
    </Router>
  );
};

export default App;