import { useState, useEffect } from "react";
import "./App.css";
import conf from "./conf/conf.js";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth.js";
import { Header, Footer } from "./components/index.js";
import { login, logout } from "./store/authSlice.js";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({userData}));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap bg-gray-400 content-between">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
