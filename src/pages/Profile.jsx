import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { URL_API } from "../constants";
import useAccessToken from "../hooks/useAccessToken";

const Profile = () => {
  const [photoURL, setPhotoURL] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { username } = useParams();
  const { username: userLogged } = useAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    setIsPending(true);
    const getUser = async () => {
      try {
        const response = await axios.get(`${URL_API}/users/${username}`, {
          withCredentials: true,
        });
        const data = response.data;
        setIsPending(false);
        if (data.success) {
          const user = data.data;
          setPhotoURL(user.photoURL);
        }
      } catch (error) {
        setIsPending(false);
        navigate("/");
      }
    };
    getUser();
  }, []);

  return (
    <div className="w-full">
      {!isPending && (
        <div>
          <div className="bg-gradient-to-b  from-slate-100 to-slate-300 w-full py-8 px-4 flex flex-row items-center gap-4">
            <div className="w-48 h-48 bg-slate-800 rounded-full flex items-center justify-center overflow-hidden">
              {photoURL ? (
                <img
                  src={photoURL}
                  className="h-44 w-44 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle size={180} color="rgb(241 245 249)" />
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800 font-serif">
                {username}
              </h2>
              <div className="mt-6" />
            </div>
          </div>
          <div className="px-4 py-2">
            <section>
              <h2 className="text-3xl text-slate-800 font-bold">
                {username === userLogged ? "My Articles" : "Articles"}
              </h2>
              <div>Articles</div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
