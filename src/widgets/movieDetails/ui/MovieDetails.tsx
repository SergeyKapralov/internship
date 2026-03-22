import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@shared/lib/api';
import { Clapperboard } from 'lucide-react';
import type { TMovie } from '../model/types';
import { Star } from 'lucide-react';

export const MovieDetails = () => {
  const { id } = useParams();
  const [imgError, setImgError] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => apiClient<TMovie>(`v1.4/movie/${id}`),
    enabled: !!id,
  });

  if (isLoading) return <div className="p-4 text-center">Загрузка...</div>;
  if (error) return <div className="p-4 text-center">Ошибка</div>;
  if (!data) return null;

  const actors = data.persons?.filter((p) => p.profession === 'актер') || [];
  const directors = data.persons?.filter((p) => p.profession === 'режиссер') || [];

  const hasValidPoster = data.poster?.url && data.poster.url.trim() !== '';
  const showPoster = hasValidPoster && !imgError;

  return (
    <div className="w-full p-6">
      <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:justify-start">
        {showPoster ? (
          <img
            src={data.poster.url!}
            alt={data.name}
            className="w-48 rounded-lg object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="bg-disabled flex aspect-2/3 w-48 flex-col items-center justify-center rounded-lg">
            <Clapperboard className="text-fg h-12 w-12" />
            <p className="text-fg text-bold mt-2 text-sm">Нет постера</p>
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold">{data.name}</h1>
          {data.alternativeName && <p className="text-disabled">{data.alternativeName}</p>}

          <div className="flex flex-col gap-4 pt-2 text-sm md:flex-row">
            <div className="flex items-center gap-2">
              <Star className="h-3 w-3 fill-current" /> {data.rating.kp}
            </div>
            <span>{data.year}</span>
            <span>{data.genres?.map((g) => g.name).join(', ')}</span>
          </div>

          <p className="pt-4">
            {data.description || data.shortDescription || 'Описание отсутствует'}
          </p>

          {directors.length > 0 && (
            <p className="pt-2">Режиссёр: {directors.map((d) => d.name).join(', ')}</p>
          )}

          {actors.length > 0 && (
            <p className="pt-2">
              В ролях:{' '}
              {actors
                .slice(0, 5)
                .map((a) => a.name)
                .join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
