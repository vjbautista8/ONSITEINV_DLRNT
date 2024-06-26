import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// @mui
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
// routes
import { useRouter } from 'src/routes/hooks';
// components
import Iconify from 'src/components/iconify';
import SearchNotFound from 'src/components/search-not-found';
import { getFilePathSrcList } from 'src/helper';

// ----------------------------------------------------------------------

export default function TourSearch({ query, results, onSearch, hrefItem, onFilters, filters }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  // const handleClick = (ID) => {
  //   // router.push(hrefItem(id)); TODO
  //   console.log('handleClick', ID);
  // };
  const handleClick = useCallback(
    (newValue) => {
      console.log('ID', newValue);
      const checked = filters.ID.includes(newValue)
        ? filters.ID.filter((value) => value !== newValue)
        : [...filters.ID, newValue];
      onFilters('ID', checked);
      setOpen(false);
    },
    [filters.ID, onFilters]
  );
  const handleKeyUp = (event) => {
    if (query) {
      if (event.key === 'Enter') {
        const selectProduct = results.filter((tour) => tour.Car_FullName === query)[0];

        handleClick(selectProduct.ID);
      }
    }
  };

  return (
    <Autocomplete
      sx={{ width: { xs: 1 } }}
      autoHighlight
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      popupIcon={null}
      options={results}
      onInputChange={(event, newValue) => onSearch(newValue)}
      getOptionLabel={(option) => option.Car_FullName}
      noOptionsText={<SearchNotFound query={query} sx={{ bgcolor: 'unset' }} />}
      isOptionEqualToValue={(option, value) => option.ID === value.ID}
      slotProps={{
        popper: {
          placement: 'bottom-start',
          sx: {
            minWidth: 350,
          },
        },
        paper: {
          sx: {
            [` .${autocompleteClasses.option}`]: {
              pl: 0.75,
            },
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          // value={query}
          placeholder="Type the VIN, Stock #, Year, Make, or Model "
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, tour, { inputValue }) => {
        const matches = match(tour.Car_FullName, inputValue);
        const parts = parse(tour.Car_FullName, matches);

        return (
          <Box
            component="li"
            {...props}
            onClick={() => handleClick(tour.Car_FullName)}
            key={tour.ID}
          >
            <Avatar
              key={tour.ID}
              alt={tour.Car_FullName}
              src={getFilePathSrcList(tour?.Images1)[0]?.src}
              variant="rounded"
              sx={{
                width: 48,
                height: 48,
                flexShrink: 0,
                mr: 1.5,
                borderRadius: 1,
              }}
            />

            <div key={inputValue}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                  sx={{
                    typography: 'body2',
                    fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
                  }}
                >
                  {part.text}
                </Typography>
              ))}
            </div>
          </Box>
        );
      }}
    />
  );
}

TourSearch.propTypes = {
  hrefItem: PropTypes.func,
  onSearch: PropTypes.func,
  query: PropTypes.string,
  results: PropTypes.array,
  filters: PropTypes.object,
  onFilters: PropTypes.func,
};
