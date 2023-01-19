import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_API } from "../constants";
import useAccessToken from "./useAccessToken";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAccessToken();
  const navigate = useNavigate();

  const login = async (username, password) => {
    setError(null);
    setIsPending(true);
    if (!username || !password) {
      setError("All fields are required");
      setIsPending(false);
      return;
    }

    if (username.length < 3 || username.length > 20) {
      setError("Username length must be between 3 and 20 characters");
      setIsPending(false);
      return;
    }

    if (password.length < 3) {
      setError("Password must be at least 8 characters");
      setIsPending(false);
      return;
    }

    try {
      const response = await axios.post(
        `${URL_API}/auth/login`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      const { data } = response;
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
      if (data.success) {
        dispatch({ type: "STORE_TOKEN", payload: data.accessToken });
        dispatch({ type: "STORE_USER_ID", payload: data.userId });
        console.log(data.userId);
        navigate("/");
      }
    } catch (error) {
      if (!isCancelled) {
        const msg = error.response.data.err;
        setError(msg);
        setIsPending(false);
        console.log(msg);
      }
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isPending };
};

export default useLogin;
