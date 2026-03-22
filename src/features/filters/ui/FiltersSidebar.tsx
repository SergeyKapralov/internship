import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { FiltersContent } from './FiltersContent';

export const FiltersSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-fit">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-fg-highlight fixed right-4 bottom-4 z-10 flex items-center gap-2 rounded-full px-4 py-2 shadow-lg md:hidden"
      >
        <Filter className="h-4 w-4" />
        <span className="text-sm">Фильтры</span>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
      </button>

      <aside className="bg-bg hidden h-full overflow-y-auto rounded p-4 md:block">
        <h2 className="mb-4 text-lg font-bold">Фильтры</h2>
        <FiltersContent />
      </aside>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10 bg-black/50 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <aside className="bg-bg fixed right-0 bottom-0 left-0 z-20 rounded-t-xl p-4 shadow-lg md:hidden">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Фильтры</h2>
              <button onClick={() => setIsOpen(false)} className="text-2xl">
                ✕
              </button>
            </div>
            <div className="overflow-y-auto">
              <FiltersContent />
            </div>
          </aside>
        </>
      )}
    </div>
  );
};
