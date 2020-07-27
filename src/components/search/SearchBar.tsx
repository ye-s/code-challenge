import React, { FC, useEffect, useState } from 'react';
import { Input } from '@material-ui/core';
import { ReactComponent as SeachIcon } from '../../assets/search.svg';
import './SearchBar.scss';

interface SearchProps {
  onSearch: (name: string) => void;
}

const SearchBar: FC<SearchProps> = ({ onSearch }) => {

  const [ searchInput, setSearchInput ] = useState('');

  // Add delay for every new character added in search query
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchInput);
    }, 700)

    return () => clearTimeout(delayDebounceFn)
  }, [searchInput])

  return (
    <div className="search-bar">
      <SeachIcon className="search-bar__icon" />
      <Input
        className="search-bar__input"
        onChange={(e) => { setSearchInput(e.currentTarget.value)}}
        placeholder="Seach cryptocurrency, rates and prices"
        disableUnderline={true}
        type="search"
      />
    </div>
  );
};

export default SearchBar;