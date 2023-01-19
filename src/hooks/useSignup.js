import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_API } from "../constants";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const navigate = useNavigate();

  const signup = async (username, email, password, confirmPass, photoURL) => {
    setError(null);
    setIsPending(true);

    if (!username || !email || !password || !confirmPass) {
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

    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setError("Invalid email");
      setIsPending(false);
      return;
    }

    if (password !== confirmPass) {
      setError("Password doesn't match");
      setIsPending(false);
      return;
    }

    if (photoURL !== "" && !/\.(jpe?g|png|gif|bmp|webp)$/i.test(photoURL)) {
      setError("Photo URL is not valid");
      setIsPending(false);
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
        setIsPending(false);
        setError(null);
      }
      if (data.success) {
        navigate("/login");
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

  return { signup, error, isPending };
};

export default useSignup;
