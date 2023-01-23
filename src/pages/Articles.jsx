import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import defaultIcon from "../assets/default.png";
import defaultBanner from "../assets/icon.png";
import IconButton from "../components/IconButton";
import { AiFillFilePdf } from "react-icons/ai";
import ArticleCardList from "../components/ArticleCardList";
import useArticle from "../hooks/useArticle";

const Articles = () => {
  const { id } = useParams();
  // const { data: articleInfo, error, isLoading, request } = useAxiosFetch();
  const { error, isLoading, getArticleById, getArticlesByUsername } =
    useArticle();
  const [article, setArticle] = useState(null);
  const [recommendedList, setRecommendedList] = useState([]);

  useEffect(() => {
    const getArticle = async () => {
      const data = await getArticleById(id);
      setArticle(data);
      if (data) {
        const username = data.author.username;
        const recommended = await getArticlesByUsername(username, "limit=8");
        setRecommendedList(recommended);
      }
    };
    getArticle();
  }, [id, getArticleById, getArticlesByUsername]);

  if (error) {
    return <div>Article not found</div>;
  }

  if (isLoading || !article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full  py-4 px-8 flex flex-col gap-2">
      <section className="flex flex-row flex-nowrap gap-4 h-[500px]">
        <div className="w-[400px]">
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
            <p className="px-4 w-[80%] text-justify">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste at
              quaerat molestiae. Cum sit quaerat molestias obcaecati voluptates
              animi sapiente perferendis natus! Harum, sed reiciendis modi
              minima incidunt illo repudiandae! Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Sed doloremque impedit dolore eaque,
              quidem, architecto quisquam cum ullam, voluptatibus beatae
              laudantium mollitia nulla pariatur temporibus sapiente commodi!
              Velit, ipsam provident.
            </p>
            <div className="flex-grow flex flex-row justify-between items-end">
              <div className="font-bold text-2xl">
                By{" "}
                <Link to={`/profile/${article.author.username}`}>
                  <span className="font-normal underline cursor-pointer text-slate-800 hover:text-slate-500">
                    {article.author.username}
                  </span>
                </Link>
              </div>
              <div>
                <a
                  href="https://www.google.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconButton
                    extraStyle={"bg-red-600"}
                    icon={<AiFillFilePdf />}
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
        <h2 className="text-3xl text-slate-800 font-bold mb-2">Recommended</h2>
        <ArticleCardList articles={recommendedList} />
      </section>
    </div>
  );
};

export default Articles;
