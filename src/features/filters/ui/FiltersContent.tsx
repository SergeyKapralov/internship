import { useMoviesFilters } from '@entities/movie/hooks';
import { RangeInput } from '@/shared/ui';

const GENRES = ['драма', 'комедия', 'ужасы', 'боевик', 'триллер', 'мелодрама', 'фантастика'];

export const FiltersContent = () => {
  const filters = useMoviesFilters();

  const handleGenre = (genre: string) => {
    if (filters.genres.includes(genre)) {
      filters.setGenres(filters.genres.filter((g) => g !== genre));
    } else {
      filters.setGenres([...filters.genres, genre]);
    }
  };

  return (
    <>
      <div className="mb-4">
        <h3 className="mb-1 text-sm font-semibold">Жанры</h3>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((genre) => (
            <label key={genre} className="flex cursor-pointer items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={filters.genres.includes(genre)}
                onChange={() => handleGenre(genre)}
                className="h-3.5 w-3.5"
              />
              <span>{genre}</span>
            </label>
          ))}
        </div>
      </div>

      <RangeInput
        label="Год"
        from={filters.yearMin}
        to={filters.yearMax}
        onFromChange={(val) => filters.setYearRange(val, filters.yearMax)}
        onToChange={(val) => filters.setYearRange(filters.yearMin, val)}
      />

      <RangeInput
        label="Рейтинг"
        from={filters.ratingMin}
        to={filters.ratingMax}
        onFromChange={(val) => filters.setRatingRange(val, filters.ratingMax)}
        onToChange={(val) => filters.setRatingRange(filters.ratingMin, val)}
      />

      <button
        onClick={filters.resetFilters}
        className="hover:bg-fg-highlight/10 w-full rounded border p-1.5 text-sm transition-colors"
      >
        Сбросить
      </button>
    </>
  );
};
