import axios from "axios";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { URL_API } from "./constants";
import useAccessToken from "./hooks/useAccessToken";
import Discover from "./pages/Discover";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { dispatch } = useAccessToken();

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await axios.get(`${URL_API}/auth/refresh`, {
          withCredentials: true,
        });
        console.log(response);
      } catch (error) {
        const msg = error.response.data.err;
        console.log(msg);
        if (msg === "Invalid refresh token") {
          console.log("Session has expired");
        }
      }
    };
    getToken();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
