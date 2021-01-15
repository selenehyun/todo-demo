import { useCallback, useState } from "react";

export const useApi = (apiFn) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const fetch = useCallback(
    async (...args) => {
      setLoading(true);
      const axiosResponse = await apiFn(...args);
      setData(axiosResponse?.data);
      setLoading(false);
    },
    [apiFn]
  );

  return [fetch, data, loading];
};
