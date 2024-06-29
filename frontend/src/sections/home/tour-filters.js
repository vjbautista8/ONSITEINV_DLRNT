import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { m } from 'framer-motion';
// @mui
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Badge, { badgeClasses } from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import { varHover } from 'src/components/animate';
import { getFilePathSrcList } from 'src/helper';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TourSearch from './tour-search';

// ----------------------------------------------------------------------

export default function TourFilters({
  open,
  onOpen,
  onClose,
  //
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
  //
  destinationOptions,
  tourGuideOptions,
  serviceOptions,
  statusOptions,
  vehiclesOptions,
  keysOptions,
  //
  dateError,
  dataFilteredParam,
  onCloseMobile,
}) {
  const [search, setSearch] = useState({
    query: '',
    results: [],
  });
  const lgUp = useResponsive('up', 'lg');
  const handleSearch = useCallback(
    (inputValue) => {
      setSearch((prevState) => ({
        ...prevState,
        query: inputValue,
      }));

      if (inputValue) {
        const results = dataFilteredParam?.allData.filter(
          (tour) => tour.Car_FullName.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
        );

        setSearch((prevState) => ({
          ...prevState,
          results,
        }));
      }
    },
    [dataFilteredParam]
  );
  const handleFilterServices = useCallback(
    (newValue) => {
      const checked = filters.services.includes(newValue)
        ? filters.services.filter((value) => value !== newValue)
        : [...filters.services, newValue];
      onFilters('services', checked);
    },
    [filters.services, onFilters]
  );
  const handleFilterStatus = useCallback(
    (newValue) => {
      console.log('STATUS', [...filters.status, newValue]);
      const checked = filters.status.includes(newValue)
        ? filters.status.filter((value) => value !== newValue)
        : [...filters.status, newValue];
      onFilters('status', checked);
    },
    [filters.status, onFilters]
  );
  const handleFilterKeys = useCallback(
    (newValue) => {
      console.log('KEYS', [...filters.keys, newValue]);
      const checked = filters.keys.includes(newValue)
        ? filters.keys.filter((value) => value !== newValue)
        : [...filters.keys, newValue];
      onFilters('keys', checked);
    },
    [filters.keys, onFilters]
  );

  const handleFilterStartDate = useCallback(
    (newValue) => {
      onFilters('startDate', newValue);
    },
    [onFilters]
  );

  const handleFilterEndDate = useCallback(
    (newValue) => {
      onFilters('endDate', newValue);
    },
    [onFilters]
  );

  const handleFilterDestination = useCallback(
    (newValue) => {
      onFilters('destination', newValue);
    },
    [onFilters]
  );

  const handleFilterTourGuide = useCallback(
    (newValue) => {
      onFilters('tourGuides', newValue);
    },
    [onFilters]
  );

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2, pr: 1, pl: 2.5 }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Filters
      </Typography>

      <Tooltip title="Reset">
        <IconButton onClick={onResetFilters}>
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>

      <IconButton onClick={onClose}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>
    </Stack>
  );

  const renderDateRange = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        Durations
      </Typography>
      <Stack spacing={2.5}>
        <DatePicker label="Start date" value={filters.startDate} onChange={handleFilterStartDate} />

        <DatePicker
          label="End date"
          value={filters.endDate}
          onChange={handleFilterEndDate}
          slotProps={{
            textField: {
              error: dateError,
              helperText: dateError && 'End date must be later than start date',
            },
          }}
        />
      </Stack>
    </Stack>
  );

  const renderDestination = (
    <Stack>
      {/* <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        Dealership
      </Typography> */}

      <Autocomplete
        multiple
        disableCloseOnSelect
        options={destinationOptions.map((option) => option.Dealer_Name)}
        getOptionLabel={(option) => option}
        value={filters.destination}
        onChange={(event, newValue) => handleFilterDestination(newValue)}
        renderInput={(params) => (
          <TextField
            placeholder="Select Dealership"
            {...params}
            label="Dealership"
            variant="outlined"
          />
        )}
        renderOption={(props, option) => {
          const { Dealer_Name, Images1 } = destinationOptions.filter(
            (country) => country.Dealer_Name === option
          )[0];

          if (!Dealer_Name) {
            return null;
          }

          return (
            <li {...props} key={Dealer_Name}>
              {/* <Iconify key={Car_FullName} icon="tabler:brand-toyota" width={28} sx={{ mr: 1 }} /> */}
              <Avatar
                key={Dealer_Name}
                alt={Dealer_Name}
                src={getFilePathSrcList(Images1)[0]?.src}
                variant="rounded"
                sx={{
                  width: 25,
                  height: 25,
                  flexShrink: 0,
                  mr: 1.5,
                  borderRadius: 1,
                }}
              />
              {Dealer_Name}
            </li>
          );
        }}
        renderTags={(selected, getTagProps) =>
          selected.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={option}
              label={option}
              size="small"
              variant="soft"
            />
          ))
        }
      />
    </Stack>
  );

  const renderTourGuide = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        Tour Guide
      </Typography>

      <Autocomplete
        multiple
        disableCloseOnSelect
        options={tourGuideOptions}
        value={filters.tourGuides}
        onChange={(event, newValue) => handleFilterTourGuide(newValue)}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField placeholder="Select Tour Guides" {...params} />}
        renderOption={(props, tourGuide) => (
          <li {...props} key={tourGuide.id}>
            <Avatar
              key={tourGuide.id}
              alt={tourGuide.avatarUrl}
              src={tourGuide.avatarUrl}
              sx={{ width: 24, height: 24, flexShrink: 0, mr: 1 }}
            />

            {tourGuide.name}
          </li>
        )}
        renderTags={(selected, getTagProps) =>
          selected.map((tourGuide, index) => (
            <Chip
              {...getTagProps({ index })}
              key={tourGuide.id}
              size="small"
              variant="soft"
              label={tourGuide.name}
              avatar={<Avatar alt={tourGuide.name} src={tourGuide.avatarUrl} />}
            />
          ))
        }
      />
    </Stack>
  );

  const renderServices = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Vehicle Items
      </Typography>
      {serviceOptions.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={filters.services.includes(option)}
              onClick={() => handleFilterServices(option)}
            />
          }
          label={option}
        />
      ))}
    </Stack>
  );
  const renderStatus = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Type
      </Typography>
      {statusOptions.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={filters.status.includes(option)}
              onClick={() => handleFilterStatus(option)}
            />
          }
          label={option}
        />
      ))}
    </Stack>
  );
  const renderKeys = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Keys
      </Typography>
      {keysOptions.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={filters.keys.includes(option)}
              onClick={() => handleFilterKeys(option)}
            />
          }
          label={option}
        />
      ))}
    </Stack>
  );
  const renderSearch = (
    <TourSearch
      query={search.query}
      results={search.results}
      onSearch={handleSearch}
      // hrefItem={(id) => paths.dashboard.tour.details(id)} TODO
      hrefItem={(ID) => ID}
      onFilters={onFilters}
      filters={filters}
    />
  );
  // const handleOpenFilter = () => {
  //   onOpen();
  //   // onCloseMobile();
  // };
  return (
    <>
      {!lgUp && (
        <>
          <Tooltip title="Filter" arrow>
            <Badge
              color="error"
              variant="dot"
              invisible={!canReset}
              sx={{
                [`& .${badgeClasses.badge}`]: {
                  top: 8,
                  right: 8,
                },
              }}
            >
              <Box
                component={m.div}
                animate={
                  {
                    // rotate: [0, settings.open ? 0 : 360],
                    // rotate: [0, 360],
                  }
                }
                transition={{
                  duration: 12,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              >
                <IconButton
                  component={m.button}
                  whileTap="tap"
                  whileHover="hover"
                  variants={varHover(1.05)}
                  aria-label="settings"
                  // onClick={handleOpenFilterMobile}
                  onClick={onOpen}
                  sx={{
                    width: 40,
                    height: 40,
                  }}
                >
                  <Iconify icon="mi:filter" width={24} />
                </IconButton>
              </Box>
            </Badge>
          </Tooltip>
        </>
      )}
      {lgUp && (
        <>
          <Button
            disableRipple
            color="inherit"
            endIcon={
              <Badge color="error" variant="dot" invisible={!canReset}>
                <Iconify icon="mi:filter" />
              </Badge>
            }
            onClick={onOpen}
          >
            Filters
          </Button>
        </>
      )}

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 350 },
        }}
      >
        {renderHead}

        <Divider />

        <Scrollbar sx={{ px: 2.5, py: 3 }}>
          <Stack spacing={3}>
            {/* {renderDateRange}

            {renderDestination}

            {renderTourGuide} */}
            {renderDestination}
            {renderStatus}
            {renderKeys}
            {renderServices}
            {renderSearch}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}

TourFilters.propTypes = {
  canReset: PropTypes.bool,
  dateError: PropTypes.bool,
  destinationOptions: PropTypes.array,
  filters: PropTypes.object,
  onClose: PropTypes.func,
  onCloseMobile: PropTypes.func,
  onFilters: PropTypes.func,
  onOpen: PropTypes.func,
  onResetFilters: PropTypes.func,
  open: PropTypes.bool,
  serviceOptions: PropTypes.array,
  statusOptions: PropTypes.array,
  tourGuideOptions: PropTypes.array,
  keysOptions: PropTypes.array,
  vehiclesOptions: PropTypes.array,
  dataFilteredParam: PropTypes.object,
};
