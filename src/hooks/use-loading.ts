import { useState, useEffect } from 'react';

interface UseLoadingOptions {
  initialDelay?: number;
  minLoadingTime?: number;
  onLoadingComplete?: () => void;
}

export const useLoading = (options: UseLoadingOptions = {}) => {
  const {
    initialDelay = 0,
    minLoadingTime = 1000,
    onLoadingComplete
  } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTime(Date.now());
      setIsLoading(false);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay]);

  useEffect(() => {
    if (!isLoading && startTime) {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minLoadingTime - elapsed);

      if (remaining > 0) {
        const timer = setTimeout(() => {
          onLoadingComplete?.();
        }, remaining);
        return () => clearTimeout(timer);
      } else {
        onLoadingComplete?.();
      }
    }
  }, [isLoading, startTime, minLoadingTime, onLoadingComplete]);

  const setLoading = (loading: boolean) => {
    if (loading) {
      setIsLoading(true);
      setStartTime(null);
    } else {
      setStartTime(Date.now());
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    setLoading
  };
}; 