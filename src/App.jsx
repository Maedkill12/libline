import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import useAutologin from "./hooks/useAutologin";
import useCreateAuthRefresh from "./hooks/useCreateAuthRefresh";
import Discover from "./pages/Discover";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  const { createAuthRefreshInterceptor } = useCreateAuthRefresh();
  const { login } = useAutologin();

  useEffect(() => {
    createAuthRefreshInterceptor();
    login();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
