import { useQueries } from '@tanstack/react-query';
import { useCompareStore } from '@/entities/movie/hooks';
import { apiClient } from '@shared/lib/api';
import { X, GitCompare } from 'lucide-react';
import { Modal } from '@shared/ui';
import { useModalStore } from '@shared/lib/store';
import type { TMovie } from '../model/types';
import { CompareContent } from './CompareContent';

export const MovieCompare = () => {
  const { compared, clear } = useCompareStore();
  const { onOpen, onClose } = useModalStore();

  const queries = useQueries({
    queries: compared.map((id) => ({
      queryKey: ['movie', id],
      queryFn: () => apiClient<TMovie>(`v1.4/movie/${id}`),
      enabled: !!id,
    })),
  });

  const movies = queries.filter((q) => q.data).map((q) => q.data!);
  const isLoading = queries.some((q) => q.isLoading);

  if (compared.length === 0) return null;

  const handleClear = () => {
    clear();
    onClose();
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="bg-fg-highlight fixed right-4 bottom-20 z-10 flex items-center gap-2 rounded-full px-4 py-2 shadow-lg md:hidden"
      >
        <GitCompare className="h-4 w-4" />
        <span className="text-sm">Сравнение ({compared.length}/2)</span>
      </button>
      <div className="bg-bg hidden h-fit rounded p-2 md:block">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-semibold">Сравнение ({compared.length}/2)</h3>
          <button onClick={clear} className="hover:text-fg-highlight text-xs">
            <X className="h-6 w-6" />
          </button>
        </div>
        <CompareContent movies={movies} isLoading={isLoading} comparedLength={compared.length} />
      </div>
      <Modal onClose={onClose}>
        <div className="bg-bg absolute bottom-0 w-full max-w-md rounded-xl p-4">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-bold">Сравнение ({compared.length}/2)</h2>
            <button onClick={onClose} className="text-2xl">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div>
            <CompareContent
              movies={movies}
              isLoading={isLoading}
              comparedLength={compared.length}
            />
          </div>
          {compared.length === 2 && (
            <button onClick={handleClear} className="bg-element w-full rounded p-4 text-sm">
              Очистить сравнение
            </button>
          )}
        </div>
      </Modal>
    </>
  );
};
