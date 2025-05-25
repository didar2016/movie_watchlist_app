import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Watchlist from "./pages/watchlist";
import { AuthProvider, useAuth } from "./auth/context";
import "./App.css";
import Signup from "./pages/signup";
import ProductPage from "./pages/product";
import MovieDetailPage from "./pages/singleProduct";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  return parsedUser ? children : <Navigate to="/login" />;
}

function App() {
  const [user, setUser] = useState<any>(null);
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [toggle, setToggle] = useState(false);
  const [count, setcount] = useState(0);
  const [Loading, setLoading] = useState(false);

  const fetchWatchlist = async (User: any) => {
    setLoading(true);
    const q = query(
      collection(db, "watchlist"),
      where("userid", "==", User?.uid)
    );
    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as { watchlist?: any[] }),
    }));
    const userWatchlist = items[0]?.watchlist ?? [];
    console.log("Fetched watchlist items:", userWatchlist);
    setWatchlist([...userWatchlist]);
    setcount(userWatchlist.length || 0);
        setLoading(false);

  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const User = storedUser ? JSON.parse(storedUser) : null;
    setUser(User);

    if (!User) {
      setWatchlist([]);
      return;
    }

    fetchWatchlist(User);
  }, [toggle]);


  if(Loading) {
    (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    )
  }

  return (
    <AuthProvider>
      <Router>
        <Navbar
          currentUser={user}
          toggle={toggle}
          setToggle={setToggle}
          count={count}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProductPage
                watchlist={watchlist}
                currentUser={user}
                toggle={toggle}
                setToggle={setToggle}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login currentUser={user} toggle={toggle} setToggle={setToggle} />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/product"
            element={
              <ProductPage
                currentUser={user}
                watchlist={watchlist}
                toggle={toggle}
                setToggle={setToggle}
              />
            }
          />
          <Route
            path="/singleproduct/:id"
            element={
              <MovieDetailPage
                currentUser={user}
                watchlist={watchlist}
                toggle={toggle}
                setToggle={setToggle}
              />
            }
          />
          <Route
            path="/watchlist"
            element={
              <PrivateRoute>
                <Watchlist
                  currentUser={user}
                  toggle={toggle}
                  setToggle={setToggle}
                  watchlist={watchlist}
                />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<h2>Welcome to Movie Watchlist App</h2>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
