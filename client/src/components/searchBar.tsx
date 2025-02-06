import React, { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

type SearchBarProps = {
  value: string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange, placeholder = 'Search...' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    // onSearchChange(value);
  };

  return (
    <div className="relative w-full mx-auto rounded  ">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {searchTerm && (
        <button
          onClick={() => {
            setSearchTerm('');
            onSearchChange('');
          }}
          className="absolute right-2 top-2 text-gray-500 hover:text-black focus:outline-none"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default SearchBar;
