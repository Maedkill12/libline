import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { URL_API } from "../constants";
import useAccessToken from "./useAccessToken";

const useAuth = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAccessToken();

  const login = useCallback(
    async (username, password) => {
      setError(null);
      setIsLoading(true);
      if (!username || !password) {
        setError("All fields are required");
        setIsLoading(false);
        return;
      }

      if (username.length < 3 || username.length > 20) {
        setError("Username length must be between 3 and 20 characters");
        setIsLoading(false);
        return;
      }

      if (password.length < 3) {
        setError("Password must be at least 8 characters");
        setIsLoading(false);
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
          setIsLoading(false);
          setError(null);
        }
        if (data.success) {
          dispatch({ type: "STORE_TOKEN", payload: data.accessToken });
          dispatch({
            type: "STORE_USER_INFO",
            payload: { username: data.username, userId: data.userId },
          });
          return data.success;
        }
      } catch (error) {
        if (!isCancelled) {
          const msg = error.response.data.err;
          setError(msg);
          setIsLoading(false);
        }
      }
    },
    [dispatch, isCancelled]
  );

  const signup = useCallback(
    async (username, email, password, confirmPass, photoURL) => {
      setError(null);
      setIsLoading(true);

      if (!username || !email || !password || !confirmPass) {
        setError("All fields are required");
        setIsLoading(false);
        return;
      }

      if (username.length < 3 || username.length > 20) {
        setError("Username length must be between 3 and 20 characters");
        setIsLoading(false);
        return;
      }

      if (password.length < 3) {
        setError("Password must be at least 8 characters");
        setIsLoading(false);
        return;
      }

      if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        )
      ) {
        setError("Invalid email");
        setIsLoading(false);
        return;
      }

      if (password !== confirmPass) {
        setError("Password doesn't match");
        setIsLoading(false);
        return;
      }

      if (photoURL !== "" && !/\.(jpe?g|png|gif|bmp|webp)$/i.test(photoURL)) {
        setError("Photo URL is not valid");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `${URL_API}/auth/register`,
          {
            username,
            email,
            password,
            photoURL,
          },
          { withCredentials: true }
        );
        const { data } = response;
        if (!isCancelled) {
          setIsLoading(false);
          setError(null);
        }
        if (data.success) {
          return data.success;
        }
      } catch (error) {
        if (!isCancelled) {
          const msg = error.response.data.err;
          setError(msg);
          setIsLoading(false);
        }
      }
    },
    [isCancelled]
  );

  const logout = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${URL_API}/auth/logout`,
        {},
        { withCredentials: true }
      );
      const data = response.data;
      if (!isCancelled) {
        setError(null);
        setIsLoading(false);
      }
      if (data.success) {
        dispatch({ type: "DELETE_TOKEN" });
        dispatch({ type: "DELETE_USER_INFO" });
        return data.success;
      }
    } catch (error) {
      if (!isCancelled) {
        const msg = error.response.data.err;
        setError(msg);
        setIsLoading(false);
      }
    }
  }, [dispatch, isCancelled]);

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { error, isLoading, login, signup, logout };
};

export default useAuth;
