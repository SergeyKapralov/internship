import { useCallback, useState } from 'react';
import { useMovieActions } from '../hooks/useMovieActions';
import { useModalStore } from '@shared/lib/store';
import { FavoriteConfirmModal } from './FavoriteConfirmModal';
import type { TMovieActionsProvider } from '../model/types';

export const MovieActionsProvider = ({
  children,
  onMovieClick,
  onFavoriteClick,
  onCompareClick,
}: TMovieActionsProvider) => {
  const { handleMovieClick, handleFavoriteClick, handleCompareClick } = useMovieActions();
  const [pendingMovieId, setPendingMovieId] = useState<string>('');
  const { isOpen, onOpen, onClose } = useModalStore();

  const handleModalConfirm = () => {
    if (pendingMovieId) {
      handleFavoriteClick(pendingMovieId);
    }
    onClose();
    setPendingMovieId('');
  };

  const handleModalClose = () => {
    onClose();
    setPendingMovieId('');
  };

  const handleCardClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      const card = target.closest('[data-movie-id]');
      if (!card) return;

      const movieId = card.getAttribute('data-movie-id')!;

      if (target.closest('[data-action="favorite"]')) {
        if (onFavoriteClick) {
          onFavoriteClick(movieId);
        } else {
          setPendingMovieId(movieId);
          onOpen();
        }
      } else if (target.closest('[data-action="compare"]')) {
        if (onCompareClick) {
          onCompareClick(movieId);
        } else {
          handleCompareClick(movieId);
        }
      } else {
        if (onMovieClick) {
          onMovieClick(movieId);
        } else {
          handleMovieClick(movieId);
        }
      }
    },
    [handleMovieClick, handleCompareClick, onMovieClick, onFavoriteClick, onCompareClick, onOpen]
  );

  return (
    <>
      <div onClick={handleCardClick} className="contents">
        {children}
      </div>

      <FavoriteConfirmModal
        isOpen={isOpen}
        movieId={pendingMovieId}
        onConfirm={handleModalConfirm}
        onClose={handleModalClose}
      />
    </>
  );
};
