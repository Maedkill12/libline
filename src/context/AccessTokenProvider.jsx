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
    case "STORE_USERNAME": {
      return { ...state, username: action.payload };
    }
    case "DELETE_USERNAME": {
      return { ...state, username: null };
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
  });
  return (
    <AccessTokenContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export default AccessTokenProvider;
