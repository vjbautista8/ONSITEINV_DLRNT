import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { handleChangeState } from 'src/features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// routes
import { paths } from 'src/routes/paths';
// components
import { useRouter } from 'src/routes/hooks';
//
import { useBoolean } from 'src/hooks/use-boolean';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { LoadingScreen } from 'src/components/loading-screen';
import { toWholeNumber } from 'src/helper';
import TourItem from './tour-item';

// ----------------------------------------------------------------------

export default function TourList({ tours, resultData }) {
  const dialog = useBoolean();
  const { onSiteInventoryList, list_page, finishedGettingInventoryItems } = useSelector(
    (store) => store.user
  );
  const theme = useTheme();
  const [page, setPage] = useState(1);

  const handleChange = (event, value_data) => {
    console.log('handleChange page', value_data);
    dispatch(handleChangeState({ name: 'list_page', value: value_data }));
    setPage(value_data);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleView = useCallback(
    (id) => {
      router.push(paths.dashboard.tour.details(id));
    },
    [router]
  );

  const handleEdit = useCallback(
    (id) => {
      router.push(paths.dashboard.tour.edit(id));
    },
    [router]
  );

  const handleDelete = useCallback((id) => {
    console.info('DELETE', id);
  }, []);

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
          xl: 'repeat(5, 1fr)',
        }}
      >
        {tours.map((tour) => (
          <>
            <TourItem
              key={tour.ID}
              tour={tour}
              onView={() => handleView(tour.ID)}
              onEdit={() => handleEdit(tour.ID)}
              onDelete={() => handleDelete(tour.ID)}
            />
          </>
        ))}
      </Box>

      {/* <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#161C24',
        }}
      > */}
      <Pagination
        count={toWholeNumber(resultData.length / 20)}
        page={page}
        onChange={handleChange}
        sx={{
          pt: 1,
          pb: 1,
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '100%',
          borderTop: `dashed 1px ${theme.palette.divider}`,
          backgroundColor: 'background.default',
          bgcolor: 'background.default',
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
      {/* </div> */}
    </>
  );
}

TourList.propTypes = {
  tours: PropTypes.array,
  resultData: PropTypes.array,
};
