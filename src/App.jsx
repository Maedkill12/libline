import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import useRefreshToken from "./hooks/useRefreshToken";
import Discover from "./pages/Discover";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { refresh } = useRefreshToken();

  useEffect(() => {
    refresh();
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
