import type { TMovie } from '../model/types';
import { CompareTable } from './CompareTable';

export const CompareContent = ({
  movies,
  isLoading,
  comparedLength,
}: {
  movies: TMovie[];
  isLoading: boolean;
  comparedLength: number;
}) => (
  <>
    {isLoading && <div className="p-4 text-center">Загрузка...</div>}
    {comparedLength === 1 && !isLoading && (
      <div className="text-disabled p-4 text-center text-sm">
        Выберите второй фильм для сравнения
      </div>
    )}
    {comparedLength === 2 && !isLoading && movies.length === 2 && <CompareTable movies={movies} />}
  </>
);
