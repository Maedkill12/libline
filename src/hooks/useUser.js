import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { URL_API } from "../constants";
import useCreateAuthRefresh from "./useCreateAuthRefresh";

const useUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  useCreateAuthRefresh();

  const getUserByUsername = useCallback(
    async (username) => {
      console.log("Getting user by username");
      setError(null);
      setIsLoading(true);
      try {
        const response = await axios.get(`${URL_API}/users/${username}`);

        if (!isCancelled) {
          setIsLoading(false);
          setError(null);
          return response.data.data;
        }
      } catch (error) {
        if (!isCancelled) {
          const msg = error.response?.data?.err;
          setError(msg);
          setIsLoading(false);
        }
      }
    },
    [isCancelled]
  );

  const getUsers = useCallback(
    async (queryParams = "") => {
      console.log("Getting users");
      setError(null);
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${URL_API}/users${queryParams ? `?${queryParams}` : ""}`
        );

        if (!isCancelled) {
          setIsLoading(false);
          setError(null);
          return response.data.data;
        }
      } catch (error) {
        if (!isCancelled) {
          const msg = error.response?.data?.err;
          setError(msg);
          setIsLoading(false);
        }
      }
    },
    [isCancelled]
  );

  const updateUserByUsername = useCallback(
    async (username, data, accessToken) => {
      console.log("Updating user by username");
      setError(null);
      setIsLoading(true);
      try {
        const response = await axios.patch(
          `${URL_API}/users/${username}`,
          data,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!isCancelled) {
          setIsLoading(false);
          setError(null);
          return response.data.data;
        }
      } catch (error) {
        if (!isCancelled) {
          const msg = error.response?.data?.err;
          setError(msg);
          setIsLoading(false);
        }
      }
    },
    [isCancelled]
  );

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return {
    error,
    isLoading,
    getUserByUsername,
    updateUserByUsername,
    getUsers,
  };
};

export default useUser;
