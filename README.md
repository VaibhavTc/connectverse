# Connectverse - Music Streaming Platform

Connectverse is a full-stack music streaming platform built using the MERN (MongoDB, Express, React, Node.js) stack. The platform offers authentication, music streaming, artist features, and a beautiful UI inspired by modern music services like Spotify.

## Features

- **User Authentication**: Users can sign up, log in, and log out using traditional email and password or via OAuth.
- **Protected Routes**: Only authenticated users can access certain pages.
- **Artist Profiles**: Browse through featured artists with their detailed profiles.
- **Music Streaming**: Stream music directly on the platform with a user-friendly interface.
- **Responsive Design**: Fully responsive across all devices.
- **Redux Integration**: Used to manage the global state of the application efficiently.
- **Remember Me**: Users can choose to stay signed in.

## Tech Stack

- **Front-End**: React, Redux, Tailwind CSS for styling.
- **Back-End**: Node.js, Express.js for API services.
- **Database**: MongoDB for storing user and music-related data.
- **Authentication**: JSON Web Tokens (JWT) for authentication and authorization.
- **OAuth**: Google OAuth for easy sign-in options.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/connectverse.git
   cd connectverse
2. Install dependencies
   ```bash
   npm install
3. Set up Environment Variables
Create a .env file in the root directory and add the following:
   ```bash
   MONGO=your-mongo-db-uri
   JWT_SECRET=your-jwt-secret
   VITE_FIREBASE_API_KEY=your-firebase-api-key
4. Run the Application
   To run the development environment:
    ```bash
    npm run dev
    ```
## Usage
1. Ensure your backend server is running and accessible.
2. Start the backend development server:
    ```bash
    nodemon
    ```
3. Open [http://localhost:5173/](http://localhost:5173/) in your browser to use the application locally.
## Project Structure
```plaintext
.
├── api              # Backend Node.js/Express application
│   ├── controllers     # Express route controllers (authController, userController)
│   ├── models          # MongoDB models (User, Artist, Song)
│   ├── routes          # API routes (authRoutes, userRoutes, artistRoutes)
│   ├── utils           # Utility functions (generateJWT, passwordHasher)
│       ├── .env        # Environment variables
├── client             # Frontend React application
│   └── src             # Source files for the React app
│       ├── components  # Reusable components (OAuth, Navbar, MusicPlayer)
│       ├── pages       # Different pages (Home, SignIn, SignUp, About)
│       ├── redux       # Redux store and slices (userSlice, artistSlice)
│       ├── firebase.js #to store profile pictures and other data
│       ├── .env        # Environment variables
├── .gitignore          # Git ignore file
└── README.md           # Project documentation

```
## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
