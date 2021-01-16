import { useCallback, useState } from "react";

export const useApi = (apiFn) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const fetch = useCallback(
    async (...args) => {
      setError(null);
      setData(null);
      setLoading(true);
      try {
        const axiosResponse = await apiFn(...args);
        setData(axiosResponse?.data);
      } catch (error) {
        if (error.response?.status === 400) {
          setError(error.response?.data);
        } else {
          throw error;
        }
      } finally {
        setLoading(false);
      }
    },
    [apiFn]
  );

  return [fetch, data, loading, error];
};
