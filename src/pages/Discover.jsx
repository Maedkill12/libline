import React, { useState } from "react";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import ArticleCardList from "../components/ArticleCardList";
import useArticle from "../hooks/useArticle";
import useUser from "../hooks/useUser";

const Discover = () => {
  const [articles, setArticles] = useState(null);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const { isLoading, getArticles } = useArticle();
  const [users, setUsers] = useState(null);
  const [pageUser, setPageUser] = useState(1);
  const { isLoading: isLoadingUsers, getUsers } = useUser();

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
        <h2 className="text-slate-800 font-bold text-3xl">Last Articles...</h2>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <ArticleCardList articles={articles} />
        )}
        <button
          className="cursor-pointer my-4  text-slate-800 text-lg italic border-2 border-solid border-slate-800 py-1 px-4 rounded-3xl hover:text-white hover:bg-slate-800"
          onClick={loadMoreArticlesHandle}
        >
          Show more
        </button>
      </section>
      <section className="mb-4">
        <h2 className="text-slate-800 font-bold text-3xl">Profiles</h2>
        {isLoadingUsers ? (
          <div>Loading</div>
        ) : (
          <div className="flex flex-row gap-4">
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
                      <FaUserCircle size={180} color="rgb(30, 41, 59)" />
                    )}
                    <p className="text-center text-xl text-slate-800 font-bold">
                      {user.username}
                    </p>
                  </Link>
                </div>
              ))}
          </div>
        )}

        <button
          className="cursor-pointer my-4  text-slate-800 text-lg italic border-2 border-solid border-slate-800 py-1 px-4 rounded-3xl hover:text-white hover:bg-slate-800"
          onClick={loadMoreUsersHandle}
        >
          Show more
        </button>
      </section>
    </div>
  );
};

export default Discover;
