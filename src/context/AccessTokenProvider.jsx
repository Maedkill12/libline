import React, { createContext, useReducer } from "react";

export const AccessTokenContext = createContext();

const accessTokenReducer = function (state, action) {
  switch (action.type) {
    case "STORE_TOKEN": {
      return { ...state, accessToken: action.payload };
    }
    case "DELETE_TOKEN": {
      return { ...state, accessToken: null };
    }
    case "STORE_USER_INFO": {
      return {
        ...state,
        username: action.payload.username,
        userId: action.payload.userId,
      };
    }
    case "DELETE_USER_INFO": {
      return { ...state, username: null, userId: null };
    }
    default: {
      return state;
    }
  }
};

const AccessTokenProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accessTokenReducer, {
    accessToken: null,
    username: null,
    userId: null,
  });
  return (
    <AccessTokenContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export default AccessTokenProvider;
