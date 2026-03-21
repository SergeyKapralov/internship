import { MovieCard } from '@/entities/movie/ui/MovieCard';
import { useInfiniteMovies, useSyncFiltersWithURL, useInfiniteScroll } from '../hooks';

export const MovieCatalog = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteMovies();

  useSyncFiltersWithURL();

  const { targetRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    onLoadMore: fetchNextPage,
    threshold: 0.1,
    rootMargin: '100px',
  });

  const allMovies = data?.pages.flatMap((page) => page.movies) ?? [];

  if (isLoading) {
    return <div className="p-4 text-center">Загрузка...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        {allMovies.map((movie, idx) => (
          <div key={movie.id} ref={idx === allMovies.length - 1 ? targetRef : undefined}>
            <MovieCard data={movie} isFavorite={false} isCompared={false} />
          </div>
        ))}
      </div>

      {isFetchingNextPage && <div className="p-4 text-center">Загружаем ещё...</div>}
    </div>
  );
};
