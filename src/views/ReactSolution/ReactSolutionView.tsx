import { Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { CONTENT_MAX_WIDTH } from '../../components/config';
import { sleep, SUGGESTIONS, User } from '../../utils';
import { AppLink, AppView } from '../../components';
import AutoComplete from './components/AutoComplete';
import ResultTable from './components/ResultTable';

type SearchResult = User[];

/**
 * Renders "React Solution" view
 * url: /react
 * @page ReactSolution
 */
const MuiSolutionView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | undefined>();
  const [searchText, setSearchText] = useState(''); // Text of the last search
  const [triggerSearch, setTriggerSearch] = useState(0);
  const [value, setValue] = useState(''); // Current user input

  // Perform API call for current .searchText value
  const doSearch = useCallback(async () => {
    setIsLoading(true);
    try {
      setSearchText(value); // Save the last search text

      // Unfortunately, the API doesn't support search by name or other field,
      // so we fetch all records and filter them locally
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/`);
      const data = await response.json();
      await sleep(1000); // TODO: remove this "slow network" emulation

      // Filter data only when .searchText is not empty
      const textToFind = value.toLocaleLowerCase();
      const filteredData = textToFind
        ? data.filter((user: User) =>
            `
            ${user.name}
            ${user.email}
            ${user.phone}
            ${user.address.city}
            ${user.company.name}`
              .toLocaleLowerCase()
              .includes(textToFind)
          )
        : data;

      setSearchResult(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [value]);

  // We may want to trigger search by button click, by changing the search text, and so on
  // So just increment the .triggerSearch value to run the search at any time we want
  useEffect(() => {
    if (triggerSearch < 1) {
      return; // Skip the first render
    }
    doSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    triggerSearch,
    // Don't add doSearch in dependencies, it will cause unnecessary API calls and re-renders
  ]);

  const onSearchButtonClick = useCallback(() => {
    setTriggerSearch((oldValue) => oldValue + 1);
  }, []);

  const onChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  return (
    <AppView>
      <Stack paddingY={3} spacing={3} width={CONTENT_MAX_WIDTH}>
        <Typography>
          Search with suggestions using pure React and HTML. You can see the{' '}
          <AppLink href="https://github.com/karpolan/test-react-search-box/tree/main/src/views/ReactSolution">
            source code on GitHub
          </AppLink>
          .
        </Typography>
        {/* Search form */}
        <Stack alignItems="center" direction="row" spacing={2}>
          <AutoComplete value={value} suggestions={SUGGESTIONS} onChange={onChange} />
          <button
            disabled={isLoading}
            style={{ padding: '0.6rem 1rem', fontWeight: 'bold', fontSize: '1rem' }}
            onClick={onSearchButtonClick}
          >
            Search
          </button>
        </Stack>

        {/* Result */}
        {isLoading ? (
          <div>Loading...</div>
        ) : searchResult?.length ? (
          <ResultTable data={searchResult} searchText={searchText} />
        ) : (
          searchText && <div>Nothing found for "{searchText}"</div>
        )}
      </Stack>
    </AppView>
  );
};

export default MuiSolutionView;
