import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_API } from "../constants";
import useAccessToken from "./useAccessToken";

const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAccessToken();
  const navigate = useNavigate();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      const response = await axios.post(
        `${URL_API}/auth/logout`,
        {},
        { withCredentials: true }
      );
      const data = response.data;
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
      if (data.success) {
        dispatch({ type: "DELETE" });
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

  return { logout, error, isPending };
};

export default useLogout;
