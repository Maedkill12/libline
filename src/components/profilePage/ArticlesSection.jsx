import React, { useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { URL_API } from "../../constants";
import useAccessToken from "../../hooks/useAccessToken";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useModal from "../../hooks/useModal";
import ArticleCardList from "../ArticleCardList";
import IconButton from "../IconButton";
import AddArticleForm from "./AddArticleForm";

const ArticlesSection = ({ profile: { username } }) => {
  const { username: userLogged } = useAccessToken();
  const { Modal, closeModal, openModal } = useModal();
  const { data, request } = useAxiosFetch();

  useEffect(() => {
    request(`${URL_API}/articles?username=${username}`);
  }, [request, username]);

  return (
    <>
      <Modal>
        <div className="w-[400px] bg-white rounded-lg shadow-lg shadow-black">
          <button className="m-0" onClick={closeModal}>
            <AiOutlineCloseCircle size={40} />
          </button>
          <div className="px-4 pb-4 ">
            <h2 className="text-center text-2xl font-bold font-sans text-slate-800 mb-4">
              Add Article
            </h2>
            <AddArticleForm />
          </div>
        </div>
      </Modal>
      <section>
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-3xl text-slate-800 font-bold">
            {username === userLogged ? "My Articles" : "Articles"}
          </h2>
          {username === userLogged && (
            <div onClick={openModal}>
              <IconButton
                icon={<IoMdAdd color="rgb(241 245 249)" size={24} />}
              ></IconButton>
            </div>
          )}
        </div>
        <div className="mt-4">
          <ArticleCardList articles={data?.data} />
        </div>
      </section>
    </>
  );
};

export default ArticlesSection;
