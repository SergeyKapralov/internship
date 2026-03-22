import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Star, Heart, GitCompare, Clapperboard } from 'lucide-react';
import type { TShortMovie } from '../model/types';

type TProps = {
  data: TShortMovie;
  isFavorite?: boolean;
  isCompared?: boolean;
  enableButton?: boolean;
};

export const MovieCard = ({
  data,
  isFavorite = false,
  isCompared = false,
  enableButton = true,
}: TProps) => {
  const { id, alt, src, released, score, title } = data;
  const [imgError, setImgError] = useState(false);

  const hasValidSrc = src && src.trim() !== '';
  const showImage = hasValidSrc && !imgError;

  return (
    <div
      data-movie-id={id}
      className={cn(
        'group bg-element flex w-full cursor-pointer items-center gap-3 rounded p-3',
        'shadow-md transition-all hover:scale-[1.01] hover:shadow-lg',
        'active:scale-[0.99] md:gap-4 md:p-4'
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt || 'Movie poster'}
          className="h-24 w-16 rounded-md object-cover md:h-27 md:w-18"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="bg-disabled text-fg-alternative flex h-24 w-16 flex-col items-center justify-center rounded-md text-xs md:h-27 md:w-18">
          <Clapperboard className="h-5 w-5 md:h-6 md:w-6" />
          <p className="hidden sm:block">No image</p>
        </div>
      )}
      <div className="flex-1">
        <h2 className="group-hover:text-fg-highlight mb-1 text-base font-bold md:text-lg">
          {title}
        </h2>
        <p className="text-disabled text-xs md:text-sm">{released}</p>
        <div className="mt-1 flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 md:h-4 md:w-4" />
          <span className="text-xs md:text-sm">{score.toFixed(1)}</span>
        </div>
      </div>
      <div className="flex gap-1 md:gap-2">
        {enableButton && (
          <button
            data-action="favorite"
            className={cn(
              'flex items-center justify-center rounded-md p-2 transition-colors',
              'md:gap-2',
              isFavorite
                ? 'bg-fg-highlight text-fg-alternative'
                : 'bg-element-secondary text-fg hover:bg-fg-highlight/80 hover:text-fg-alternative'
            )}
            aria-label="Add to favorites"
          >
            <Heart className={cn('h-4 w-4 md:h-4 md:w-4', isFavorite && 'fill-current')} />
            <span className="hidden text-xs md:inline-block">Favorite</span>
          </button>
        )}
        {enableButton && (
          <button
            data-action="compare"
            className={cn(
              'flex items-center justify-center rounded-md p-2 transition-colors',
              'md:gap-2',
              isCompared
                ? 'bg-fg-highlight'
                : 'bg-disabled text-fg-alternative hover:bg-fg-highlight/80 hover:text-white'
            )}
            aria-label="Add to compare"
          >
            <GitCompare className="h-4 w-4 md:h-4 md:w-4" />
            <span className="hidden text-xs md:inline-block">Compare</span>
          </button>
        )}
      </div>
    </div>
  );
};
