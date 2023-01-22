import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL_API } from "../constants";
import useAxiosFetch from "../hooks/useAxiosFetch";
import Banner from "../components/profilePage/Banner";
import ArticlesSection from "../components/profilePage/ArticlesSection";

const Profile = () => {
  const { username } = useParams();
  const { isLoading, request, data: profileInfo, error } = useAxiosFetch();
  const navigate = useNavigate();

  useEffect(() => {
    request(`${URL_API}/users/${username}`);
  }, [request, username]);

  if (error) {
    navigate("/");
  }

  if (isLoading || !profileInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div>
        <Banner profile={profileInfo.data} />
        <div className="px-4 py-2">
          <ArticlesSection profile={profileInfo.data} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
