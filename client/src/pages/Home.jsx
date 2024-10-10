import React from "react";
const featuredArtists = [
  {
    name: "Artist 1",
    imgSrc:
      "https://images.unsplash.com/photo-1575285113814-f770cb8c796e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Artist 2",
    imgSrc:
      "https://images.unsplash.com/photo-1575756985239-ad4f602904d3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Artist 3",
    imgSrc:
      "https://images.unsplash.com/flagged/photo-1563551509-8db9076668cc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Artist 4",
    imgSrc:
      "https://images.unsplash.com/photo-1516390204005-88dd959717c1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
export default function Home() {
  return (
    <div className="px-4 py-12 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-slate-800 mb-4">
          Welcome to ConnectVerse 🎶
        </h1>
        <p className="text-xl text-slate-600">
          Your personalized music journey starts here. Discover, listen, and
          connect with your favorite artists.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            Top Hits
          </h2>
          <p className="text-slate-600">
            Explore today's trending songs and albums, handpicked just for you.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            Curated Playlists
          </h2>
          <p className="text-slate-600">
            Browse expertly crafted playlists for every mood and occasion.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            Live Events
          </h2>
          <p className="text-slate-600">
            Stay connected with live performances and virtual concerts.
          </p>
        </div>
      </div>
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Featured Artists
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredArtists.map((artist, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 transition transform hover:scale-105 hover:shadow-2xl text-center"
            >
              <img
                src={artist.imgSrc}
                alt={artist.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="text-xl font-semibold mt-2">{artist.name}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-12">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">
          Join ConnectVerse Now
        </h2>
        <p className="text-xl text-slate-600 mb-6">
          Sign up today and immerse yourself in the world of music.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105">
          Get Started
        </button>
      </div>
    </div>
  );
}
