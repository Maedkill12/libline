import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import defaultIcon from "../assets/default.png";
import defaultBanner from "../assets/icon.png";
import IconButton from "../components/IconButton";
import { AiFillFilePdf, AiOutlineCloseCircle } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import ArticleCardList from "../components/ArticleCardList";
import EditArticleForm from "../components/articlePage/EditArticleForm";
import useArticle from "../hooks/useArticle";
import useAccessToken from "../hooks/useAccessToken";
import useModal from "../hooks/useModal";

const Articles = () => {
  const { id } = useParams();
  const { error, isLoading, getArticleById, getArticlesByUsername } =
    useArticle();
  const [article, setArticle] = useState(null);
  const [recommendedList, setRecommendedList] = useState(null);
  const [username, setUsername] = useState(null);
  const { username: userLogged, accessToken } = useAccessToken();
  const {
    Modal: DeleteModal,
    closeModal: closeDeleteModal,
    openModal: openDeleteModal,
  } = useModal();
  const {
    Modal: EditModal,
    closeModal: closeEditModal,
    openModal: openEditModal,
  } = useModal();
  const { deleteArticle } = useArticle();
  const navigate = useNavigate();

  const deleteArticleHandle = async () => {
    const articleDeleted = await deleteArticle(id, accessToken);
    if (articleDeleted) {
      navigate(`/profile/${username}`);
    }
  };

  useEffect(() => {
    const getArticle = async () => {
      const data = await getArticleById(id);
      setArticle(data);
      if (data) {
        const username = data.author.username;
        setUsername(username);
      }
    };
    getArticle();
  }, [id, getArticleById]);

  useEffect(() => {
    const getRecommended = async () => {
      if (!username) {
        return;
      }
      const recommended = await getArticlesByUsername(username, "limit=6");
      setRecommendedList(recommended);
    };
    getRecommended();
  }, [getArticlesByUsername, username]);

  if (error) {
    return <div>Article not found</div>;
  }

  if (isLoading || !article || !recommendedList) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DeleteModal>
        <div className="w-[400px] bg-white rounded-lg shadow-lg shadow-black">
          <button className="m-0" onClick={closeDeleteModal}>
            <AiOutlineCloseCircle size={40} />
          </button>
          <div className="px-4 pb-4 ">
            <h2 className="text-center text-2xl font-bold font-sans text-slate-800 mb-4">
              Delete article?
            </h2>
            <div className="flex flex-row justify-center items-center gap-4 list-none">
              <li onClick={deleteArticleHandle}>
                <IconButton extraStyle={"bg-red-800"}>Yes</IconButton>
              </li>
              <li onClick={closeDeleteModal}>
                <IconButton extraStyle={"bg-green-800"}>No</IconButton>
              </li>
            </div>
          </div>
        </div>
      </DeleteModal>
      <EditModal>
        <div className="w-[400px] bg-white rounded-lg shadow-lg shadow-black">
          <button className="m-0" onClick={closeEditModal}>
            <AiOutlineCloseCircle size={40} />
          </button>
          <div className="px-4 pb-4 ">
            <h2 className="text-center text-2xl font-bold font-sans text-slate-800 mb-4">
              Delete article?
            </h2>
            <EditArticleForm id={id} closeModal={closeEditModal} />
          </div>
        </div>
      </EditModal>
      <div className="w-full  py-4 px-8 flex flex-col gap-2">
        <section className="flex flex-col xl:flex-row flex-nowrap gap-4 xl:h-[500px]">
          <div className="hidden xl:block xl:w-[400px]">
            <img
              src={article.frontPageURL ? article.frontPageURL : defaultIcon}
              alt="Front page"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-full flex flex-col gap-4 h-full">
            <div className="h-[200px] w-full">
              <img
                src={article.bannerURL ? article.bannerURL : defaultBanner}
                alt="Banner"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-grow flex flex-col">
              <h2 className="text-3xl text-slate-800 font-bold font-serif">
                {article.title}{" "}
                <span className="text-lg italic font-normal">
                  ({article.year})
                </span>
              </h2>
              <p className="px-4 w-[80%] text-justify italic my-4">
                {article.description}
              </p>
              <div className="flex-grow flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-end">
                <div className="font-bold text-2xl">
                  By{" "}
                  <Link to={`/profile/${article.author.username}`}>
                    <span className="font-normal underline cursor-pointer text-slate-800 hover:text-slate-500">
                      {article.author.username}
                    </span>
                  </Link>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 list-none w-full sm:w-auto">
                  {userLogged === article.author.username && (
                    <li onClick={openDeleteModal}>
                      <IconButton
                        icon={<BsFillTrashFill />}
                        extraStyle={"bg-red-800 w-full sm:w-auto"}
                        iconPosition="left"
                      >
                        Delete
                      </IconButton>
                    </li>
                  )}
                  {userLogged === article.author.username && (
                    <li onClick={openEditModal}>
                      <IconButton
                        icon={<MdModeEdit />}
                        iconPosition="left"
                        extraStyle={"w-full sm:w-auto"}
                      >
                        Edit
                      </IconButton>
                    </li>
                  )}
                  <a href={article.docURL} target="_blank" rel="noreferrer">
                    <IconButton
                      extraStyle={"bg-red-600 w-full sm:w-auto"}
                      icon={<AiFillFilePdf />}
                      iconPosition="left"
                    >
                      Read Now
                    </IconButton>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-3xl text-slate-800 font-bold mb-2">
            Recommended
          </h2>
          <ArticleCardList articles={recommendedList} />
        </section>
      </div>
    </>
  );
};

export default Articles;
