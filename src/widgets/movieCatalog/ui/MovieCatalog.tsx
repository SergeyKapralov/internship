import { MovieCard } from '@/entities/movie/ui/MovieCard';
import { MovieActionsProvider, useMovieActions } from '@/features/movieActions';
import { useInfiniteMovies, useSyncFiltersWithURL, useInfiniteScroll } from '../hooks';

export const MovieCatalog = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isLoading } =
    useInfiniteMovies();
  const { getIsFavorite, getIsCompared } = useMovieActions();

  useSyncFiltersWithURL();

  const { targetRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    onLoadMore: fetchNextPage,
    threshold: 0.1,
  });

  const allMovies = data?.pages.flatMap((page) => page.movies) ?? [];

  return (
    <div className="flex h-full max-h-[90dvh] w-full gap-2">
      <div className="flex-1 overflow-y-auto">
        <MovieActionsProvider>
          <div className="grid grid-cols-1 gap-4">
            {allMovies.map((movie, idx) => (
              <div key={movie.id} ref={idx === allMovies.length - 1 ? targetRef : undefined}>
                <MovieCard
                  data={movie}
                  isFavorite={getIsFavorite(movie.id)}
                  isCompared={getIsCompared(movie.id)}
                />
              </div>
            ))}
          </div>
        </MovieActionsProvider>
        {isFetchingNextPage && <div className="p-4 text-center">Загружаем ещё...</div>}
        {isError && <div className="p-4 text-center">Произошла ошибка</div>}
        {isLoading && allMovies.length === 0 && <div className="p-4 text-center">Загрузка...</div>}
        {!isLoading && !isError && allMovies.length === 0 && (
          <div className="p-4 text-center">Ничего не нашлось по заданным параметрам</div>
        )}
      </div>
    </div>
  );
};
