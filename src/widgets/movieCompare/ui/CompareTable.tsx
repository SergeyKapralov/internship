import type { TMovie } from '../model/types';

const CompareRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col text-sm">
    <div className="text-fg-highlight border-b p-1 font-medium">{label}</div>
    <div className="flex gap-2 p-1">{children}</div>
  </div>
);

export const CompareTable = ({ movies }: { movies: TMovie[] }) => (
  <>
    <CompareRow label="Название">
      {movies.map((m) => (
        <div key={m.id} className="flex-1">
          {m.name}
        </div>
      ))}
    </CompareRow>
    <CompareRow label="Год">
      {movies.map((m) => (
        <div key={m.id} className="flex-1">
          {m.year}
        </div>
      ))}
    </CompareRow>
    <CompareRow label="Рейтинг">
      {movies.map((m) => (
        <div key={m.id} className="flex-1">
          ★ {m.rating?.kp?.toFixed(1) || '—'}
        </div>
      ))}
    </CompareRow>
    <CompareRow label="Жанры">
      {movies.map((m) => (
        <div key={m.id} className="flex-1">
          {m.genres?.map((g) => g.name).join(', ') || '—'}
        </div>
      ))}
    </CompareRow>
    <CompareRow label="Длительность">
      {movies.map((m) => (
        <div key={m.id} className="flex-1">
          {m.movieLength ? `${m.movieLength} мин` : '—'}
        </div>
      ))}
    </CompareRow>
  </>
);
