import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { AppAlert, AppButton, AppLink, AppView } from '../../components';
import { KeyboardEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import SearchResultTable from './components/SearchResultTable';
import { CONTENT_MAX_WIDTH } from '../../components/config';
import { sleep, SUGGESTIONS, User } from '../../utils';

type SearchResult = User[];

/**
 * Renders "Mui Solution" view
 * url: /mui
 * @page MuiSolution
 */
const MuiSolutionView = () => {
  const [alertVisible, setAlertVisible] = useState(false);
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
      setAlertVisible(true); // Allow showing the alert if no results found
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
    // Trigger search by button click
    setTriggerSearch((oldValue) => oldValue + 1);
  }, []);

  const onInputChange = useCallback((_: SyntheticEvent, value: string) => {
    setValue(value);
  }, []);

  const onChange = useCallback(
    (
      event: SyntheticEvent,
      value: string | null,
      reason: AutocompleteChangeReason,
      details?: AutocompleteChangeDetails<string>
    ) => {
      if (reason === 'selectOption') {
        // Trigger search on selecting an option from the suggestions list
        setTriggerSearch((oldValue) => oldValue + 1);
      }
    },
    []
  );

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Trigger search on pressing Enter key
      setTriggerSearch((oldValue) => oldValue + 1);
    }
  }, []);

  return (
    <AppView>
      <Stack paddingY={3} spacing={3} width={CONTENT_MAX_WIDTH}>
        <Typography>
          Search with suggestions using{' '}
          <AppLink href="https://mui.com/material-ui/react-autocomplete/">MUI Autocomplete</AppLink> component. You can
          see the{' '}
          <AppLink href="https://github.com/karpolan/test-react-search-box/tree/main/src/views/MuiSolution">
            source code on GitHub
          </AppLink>
          .
        </Typography>

        {/* Search form */}
        <Stack alignItems="center" direction="row" spacing={2}>
          <Autocomplete
            freeSolo
            fullWidth
            options={SUGGESTIONS}
            renderInput={(params) => <TextField {...params} label="Search" onKeyDown={onKeyDown} />}
            value={value}
            onChange={onChange}
            onInputChange={onInputChange}
          />
          <AppButton disabled={isLoading} onClick={onSearchButtonClick}>
            Search
          </AppButton>
        </Stack>

        {/* Result */}
        {isLoading ? (
          <LinearProgress />
        ) : searchResult?.length ? (
          <SearchResultTable data={searchResult} searchText={searchText} />
        ) : (
          alertVisible && (
            <AppAlert severity="warning" onClose={() => setAlertVisible(false)}>
              Nothing found for "{searchText}"
            </AppAlert>
          )
        )}
      </Stack>
    </AppView>
  );
};

export default MuiSolutionView;
