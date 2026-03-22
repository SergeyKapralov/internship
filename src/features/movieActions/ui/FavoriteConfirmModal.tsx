import { Modal } from '@shared/ui';
import { useMovieActions } from '../hooks/useMovieActions';
import type { TFavoriteConfirmModal } from '../model/types';

export const FavoriteConfirmModal = ({
  isOpen,
  movieId,
  onClose,
  onConfirm,
}: TFavoriteConfirmModal) => {
  const { isFavorite } = useMovieActions();

  if (!isOpen || !movieId) return null;

  const isAlreadyFavorite = isFavorite(movieId);
  const title = isAlreadyFavorite ? 'Удалить из избранного?' : 'Добавить в избранное?';
  const buttonText = isAlreadyFavorite ? 'Удалить' : 'Добавить';

  return (
    <Modal onClose={onClose}>
      <div className="bg-bg w-fit rounded p-6 text-center">
        <p className="p-6 text-lg font-medium">{title}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onConfirm}
            className="bg-fg-highlight focus:bg-fg-highlight/60 rounded p-2 text-sm font-medium"
          >
            {buttonText}
          </button>
          <button
            onClick={onClose}
            className="bg-disabled/30 focus:bg-disabled/50 rounded p-2 text-sm font-medium"
          >
            Отмена
          </button>
        </div>
      </div>
    </Modal>
  );
};
