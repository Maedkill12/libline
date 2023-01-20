import axios from "axios";
import { URL_API } from "../constants";
import useAccessToken from "./useAccessToken";

const useCreateAuthRefresh = () => {
  const { dispatch } = useAccessToken();
  function createAuthRefreshInterceptor() {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status !== 401) {
          return Promise.reject(error);
        }

        axios.interceptors.response.eject(interceptor);

        return axios
          .get(`${URL_API}/auth/refresh`, { withCredentials: true })
          .then((response) => {
            dispatch({
              type: "STORE_TOKEN",
              payload: response.data.accessToken,
            });
            dispatch({
              type: "STORE_USERNAME",
              payload: response.data.username,
            });
            error.response.config.headers[
              "Authorization"
            ] = `Bearer ${response.data.accessToken}`;
            return axios(error.response.config);
          })
          .catch((error2) => {
            dispatch({ type: "DELETE_TOKEN" });
            dispatch({ type: "DELETE_USERNAME" });
            // navigate("/login");
            return Promise.reject(error2);
          })
          .finally();
      }
    );
  }
  return { createAuthRefreshInterceptor };
};

export default useCreateAuthRefresh;
