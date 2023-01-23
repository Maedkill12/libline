import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useAxiosFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const request = useCallback(
    async (url, options = {}, method = "get") => {
      setIsLoading(true);
      setIsCancelled(false);
      console.log("testing axios fetch");
      try {
        const response = await axios({
          method,
          url,
          ...options,
        });
        if (!isCancelled) {
          setData(response.data);
          setIsLoading(false);
          setError(null);
        }
      } catch (error) {
        if (!isCancelled) {
          setError(error);
          setIsLoading(false);
        }
      }
    },
    [isCancelled]
  );

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { data, error, isLoading, request };
};

export default useAxiosFetch;
