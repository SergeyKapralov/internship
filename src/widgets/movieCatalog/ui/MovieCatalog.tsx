import { MovieCard } from '@/entities/movie/ui/MovieCard';
import { useInfiniteMovies, useSyncFiltersWithURL, useInfiniteScroll } from '../hooks';
import { FiltersSidebar } from '@/features/filters';

export const MovieCatalog = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isLoading } =
    useInfiniteMovies();

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

  return (
    <div className="flex h-full max-h-[90dvh] w-full">
      <FiltersSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 gap-4">
          {allMovies.map((movie, idx) => (
            <div key={movie.id} ref={idx === allMovies.length - 1 ? targetRef : undefined}>
              <MovieCard data={movie} isFavorite={false} isCompared={false} />
            </div>
          ))}
        </div>

        {isFetchingNextPage && <div className="p-4 text-center">Загружаем ещё...</div>}
        {isError && <div className="p-4 text-center">Произошла ошибка</div>}
        {isLoading && <div className="p-4 text-center">Загрузка...</div>}
        {allMovies.length === 0 && !isError && !isLoading && (
          <div className="p-4 text-center">Ничего не нашлось по заданным параметрам</div>
        )}
      </div>
    </div>
  );
};
