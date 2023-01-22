import React from "react";
import defaultIcon from "../assets/default.png";

const ArticleCard = ({ title, year, username, frontPageURL = null }) => {
  return (
    <div className="w-[175px] h-[300px] bg-slate-800 flex flex-col rounded-lg shadow-lg shadow-slate-800 overflow-hidden cursor-pointer">
      <div className="min-h-[225px]">
        <img
          src={frontPageURL ? frontPageURL : defaultIcon}
          className="h-full object-cover"
          alt="Front page"
        />
      </div>
      <div className="text-white py-1 px-2 flex flex-col justify-between flex-grow">
        <h2 className="font-bold">{title}</h2>
        <div className="flex flex-row items-center justify-between">
          <h3>
            by <span className="text-slate-300">{username}</span>
          </h3>
          <p className="text-right italic">{year}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
