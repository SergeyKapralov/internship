// hooks/useInfiniteScroll.ts
import { useRef, useCallback, useEffect } from 'react';

type TUseInfiniteScrollProps = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number;
  rootMargin?: string;
};

export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  onLoadMore,
  threshold = 0.1,
  rootMargin = '100px',
}: TUseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading || isFetchingNextPage) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            onLoadMore();
          }
        },
        { threshold, rootMargin }
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [isLoading, isFetchingNextPage, hasNextPage, onLoadMore, threshold, rootMargin]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { targetRef };
};
