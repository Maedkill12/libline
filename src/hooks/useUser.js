import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_API } from "../constants";
import useAccessToken from "./useAccessToken";
import useAutologin from "./useAutologin";
import useCreateAuthRefresh from "./useCreateAuthRefresh";

const useUser = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { accessToken, username: userLogged } = useAccessToken();
  const { createAuthRefreshInterceptor } = useCreateAuthRefresh();
  const { login } = useAutologin();
  const navigate = useNavigate();

  const save = async (username, photoURL) => {
    createAuthRefreshInterceptor();
    setError(null);
    setIsPending(true);

    const bodyObject = {};
    console.log("GERE");
    console.log(bodyObject);
    if (!username && !photoURL) {
      setIsPending(false);
      console.log("HERE");
      return;
    }

    if (username) {
      bodyObject.username = username;
    }
    if (photoURL) {
      bodyObject.photoURL = photoURL;
    }

    try {
      const response = await axios.patch(
        `${URL_API}/users/${userLogged}`,
        bodyObject,
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
        console.log("User updated");
        login();
        navigate(`/profile/${data.data.username}`);
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

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, save };
};

export default useUser;
