import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL_API } from "../constants";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsPending(true);
    const getUser = async () => {
      try {
        const response = await axios.get(`${URL_API}/users/${id}`, {
          withCredentials: true,
        });
        const data = response.data;
        setIsPending(false);
        if (data.success) {
          const user = data.data;
          setUsername(user.username);
          setEmail(user.email);
        }
      } catch (error) {
        setIsPending(false);
        navigate("/");
      }
    };
    getUser();
  }, []);

  return (
    <div>
      {!isPending && (
        <div>
          <p>username: {username}</p>
          <p>email: {email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
