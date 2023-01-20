import React from "react";
import ArticleCard from "./ArticleCard";

const ArticleCardList = ({ articles }) => {
  return (
    <div className="flex flex-row flex-wrap gap-4">
      {articles &&
        articles.map((article) => (
          <ArticleCard
            key={`${article._id}`}
            title={article.title}
            author={article.author}
            year={article.year}
            username={article.username}
          />
        ))}
    </div>
  );
};

export default ArticleCardList;