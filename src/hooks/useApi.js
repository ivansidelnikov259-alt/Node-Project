import { useState, useEffect, useCallback } from 'react';

function useApi(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (abortController) => {
    try {
      setLoading(true);
      setError(null);

      // Имитация API запроса (в реальном приложении здесь будет реальный fetch)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Мок данные для демонстрации
      const mockData = {
        technologies: [
          {
            id: 1001,
            title: 'React Hooks',
            description: 'Изучение современных хуков React',
            category: 'frontend',
            status: 'not-started'
          },
          {
            id: 1002,
            title: 'Express.js',
            description: 'Фреймворк для создания серверных приложений',
            category: 'backend',
            status: 'not-started'
          },
          {
            id: 1003,
            title: 'MongoDB',
            description: 'NoSQL база данных',
            category: 'database',
            status: 'not-started'
          }
        ]
      };

      setData(mockData);

    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    const abortController = new AbortController();

    if (url) {
      fetchData(abortController);
    }

    return () => {
      abortController.abort();
    };
  }, [url, fetchData]);

  const refetch = useCallback(() => {
    const abortController = new AbortController();
    fetchData(abortController);
    return () => abortController.abort();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

export default useApi;