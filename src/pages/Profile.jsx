import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Banner from "../components/profilePage/Banner";
import ArticlesSection from "../components/profilePage/ArticlesSection";
import useUser from "../hooks/useUser";
import { useState } from "react";

const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const { isLoading, error, getUserByUsername } = useUser();

  useEffect(() => {
    const getProfile = async () => {
      const data = await getUserByUsername(username);
      setProfile(data);
    };
    getProfile();
  }, [getUserByUsername, username]);

  if (error) {
    return <div>Profile not found</div>;
  }

  if (isLoading || !profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div>
        <Banner profile={profile} />
        <div className="px-4 py-2">
          <ArticlesSection profile={profile} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
