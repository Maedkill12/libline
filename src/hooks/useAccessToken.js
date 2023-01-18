import { useContext } from "react";
import { AccessTokenContext } from "../context/AccessTokenProvider";

const useAccessToken = () => {
  const context = useContext(AccessTokenContext);
  if (!context) {
    throw new Error("useAccessToken must be inside AccessTokenProvider");
  }
  return context;
};

export default useAccessToken;
