import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Star, Heart, GitCompare, Clapperboard } from 'lucide-react';

type TData = {
  src: string;
  alt: string;
  title: string;
  released: string;
  score: number;
};

type TProps = {
  data: TData;
  onClick: () => void;
  onFavoriteClick: () => void;
  onCompareClick: () => void;
};

export const MovieCard = ({ data, onClick, onFavoriteClick, onCompareClick }: TProps) => {
  const { alt, src, released, score, title } = data;
  const [imgError, setImgError] = useState(false);

  const hasValidSrc = src && src.trim() !== '';
  const showImage = hasValidSrc && !imgError;

  return (
    <div
      onClick={onClick}
      className={cn(
        'group bg-element flex w-full cursor-pointer items-center active:scale-[0.998]',
        'gap-4 rounded p-4 shadow-md transition-all hover:scale-101 hover:shadow-lg'
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt || 'Movie poster'}
          className="h-27 w-18 rounded-md object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className={cn(
            'text-disabled flex h-27 w-18 flex-col items-center justify-center',
            'rounded-md bg-gray-300 text-xs dark:bg-gray-700'
          )}
        >
          <Clapperboard className="h-6 w-6" />
          <p>No image</p>
        </div>
      )}

      <div className="flex-1">
        <h2 className="group-hover:text-fg-highlight mb-1 text-lg font-bold">{title}</h2>
        <p className="text-disabled text-sm">{released}</p>
        <div className="mt-1 flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
          <span className="text-sm">{score.toFixed(1)}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteClick();
          }}
          className={cn(
            'bg-element-secondary text-fg-alternative flex items-center justify-center gap-2',
            'rounded-md p-2 transition-colors hover:bg-blue-600'
          )}
        >
          <Heart className="h-4 w-4" />
          favorite
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onCompareClick();
          }}
          className={cn(
            'text-fg-alternative bg-disabled flex items-center justify-center gap-2 rounded-md p-2',
            'transition-colors hover:bg-gray-600'
          )}
        >
          <GitCompare className="h-4 w-4" />
          compare
        </button>
      </div>
    </div>
  );
};
