import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_API } from "../constants";
import useAccessToken from "./useAccessToken";
import useCreateAuthRefresh from "./useCreateAuthRefresh";

const useArticle = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { accessToken, username } = useAccessToken();
  const { createAuthRefreshInterceptor } = useCreateAuthRefresh();
  const navigate = useNavigate();

  const save = async (title, year) => {
    createAuthRefreshInterceptor();
    setError(null);
    setIsPending(true);
    const currentYear = new Date().getFullYear();

    if (!title || !year) {
      setError("All fields are required");
      setIsPending(false);
      return;
    }

    if (Number(year) > currentYear) {
      setError(`Year must be lower than ${currentYear + 1}`);
      setIsPending(false);
      return;
    }

    try {
      const response = await axios.post(
        `${URL_API}/articles`,
        {
          title,
          year,
          author: username,
        },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const { data } = response;
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
      if (data.success) {
        console.log("Article created");
        // navigate(`/`);
      }
    } catch (error) {
      if (!isCancelled) {
        const msg = error.response.data.err;
        setError(msg);
        setIsPending(false);
        console.log(msg);
        if (msg === "Refresh token has expired") {
          navigate("/login");
        }
      }
    }
  };

  const getArticlesByAuthor = async (author) => {
    createAuthRefreshInterceptor();
    setError(null);
    setIsPending(true);

    try {
      const response = await axios.get(
        `${URL_API}/articles?username=${author}`,
        {
          withCredentials: true,
        }
      );
      const { data } = response;
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
      if (data.success) {
        console.log("Articles gotten");
        return data.data;
        // navigate(`/`);
      }
    } catch (error) {
      if (!isCancelled) {
        const msg = error.response.data.err;
        setError(msg);
        setIsPending(false);
        console.log(msg);
      }
      return [];
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, save, getArticlesByAuthor };
};

export default useArticle;
