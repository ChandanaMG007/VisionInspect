import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to execute API calls with consistent loading, error, and caching behavior
 * @param {Function} fetchFn - API function returning a Promise
 * @param {Array} deps - Dependency array to trigger refetch
 */
export function useInspectionData(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      console.error('Data fetch error:', err);
      setError(err.message || 'An unexpected error occurred while loading inspection data.');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, reload: execute, setData };
}
