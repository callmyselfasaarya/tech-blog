import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Category } from '../../types';

interface CategoryFilterProps {
  categories: Category[];
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'ALL';

  const handleSelect = (categoryName: string) => {
    if (categoryName === 'ALL') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryName.toUpperCase());
    }
    setSearchParams(searchParams);
  };

  const allList = [
    { id: 'all', name: 'ALL', count: categories.reduce((acc, c) => acc + c.count, 0) },
    ...categories
  ];

  return (
    <div className="mb-8 overflow-x-auto no-scrollbar py-1">
      <div className="flex items-center gap-2">
        {allList.map((cat) => {
          const isSelected = currentCategory.toUpperCase() === cat.name.toUpperCase();
          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.name)}
              className={`px-3.5 py-1.5 text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer rounded-sm border whitespace-nowrap ${
                isSelected
                  ? 'bg-[#1A1A1A] dark:bg-[#EEEEEE] text-[#FAF9F5] dark:text-[#121212] border-[#1A1A1A] dark:border-[#EEEEEE] font-semibold'
                  : 'bg-[#FAF9F5] dark:bg-[#121212] text-[#6B685F] dark:text-[#A0A0A0] border-[#E8E5DC] dark:border-[#262626] hover:border-[#1A1A1A] dark:hover:border-[#EEEEEE] hover:text-[#1A1A1A] dark:hover:text-[#ECECEC]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
