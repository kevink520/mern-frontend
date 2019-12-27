import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const activeHttpRequests = useRef([]);
  const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setIsLoading(true);
    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current.push(httpAbortCtrl);
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal,
      });

      if (!response.ok) {
        throw response;
      }

      const responseData = await response.json();
      setIsLoading(false);
      return responseData;
    } catch (err) {
      if (err.text) {
        try {
          const error = await err.text();
          setError(error);
        } catch (err) {
          setError(err);
        }
      } else {
        setError(err.message || 'Sorry, there was an error');
      }

      setIsLoading(false);
    }
  }, [setIsLoading, setError]);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};

