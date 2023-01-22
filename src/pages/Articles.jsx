import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Articles = () => {
  const { id } = useParams();

  useEffect(() => {}, []);

  return <div>Articles</div>;
};

export default Articles;
