# Movie Watchlist App

A React + Firebase web application to search movies, add/remove them from your personal watchlist, and view details using the OMDb API.

---

## Features

- **User Authentication:** Sign up and log in with email/password (Firebase Auth).
- **Movie Search:** Search movies by title using the OMDb API.
- **Watchlist:** Add or remove movies from your personal watchlist (stored in Firestore).
- **Movie Details:** View detailed information for each movie.
- **Responsive UI:** Built with React and Tailwind CSS.

---

## Main Components

### `App.tsx`
- Sets up routing and global state for user and watchlist.
- Handles fetching the user's watchlist from Firestore.

### `login.tsx` / `signup.tsx`
- User authentication (login and registration) using Firebase Auth.
- Stores user info in `localStorage` after login.

### `product.tsx`
- Movie search and display.
- Allows adding/removing movies to/from the watchlist.

### `watchlist.tsx`
- Fetches all movies in the user's watchlist by their IMDb IDs.
- Displays movie cards with options to view details or remove from watchlist.

### `singleProduct.tsx`
- Shows detailed information for a single movie.
- Allows adding/removing the movie to/from the watchlist.

### `Navbar.tsx`
- Navigation bar with links to Home, Watchlist, and Login/Logout.

---

## How Watchlist Works

- Each user has a Firestore document with a `watchlist` array of IMDb IDs.
- When displaying the watchlist, the app fetches movie details for each ID from the OMDb API.
- Add/remove actions update Firestore and refresh the UI.

---

## API

- Uses [OMDb API](https://www.omdbapi.com/) for movie data.
- API key is stored in code as `7e55802f`.

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up Firebase:**
   - Update `src/firebase.ts` with your Firebase project config if needed.
3. **Run the app:**
   ```bash
   npm run dev
   ```

---

##
Gogle drive link : https://drive.google.com/drive/folders/1XWixcCBpOKBATfkuV2zR9EVTZzVeBd38?usp=sharing

## Notes

- The app uses localStorage to persist user sessions.
- Toast notifications are used for user feedback.
- All movie data is fetched live from OMDb API.

---
