import axios from "axios";
import { useEffect, useState } from "react";
import { URL_API } from "../constants";
import useAccessToken from "./useAccessToken";

const useAutologin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch, username } = useAccessToken();

  const login = async () => {
    setIsPending(true);
    setError(null);
    try {
      const response = await axios.get(`${URL_API}/auth/refresh`, {
        withCredentials: true,
      });
      const data = response.data;
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
      if (data.success) {
        dispatch({ type: "STORE_TOKEN", payload: data.accessToken });
        dispatch({
          type: "STORE_USER_INFO",
          payload: { username: data.username, userId: data.userId },
        });
      }
    } catch (error) {
      console.log(error);
      if (!isCancelled) {
        const msg = error.response.data.err;
        setError(msg);
        setIsPending(false);
        if (username) {
          dispatch({ type: "DELETE_TOKEN" });
          dispatch({ type: "DELETE_USER_INFO" });
        }
        console.log(msg);
      }
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, login };
};

export default useAutologin;
