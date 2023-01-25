import React, { useState } from "react";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import ArticleCardList from "../components/ArticleCardList";
import useArticle from "../hooks/useArticle";
import useUser from "../hooks/useUser";

const Discover = () => {
  const [articles, setArticles] = useState(null);
  const [limit] = useState(5);
  const [page, setPage] = useState(1);
  const { getArticles } = useArticle();
  const [users, setUsers] = useState(null);
  const [pageUser, setPageUser] = useState(1);
  const { getUsers } = useUser();

  const loadMoreArticlesHandle = async () => {
    const articleList = await getArticles(
      `limit=${limit}&page=${page + 1}&sort=-createdAt`
    );
    setArticles((prev) => [...prev, ...articleList]);
    setPage((prev) => prev + 1);
  };

  const loadMoreUsersHandle = async () => {
    const usersList = await getUsers(
      `limit=${limit}&page=${pageUser + 1}&sort=-createdAt`
    );
    setUsers((prev) => [...prev, ...usersList]);
    setPageUser((prev) => prev + 1);
  };

  useEffect(() => {
    const getArticlesList = async () => {
      const articlesList = await getArticles(`limit=${limit}&sort=-createdAt`);
      setArticles(articlesList);
    };
    getArticlesList();
  }, [limit, getArticles]);

  useEffect(() => {
    const getUsersList = async () => {
      const usersList = await getUsers(`limit=${limit}&sort=-createdAt`);
      setUsers(usersList);
    };
    getUsersList();
  }, [limit, getUsers]);

  return (
    <div className="px-4">
      <section className="mb-4">
        <h2 className="text-slate-800 dark:text-white font-bold text-3xl">
          Last Articles...
        </h2>
        <ArticleCardList articles={articles} />
        <button
          className="cursor-pointer my-4  text-slate-800 dark:text-white dark:bg-slate-700 text-lg italic border-2 border-solid border-slate-800 py-1 px-4 rounded-3xl hover:text-white hover:bg-slate-800"
          onClick={loadMoreArticlesHandle}
        >
          Show more
        </button>
      </section>
      <section className="mb-4">
        <h2 className="text-slate-800 dark:text-white font-bold text-3xl">
          Profiles
        </h2>
        <div className="flex  flex-row gap-4 flex-wrap">
          {users &&
            users.map((user) => (
              <div
                key={user._id}
                className="cursor-pointer flex flex-col justify-center"
              >
                <Link to={`/profile/${user.username}`}>
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      className="h-44 w-44 rounded-full object-cover"
                      alt="Profile"
                    />
                  ) : (
                    <div className="text-slate-800 dark:text-slate-200">
                      <FaUserCircle size={180} />
                    </div>
                  )}
                  <p className="text-center text-xl text-slate-800 dark:text-white font-bold">
                    {user.username}
                  </p>
                </Link>
              </div>
            ))}
        </div>
        <button
          className="cursor-pointer my-4  text-slate-800 text-lg italic dark:text-white dark:bg-slate-700 border-2 border-solid border-slate-800 py-1 px-4 rounded-3xl hover:text-white hover:bg-slate-800"
          onClick={loadMoreUsersHandle}
        >
          Show more
        </button>
      </section>
    </div>
  );
};

export default Discover;
