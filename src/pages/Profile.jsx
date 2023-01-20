import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { URL_API } from "../constants";
import useAccessToken from "../hooks/useAccessToken";
import IconButton from "../components/IconButton";
import useModal from "../hooks/useModal";
import AddArticleForm from "../components/AddArticleForm";
import ArticleCardList from "../components/ArticleCardList";
import useArticle from "../hooks/useArticle";
import EditProfileForm from "../components/EditProfileForm";

const Profile = () => {
  const [photoURL, setPhotoURL] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [articlesList, setArticlesList] = useState([]);
  const { username } = useParams();
  const { username: userLogged } = useAccessToken();
  const {
    Modal: AddArticleModal,
    closeModal: closeArticleModal,
    openModal: openArticleModal,
  } = useModal();
  const {
    Modal: EditProfileModal,
    openModal: openEditProfileModal,
    closeModal: closeEditProfileModal,
  } = useModal();
  const { getArticlesByAuthor } = useArticle();
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

  useEffect(() => {
    const getArticles = async () => {
      const articles = await getArticlesByAuthor(username);
      setArticlesList(articles);
      console.log(articles);
    };
    getArticles();
  }, []);

  return (
    <div className="w-full">
      <AddArticleModal>
        <div className="w-[400px] bg-white rounded-lg shadow-lg shadow-black">
          <button className="m-0" onClick={closeArticleModal}>
            <AiOutlineCloseCircle size={40} />
          </button>
          <div className="px-4 pb-4 ">
            <h2 className="text-center text-2xl font-bold font-sans text-slate-800 mb-4">
              Add Article
            </h2>
            <AddArticleForm />
          </div>
        </div>
      </AddArticleModal>
      <EditProfileModal>
        <div className="w-[400px] bg-white rounded-lg shadow-lg shadow-black">
          <button className="m-0" onClick={closeEditProfileModal}>
            <AiOutlineCloseCircle size={40} />
          </button>
          <div className="px-4 pb-4 ">
            <h2 className="text-center text-2xl font-bold font-sans text-slate-800 mb-4">
              Edit Profile
            </h2>
            <EditProfileForm />
          </div>
        </div>
      </EditProfileModal>
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
              {username == userLogged && (
                <div className="mt-1" onClick={openEditProfileModal}>
                  <IconButton icon={<MdModeEdit />}></IconButton>
                </div>
              )}
            </div>
          </div>
          <div className="px-4 py-2">
            <section>
              <div className="flex flex-row items-center justify-between">
                <h2 className="text-3xl text-slate-800 font-bold">
                  {username === userLogged ? "My Articles" : "Articles"}
                </h2>
                {username === userLogged && (
                  <div onClick={openArticleModal}>
                    <IconButton
                      icon={<IoMdAdd color="rgb(241 245 249)" size={24} />}
                    ></IconButton>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <ArticleCardList articles={articlesList} />
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
