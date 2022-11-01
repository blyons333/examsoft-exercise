import { useState, useEffect } from 'react';
import axios from 'axios';

export const useGetApiData = (initialData, initialUrl) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const getData = async () => {
      setIsError(false);
      setErrorMessage();
      setIsLoading(true);

      try {
        const result = await axios.get(url);
        setData(result.data);
      } catch (err) {
        console.error(err);
        setErrorMessage(err);
        setIsError(true);
      }

      setIsLoading(false);
    };

    getData();
  }, [url]);

  return [{ data, isLoading, isError, errorMessage }, setUrl];
};
