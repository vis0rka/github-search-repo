import { Stack } from 'components/Stack';
import { FilterContextProvider } from 'features/github-search/context/FiltersContext';
import { SearchResults } from 'features/github-search/SearchResults';
import { SearchBar } from '../../features/github-search/SearchBar';

const SearchPage = () => {
  return (
    <FilterContextProvider>
      <SearchBar />
      <SearchResults />
    </FilterContextProvider>
  );
};

export default SearchPage;
