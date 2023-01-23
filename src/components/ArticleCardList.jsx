import React from "react";
import ArticleCard from "./ArticleCard";

const ArticleCardList = ({ articles }) => {
  return (
    <div className="flex flex-row flex-wrap gap-4 w-[calc(8*175px+7*16px)] mx-auto">
      {articles &&
        articles.map((article) => (
          <ArticleCard
            key={`${article._id}`}
            title={article.title}
            author={article.author}
            year={article.year}
            username={article.username}
            id={article._id}
          />
        ))}
    </div>
  );
};

export default ArticleCardList;
