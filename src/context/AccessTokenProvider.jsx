import React, { createContext, useReducer } from "react";

export const AccessTokenContext = createContext();

const accessTokenReducer = function (state, action) {
  switch (action.type) {
    case "STORE": {
      return { ...state, accessToken: action.payload };
    }
  }
};

const AccessTokenProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accessTokenReducer, {
    accessToken: null,
  });
  return (
    <AccessTokenContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export default AccessTokenProvider;
