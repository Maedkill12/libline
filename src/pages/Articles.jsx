import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL_API } from "../constants";
import useAxiosFetch from "../hooks/useAxiosFetch";

const Articles = () => {
  const { id } = useParams();
  const { data, error, isLoading, request } = useAxiosFetch();
  useEffect(() => {
    request(`${URL_API}/articles/${id}`);
  }, [request, id]);

  if (error) {
    return <div>Article not found</div>;
  }

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return <div>{data.data.title}</div>;
};

export default Articles;
