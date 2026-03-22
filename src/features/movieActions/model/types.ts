import type { ReactNode } from 'react';

export type TFavoriteConfirmModal = {
  isOpen: boolean;
  movieId: string;
  onClose: () => void;
  onConfirm: () => void;
};

export type TMovieActionsProvider = {
  children: ReactNode;
  onMovieClick?: (movieId: string) => void;
  onFavoriteClick?: (movieId: string) => void;
  onCompareClick?: (movieId: string) => void;
};
