import React from "react";

export default function About() {
  return (
    <div className="px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-6 text-slate-800">
        About ConnectVerse
      </h1>
      <p className="text-xl text-slate-700 mb-6">
        ConnectVerse is a music streaming platform built using the powerful MERN
        stack (MongoDB, Express, React, Node.js). We aim to bring you closer to
        the music you love while connecting you with artists from around the
        world.
      </p>

      <h2 className="text-3xl font-semibold mb-4 text-slate-800">
        Technology Stack
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6 transition transform hover:scale-105 hover:shadow-2xl">
          <h3 className="text-2xl font-semibold text-slate-800 mb-2">
            MongoDB
          </h3>
          <p className="text-slate-600">
            A NoSQL database to store all user data, song details, playlists,
            and more. MongoDB allows us to scale effortlessly.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 transition transform hover:scale-105 hover:shadow-2xl">
          <h3 className="text-2xl font-semibold text-slate-800 mb-2">
            Express.js
          </h3>
          <p className="text-slate-600">
            A lightweight back-end framework that powers the ConnectVerse API,
            allowing for seamless communication between front-end and back-end.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 transition transform hover:scale-105 hover:shadow-2xl">
          <h3 className="text-2xl font-semibold text-slate-800 mb-2">
            React.js
          </h3>
          <p className="text-slate-600">
            Our front-end is powered by React, delivering a smooth, interactive,
            and dynamic user experience across all devices.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 transition transform hover:scale-105 hover:shadow-2xl">
          <h3 className="text-2xl font-semibold text-slate-800 mb-2">
            Node.js
          </h3>
          <p className="text-slate-600">
            The backbone of our back-end, Node.js ensures ConnectVerse runs
            quickly, efficiently, and at scale to support millions of users.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-semibold mb-4 text-slate-800">
        State Management with Redux
      </h2>
      <p className="text-slate-700 mb-8">
        ConnectVerse uses <span className="font-semibold">Redux</span> for state
        management, ensuring a seamless and scalable solution to handle global
        states such as user authentication, playlist management, and music
        streaming queues. Redux allows us to maintain consistency across the app
        and provides a centralized store for all the application’s state data.
      </p>

      <h2 className="text-3xl font-semibold mb-4 text-slate-800">
        Authentication
      </h2>
      <p className="text-slate-700 mb-8">
        User authentication is handled securely using JSON Web Tokens (JWT).
        This ensures that only registered users can access personalized features
        like playlists, favorites, and exclusive content.
      </p>

      <h2 className="text-3xl font-semibold mb-4 text-slate-800">
        Why Choose ConnectVerse?
      </h2>
      <p className="text-slate-700">
        We are dedicated to offering an immersive music experience where you can
        discover new tunes, follow your favorite artists, and enjoy live events.
        ConnectVerse is designed to be user-friendly, fast, and secure, so you
        can enjoy your music worry-free.
      </p>
    </div>
  );
}