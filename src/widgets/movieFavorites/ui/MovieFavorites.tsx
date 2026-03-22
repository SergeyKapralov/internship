import { MovieCard } from '@/entities/movie/ui/MovieCard';
import { useFavoriteMovies } from '@/features/favorites/hooks/useFavoriteMovies';
import { Link } from 'react-router-dom';

export const MovieFavorites = () => {
  const { movies, isLoading, isError, favoritesCount } = useFavoriteMovies();

  if (isLoading) return <div className="p-4 text-center">Загрузка...</div>;
  if (isError) return <div className="p-4 text-center">Ошибка</div>;
  if (!movies) return null;

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="mb-2 text-2xl font-bold">Избранное пусто</h2>
        <p className="text-disabled mb-4">Добавляйте фильмы в избранное, чтобы не потерять их</p>
        <Link to="/" className="hover:text-fg-highlight rounded-lg">
          Перейти к каталогу
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Избранные фильмы</h1>
      <p className="mb-6 text-gray-600">Всего: {favoritesCount}</p>

      <div className="grid grid-cols-1 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            enableButton={false}
            data={{
              id: String(movie.id),
              src: movie.poster?.url ?? undefined,
              alt: movie.alternativeName || movie.name,
              title: movie.name,
              released: String(movie.year),
              score: movie.rating?.kp ?? 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};
