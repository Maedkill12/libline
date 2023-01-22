import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import useAutologin from "./hooks/useAutologin";
import Articles from "./pages/Articles";
import Discover from "./pages/Discover";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  // const { login } = useAutologin();

  useEffect(() => {
    // login();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/articles/:id" element={<Articles />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
