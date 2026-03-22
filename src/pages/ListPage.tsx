import { MovieCatalog } from '@/widgets/movieCatalog';
import { MovieCompare } from '@/widgets/movieCompare';
import { FiltersSidebar } from '@/features/filters';

export const ListPage = () => {
  return (
    <div className="flex w-full flex-col gap-2 md:flex-row">
      <div className="flex flex-col gap-2 overflow-y-hidden">
        <FiltersSidebar />
        <MovieCompare />
      </div>
      <MovieCatalog />
    </div>
  );
};
