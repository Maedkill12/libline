import React from "react";
import ArticleCard from "./ArticleCard";

const ArticleCardList = ({ articles }) => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mx-auto">
      {articles &&
        articles.map((article) => (
          <ArticleCard
            key={`${article._id}`}
            title={article.title}
            author={article.author}
            year={article.year}
            username={article.username}
            id={article._id}
            frontPageURL={article.frontPageURL}
          />
        ))}
    </div>
  );
};

export default ArticleCardList;
