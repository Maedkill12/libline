import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { URL_API } from "../constants";
import useCreateAuthRefresh from "./useCreateAuthRefresh";

const useArticle = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  useCreateAuthRefresh();

  const createArticle = useCallback(
    async (data, accessToken) => {
      console.log("Creating article");
      setError(null);
      setIsLoading(true);
      try {
        const response = await axios.post(`${URL_API}/articles`, data, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

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

  const getArticlesByUsername = useCallback(
    async (username, queryParams = "") => {
      console.log("Getting articles by username");
      setError(null);
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${URL_API}/articles?username=${username}${
            queryParams ? `&${queryParams}` : ""
          }`
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
          return;
        }
      }
    },
    [isCancelled]
  );

  const getArticleById = useCallback(
    async (id) => {
      console.log("Getting article by id");
      setError(null);
      setIsLoading(true);
      try {
        const response = await axios.get(`${URL_API}/articles/${id}`);

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
    getArticleById,
    getArticlesByUsername,
    createArticle,
  };
};

export default useArticle;
