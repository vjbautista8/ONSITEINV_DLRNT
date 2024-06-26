import orderBy from 'lodash/orderBy';
import { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// utils
import { fTimestamp } from 'src/utils/format-time';
// _mock
import { _tours, _tourGuides, TOUR_SERVICE_OPTIONS, TOUR_SORT_OPTIONS } from 'src/_mock';
// assets
import { countries } from 'src/assets/data';
// components
import Switch from '@mui/material/Switch';
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { LoadingScreen } from 'src/components/loading-screen';
import { getDistinctValuesByKey, getObjectByLabel, paginate, sortByKey } from 'src/helper';
import TourList from './tour-list';
import TourSort from './tour-sort';
import TourSearch from './tour-search';
import TourFilters from './tour-filters';
import TourFiltersResult from './tour-filters-result';

// ----------------------------------------------------------------------

const defaultFilters = {
  destination: [],
  status: [],
  tourGuides: [],
  services: [],
  keys: [],
  vehicles: [],
  comment: null,
  startDate: null,
  endDate: null,
  ID: [],
};

// ----------------------------------------------------------------------
const sortingByNames = [
  'Modified Time',
  'Added Time',
  'Stock Number',
  'Photo Count',
  'Days Old',
  'Model',
];
const INVENTORY_SORT_ORDER_OPTIONS = [
  { value: 'asc', label: 'Asc' },
  { value: 'desc', label: 'Desc' },
];
const INVENTORY_SORT_OPTIONS = [
  { value: 'Modified_Time', label: 'Modified Time' },
  { value: 'Added_Time', label: 'Added Time' },
  { value: 'Stock', label: 'Stock Number' },
  { value: 'Image_Count', label: 'Photo Count' },
  { value: 'Days_In_Stock', label: 'Days Old' },
  { value: 'Model', label: 'Model' },
];
export default function TourListView() {
  const theme = useTheme();
  useScrollToTop();
  const { onSiteInventoryList, list_page, finishedGettingInventoryItems, vehicleReports } =
    useSelector((store) => store.user);
  const settings = useSettingsContext();
  const [inventoryItems, setInventoryItems] = useState(onSiteInventoryList);
  const [allInventory, setAllInventory] = useState(onSiteInventoryList);
  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState(INVENTORY_SORT_OPTIONS[0].value);
  const [sortOrder, setSortOrder] = useState(INVENTORY_SORT_ORDER_OPTIONS[1].value);
  const [doneFetchingData, setDoneFetchingData] = useState(finishedGettingInventoryItems);
  const [search, setSearch] = useState({
    query: '',
    results: [],
  });

  const [filters, setFilters] = useState(defaultFilters);

  const dateError =
    filters.Added_Time && filters.Modified_Time
      ? filters.Added_Time.getTime() > filters.Modified_Time.getTime()
      : false;

  const dataFiltered = applyFilter({
    inputData: inventoryItems,
    filters,
    sortBy,
    dateError,
    sortOrder,
    allItems: allInventory,
    doneFetching: finishedGettingInventoryItems,
    list_page_param: list_page,
  });

  useEffect(() => {
    const paginate_list = paginate(onSiteInventoryList, list_page);

    setInventoryItems(paginate_list?.paginateData);
    setAllInventory(paginate_list?.allData);
  }, [onSiteInventoryList, list_page]);
  useEffect(() => {
    setDoneFetchingData(finishedGettingInventoryItems);
  }, [finishedGettingInventoryItems]);
  const canReset =
    !!filters.destination.length ||
    !!filters.keys.length ||
    !!filters.vehicles.length ||
    !!filters.services.length ||
    !!filters.status.length ||
    !!filters.ID.length;

  const notFound = !dataFiltered?.paginateData.length && canReset;

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleSortOrder = useCallback((newValue) => {
    setSortOrder(newValue);
  }, []);

  const handleSearch = useCallback(
    (inputValue) => {
      setSearch((prevState) => ({
        ...prevState,
        query: inputValue,
      }));

      if (inputValue) {
        const results = dataFiltered?.allData.filter(
          (tour) => tour.Car_FullName.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
        );

        setSearch((prevState) => ({
          ...prevState,
          results,
        }));
      }
    },
    [dataFiltered]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const renderFilters = (
    // <Stack
    //   spacing={3}
    //   justifyContent="space-between"
    //   alignItems={{ xs: 'flex-end', sm: 'center' }}
    //   direction={{
    //     xs: 'column',
    //     sm: 'column',
    //     md: 'row',
    //     lg: 'row',
    //     xl: 'row',
    //   }}
    // >
    //   <TourSearch
    //     query={search.query}
    //     results={search.results}
    //     onSearch={handleSearch}
    //     onFilters={handleFilters}
    //     filters={filters}
    //     // hrefItem={(id) => paths.dashboard.tour.details(id)} TODO
    //     hrefItem={(ID) => ID}
    //   />

    //   <Stack
    //     direction={{
    //       xs: 'column',
    //       sm: 'column',
    //       md: 'row',
    //       lg: 'row',
    //       xl: 'row',
    //     }}
    //     display={{
    //       xs: 'inline-table',
    //       sm: 'inline-table',
    //       md: 'flex',
    //       lg: 'flex',
    //       xl: 'flex',
    //     }}
    //     spacing={1}
    //     flexShrink={0}
    //   >
    //     <TourSort
    //       sort={sortBy}
    //       onSort={handleSortBy}
    //       sortOptions={INVENTORY_SORT_OPTIONS}
    //       fieldName="Sort By"
    //     />
    //     <TourSort
    //       sort={sortOrder}
    //       onSort={handleSortOrder}
    //       sortOptions={INVENTORY_SORT_ORDER_OPTIONS}
    //       fieldName="Sort Order"
    //     />
    //     <TourFilters
    //       open={openFilters.value}
    //       onOpen={openFilters.onTrue}
    //       onClose={openFilters.onFalse}
    //       filters={filters}
    //       onFilters={handleFilters}
    //       canReset={canReset}
    //       onResetFilters={handleResetFilters}
    //       serviceOptions={getDistinctValuesByKey(vehicleReports, 'Vehicle_Item')}
    //       keysOptions={['N/A', 'Need', 'Received', 'Returned']}
    //       vehiclesOptions={getDistinctValuesByKey(vehicleReports, 'Vehicle_Item')}
    //       statusOptions={getDistinctValuesByKey(onSiteInventoryList, 'Type')}
    //       tourGuideOptions={_tourGuides}
    //       destinationOptions={dataFiltered?.allData}
    //       dateError={dateError}
    //       dataFilteredParam={dataFiltered}
    //     />
    //   </Stack>
    // </Stack>
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100, // Adjust based on your zIndex configuration
        // bgcolor: 'background.default',
        backgroundColor: 'background.default', // Ensure the background matches your theme
        // boxShadow: 1, // Add shadow for visual separation
        padding: 2, // Add padding for spacing
        borderBottom: `dashed 1px ${theme.palette.divider}`,
      }}
    >
      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{
          xs: 'column',
          sm: 'column',
          md: 'row',
          lg: 'row',
          xl: 'row',
        }}
      >
        <TourSearch
          query={search.query}
          results={search.results}
          onSearch={handleSearch}
          onFilters={handleFilters}
          filters={filters}
          // hrefItem={(id) => paths.dashboard.tour.details(id)} TODO
          hrefItem={(ID) => ID}
        />

        <Stack
          direction={{
            xs: 'column',
            sm: 'column',
            md: 'row',
            lg: 'row',
            xl: 'row',
          }}
          display={{
            xs: 'inline-table',
            sm: 'inline-table',
            md: 'flex',
            lg: 'flex',
            xl: 'flex',
          }}
          spacing={1}
          flexShrink={0}
        >
          <TourSort
            sort={sortBy}
            onSort={handleSortBy}
            sortOptions={INVENTORY_SORT_OPTIONS}
            fieldName="Sort By"
          />
          <TourSort
            sort={sortOrder}
            onSort={handleSortOrder}
            sortOptions={INVENTORY_SORT_ORDER_OPTIONS}
            fieldName="Sort Order"
          />
          <TourFilters
            open={openFilters.value}
            onOpen={openFilters.onTrue}
            onClose={openFilters.onFalse}
            filters={filters}
            onFilters={handleFilters}
            canReset={canReset}
            onResetFilters={handleResetFilters}
            serviceOptions={getDistinctValuesByKey(vehicleReports, 'Vehicle_Item')}
            keysOptions={['N/A', 'Need', 'Received', 'Returned']}
            vehiclesOptions={getDistinctValuesByKey(vehicleReports, 'Vehicle_Item')}
            statusOptions={getDistinctValuesByKey(onSiteInventoryList, 'Type')}
            tourGuideOptions={_tourGuides}
            destinationOptions={dataFiltered?.allData}
            dateError={dateError}
            dataFilteredParam={dataFiltered}
          />
          {settings.themeMode === 'light' && (
            <>
              <Tooltip title="Dark Mode" arrow>
                <Switch onChange={(newValue) => settings.onUpdate('themeMode', 'dark')} />
              </Tooltip>
            </>
          )}
          {settings.themeMode === 'dark' && (
            <>
              <Tooltip title="Light Mode" arrow>
                <Switch checked onChange={(newValue) => settings.onUpdate('themeMode', 'light')} />
              </Tooltip>
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );

  const renderResults = (
    <TourFiltersResult
      filters={filters}
      onResetFilters={handleResetFilters}
      //
      canReset={canReset}
      onFilters={handleFilters}
      //
      results={dataFiltered?.allData.length}
    />
    // <Box
    //   sx={{
    //     marginTop: { xs: 12, sm: 14, md: 16 }, // Adjust these values to ensure proper spacing
    //   }}
    // >
    //   <TourFiltersResult
    //     filters={filters}
    //     onResetFilters={handleResetFilters}
    //     //
    //     canReset={canReset}
    //     onFilters={handleFilters}
    //     //
    //     results={dataFiltered?.allData.length}
    //   />
    // </Box>
  );

  if (!doneFetchingData) {
    return <LoadingScreen />;
  }
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {/* <CustomBreadcrumbs
        heading="On Site Inventory"
        links={[
          {
            name: '',
          },
        ]}
        action={
          <>
            {settings.themeMode === 'light' && (
              <>
                <Tooltip title="Dark Mode" arrow>
                  <Switch onChange={(newValue) => settings.onUpdate('themeMode', 'dark')} />
                </Tooltip>
              </>
            )}
            {settings.themeMode === 'dark' && (
              <>
                <Tooltip title="Light Mode" arrow>
                  <Switch
                    checked
                    onChange={(newValue) => settings.onUpdate('themeMode', 'light')}
                  />
                </Tooltip>
              </>
            )}
          </>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      /> */}
      {renderFilters}
      <Stack
        spacing={2.5}
        sx={{
          mt: { xs: 21, sm: 18, md: 8 },
          mb: { xs: 2, sm: 2, md: 2 },
        }}
      >
        {canReset && renderResults}
      </Stack>
      {/* {renderFilters}
      {canReset && renderResults} */}
      {notFound && <EmptyContent title="No Data" filled sx={{ py: 10 }} />}

      <TourList tours={dataFiltered?.paginateData} resultData={dataFiltered?.allData} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({
  inputData,
  filters,
  sortBy,
  dateError,
  sortOrder,
  allItems,
  doneFetching,
  list_page_param,
}) => {
  const { services, destination, startDate, endDate, tourGuides, status, keys, vehicles, ID } =
    filters;
  console.log('filters', filters);
  console.log('doneFetching', doneFetching);
  // const paginate_list = paginate(allItems, list_page_param);
  console.log('inputData', inputData);
  console.log('list_page_param', list_page_param);
  console.log('allItems', allItems);
  console.log(sortBy, sortOrder);
  const sortedItems = sortByKey(allItems, sortBy, sortOrder);
  console.log('sortedItems', sortedItems);

  const newInputData = paginate(sortedItems, list_page_param);
  console.log('newInputData', newInputData);
  // inputData = newInputData?.paginateData;
  inputData = newInputData;

  if (status.length) {
    const statusFiltered = inputData?.allData.filter((tour) => status.includes(tour.Type));
    console.log('statusFiltered', statusFiltered);
    const newStatusFilteredInputData = paginate(statusFiltered, list_page_param);
    console.log('newStatusFilteredInputData', newStatusFilteredInputData);
    inputData = newStatusFilteredInputData;
  }

  if (keys.length) {
    const keysFiltered = inputData?.allData.filter((tour) => keys.includes(tour.Keys));
    console.log('keysFiltered', keysFiltered);
    const newKeysFilteredInputData = paginate(keysFiltered, list_page_param);
    console.log('newKeysFilteredInputData', newKeysFilteredInputData);
    inputData = newKeysFilteredInputData;
  }
  if (services.length) {
    const servicesFiltered = inputData?.allData.filter(
      (tour) =>
        Array.isArray(tour.Vehicle_Items) &&
        tour.Vehicle_Items.some((item) => services.includes(item.display_value))
    );
    console.log('servicesFiltered', servicesFiltered);
    const newServicesFilteredInputData = paginate(servicesFiltered, list_page_param);
    console.log('newServicesFilteredInputData', newServicesFilteredInputData);
    inputData = newServicesFilteredInputData;
  }
  if (ID.length) {
    const IDsFiltered = inputData?.allData.filter((tour) => ID.includes(tour.Car_FullName));
    console.log('IDsFiltered', IDsFiltered);
    const newIDsFilteredInputData = paginate(IDsFiltered, list_page_param);
    console.log('newIDsFilteredInputData', newIDsFilteredInputData);
    inputData = newIDsFilteredInputData;
  }

  console.log('FINAL_INPUT', inputData);
  return inputData;
};
