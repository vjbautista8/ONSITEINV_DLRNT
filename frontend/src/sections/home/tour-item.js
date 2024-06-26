import PropTypes from 'prop-types';
import { forwardRef, useCallback, useEffect, useState } from 'react';
// @mui
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import ListItemButton from '@mui/material/ListItemButton';
import Tooltip from '@mui/material/Tooltip';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// utils
import { fDateTime, fDateTimeSecs } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
// components
import { useBoolean } from 'src/hooks/use-boolean';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { shortDateLabel } from 'src/components/custom-date-range-picker';
import Carousel, { CarouselArrowIndex, CarouselArrows, useCarousel } from 'src/components/carousel';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import { getDistinctValuesByKey, getFilePathSrcList, getSortedValuesByKey } from 'src/helper';
import { useSettingsContext } from 'src/components/settings';
import SwipeRightCar from './SwipeRightCar';

// ----------------------------------------------------------------------
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
export default function TourItem({ tour, onView, onEdit, onDelete }) {
  const popover = usePopover();

  const {
    id,
    name,
    price,
    Images1,
    bookers,
    createdAt,
    available,
    priceSale,
    destination,
    ratingNumber,
    VIN,
    Year_field,
    Make,
    Model,
    Type,
    Added_Time,
    Modified_Time,
    Image_Count,
    Days_In_Stock,
    Stock,
    Keys,
    Vehicle_Items,
  } = tour;

  // const shortLabel = shortDateLabel(available.startDate, available.endDate);
  // const slides = gallery.map((slide) => ({
  //   src: slide.imageUrl,
  // }));
  const dialog = useBoolean();
  const slides = getFilePathSrcList(Images1);
  const lightbox = useLightBox(slides);

  const renderRating = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        top: 12,
        right: 12,
        zIndex: 9,
        borderRadius: 1,
        position: 'absolute',
        p: '2px 6px 2px 4px',
        typography: 'subtitle2',
        ...(Keys !== '' && {
          bgcolor: 'warning.dark',
        }),
        // bgcolor:{Keys !== '' ? 'warning.dark':''},
      }}
    >
      {Keys !== '' && (
        <>
          {' '}
          <Iconify icon="mdi:table-key" sx={{ color: 'warning.lighter', mr: 0.25 }} />{' '}
          {`${Keys} Keys`}
        </>
      )}
    </Stack>
  );

  const renderType = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        top: 12,
        left: 12,
        zIndex: 9,
        borderRadius: 1,
        bgcolor: 'grey.800',
        position: 'absolute',
        p: '2px 6px 2px 4px',
        color: 'common.white',
        typography: 'subtitle2',
      }}
    >
      {/* {!!priceSale && (
        <Box component="span" sx={{ color: 'grey.500', mr: 0.25, textDecoration: 'line-through' }}>
          {fCurrency(priceSale)}
        </Box>
      )}
      {fCurrency(price)} */}
      <Iconify icon="solar:tag-price-bold" sx={{ color: 'primary.main', mr: 0.25 }} />
      {Type}
    </Stack>
  );
  const renderVehicle = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        bottom: 165,
        left: 12,
        zIndex: 9,
        borderRadius: 1,
        bgcolor: 'grey.800',
        position: 'absolute',
        p: '2px 6px 2px 4px',
        color: 'common.white',
        typography: 'subtitle2',
        maxWidth: 285,
      }}
    >
      {/* {!!priceSale && (
        <Box component="span" sx={{ color: 'grey.500', mr: 0.25, textDecoration: 'line-through' }}>
          {fCurrency(priceSale)}
        </Box>
      )}
      {fCurrency(price)} */}
      <Iconify icon="mdi:folder-information-outline" sx={{ color: 'primary.dark', mr: 0.25 }} />
      {getSortedValuesByKey(Vehicle_Items, 'display_value')}
    </Stack>
  );

  const renderImages = (
    <Stack
      spacing={0.5}
      direction="row"
      sx={{
        p: (theme) => theme.spacing(1, 1, 0, 1),
      }}
    >
      {renderType}
      {getSortedValuesByKey(Vehicle_Items, 'display_value') !== '' && renderVehicle}
      {renderRating}
      {/* {renderType} */}
      {/* {renderType}
      {renderRating} */}

      <Stack flexGrow={1} sx={{ position: 'relative', cursor: 'pointer', color: 'common.white' }}>
        <Image
          alt={slides[0]?.src}
          src={slides[0]?.src}
          onClick={() => lightbox.onOpen(slides[0]?.src)}
          sx={{ borderRadius: 1, height: 100, width: 1 }}
        />
        {/* <Image
          alt={slides[1]?.src}
          src={slides[1]?.src}
          onClick={() => lightbox.onOpen(slides[1]?.src)}
          sx={{ borderRadius: 1, height: 164, width: 1 }}
        /> */}
      </Stack>
      <Stack spacing={0.5}>
        <Image
          alt={slides[1]?.src}
          src={slides[1]?.src}
          onClick={() => lightbox.onOpen(slides[1]?.src)}
          ratio="1/1"
          sx={{ borderRadius: 1, width: 80, cursor: 'pointer', color: 'common.white', height: 100 }}
        />
        {/* <Image
          alt={slides[2]?.src}
          src={slides[2]?.src}
          onClick={() => lightbox.onOpen(slides[2]?.src)}
          ratio="1/1"
          sx={{ borderRadius: 1, width: 80, cursor: 'pointer', color: 'common.white' }}
        /> */}
      </Stack>
    </Stack>
  );

  const renderTexts = (
    <ListItemText
      sx={{
        p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
        cursor: 'pointer',
      }}
      primary={`Last Update: ${fDateTimeSecs(Modified_Time)}`}
      secondary={
        <Link onClick={dialog.onTrue} color="inherit">
          {/* {name} */}
          <Tooltip title="Stock # | Year | Make | Model" arrow>
            {Stock} | {Year_field} | {Make} | {Model}
          </Tooltip>
        </Link>
      }
      primaryTypographyProps={{
        typography: 'caption',
        color: 'text.disabled',
      }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: 'span',
        color: 'text.primary',
        typography: 'subtitle1',
      }}
    />
  );

  const renderInfo = (
    <>
      <Stack
        spacing={1.5}
        sx={{
          position: 'relative',
          p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
        }}
      >
        <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', bottom: 20, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <Stack
          key={Image_Count}
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2' }}
        >
          <Iconify icon="mdi:camera-iris" sx={{ color: 'error.main' }} />
          {Image_Count}
        </Stack>
        <Stack
          key={Days_In_Stock}
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2' }}
        >
          <Iconify icon="mdi:calendar-clock" sx={{ color: 'info.main' }} />
          {Days_In_Stock}
        </Stack>
        {/* {[
          {
            label: Image_Count,
            icon: <Iconify icon="mdi:camera-iris" sx={{ color: 'error.main' }} />,
          },
          {
            label: Days_In_Stock,
            icon: <Iconify icon="mdi:calendar-clock" sx={{ color: 'info.main' }} />,
          },
        ].map((item) => (
          <Stack
            key={item.label}
            spacing={1}
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2' }}
          >
            {item.icon}
            {item.label}
          </Stack>
        ))} */}
      </Stack>
    </>
  );
  const renderInfo1 = (
    <>
      <Stack
        spacing={1.5}
        sx={{
          position: 'relative',
          p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
        }}
      >
        {/* <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', bottom: 20, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton> */}
        {[
          {
            label: 'Add to Keys Needed ?',
            icon: (
              <Iconify icon="solar:checklist-minimalistic-broken" sx={{ color: 'error.main' }} />
            ),
          },
        ].map((item) => (
          <Stack
            key={item.label}
            spacing={1}
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2' }}
          >
            {item.icon}
            {item.label}
          </Stack>
        ))}

        <Grid
          item
          xs={12}
          md={8}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {/* <Button
            variant="contained"
            startIcon={<Iconify icon="solar:clipboard-remove-bold" sx={{ color: 'error.main' }} />}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<Iconify icon="solar:verified-check-bold" sx={{ color: 'success.main' }} />}
          >
            Yes
          </Button> */}
        </Grid>
      </Stack>
    </>
  );
  const renderInfo2 = (
    <>
      <Stack
        spacing={1.5}
        sx={{
          position: 'relative',
          p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
        }}
      >
        {/* <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', bottom: 20, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton> */}
        {[
          {
            label: 'Add Reason(s) ?',
            icon: (
              <Iconify icon="solar:checklist-minimalistic-broken" sx={{ color: 'error.main' }} />
            ),
          },
        ].map((item) => (
          <Stack
            key={item.label}
            spacing={1}
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2' }}
          >
            {item.icon}
            {item.label}
          </Stack>
        ))}

        <Grid
          xs={12}
          md={8}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {/* <Button
            variant="contained"
            startIcon={<Iconify icon="solar:clipboard-remove-bold" sx={{ color: 'error.main' }} />}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<Iconify icon="solar:verified-check-bold" sx={{ color: 'success.main' }} />}
          >
            Yes
          </Button> */}
        </Grid>
      </Stack>
    </>
  );

  const carousel = useCarousel({
    autoplay: false,
    initialSlide: 1,
    infinite: true,
    car_info: tour,
    originalIndex: 1,
  });
  // const {
  //   dialogSwipe, // Get the dialog component
  // } = useCarousel(props);
  const data = [
    { title: 'test', coverUrl: '', id: 1 },
    { title: 'test', coverUrl: '', id: 2 },
    { title: 'test', coverUrl: '', id: 3 },
  ];
  const TOUR_DETAILS_TABS = [
    { value: 'content', label: 'Vehicle Information' },
    { value: 'bookers', label: 'Gallery' },
  ];
  const [currentTab, setCurrentTab] = useState('content');
  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);
  const settings = useSettingsContext();
  const renderTabs = (
    <Tabs
      value={currentTab}
      onChange={handleChangeTab}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      {TOUR_DETAILS_TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={tab.value === 'bookers' ? <Label variant="filled">{slides.length}</Label> : ''}
        />
      ))}
    </Tabs>
  );
  return (
    <>
      <Dialog
        fullScreen
        open={dialog.value}
        onClose={dialog.onFalse}
        TransitionComponent={Transition}
      >
        <AppBar position="relative" color="default">
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={dialog.onFalse}>
              <Iconify icon="mingcute:close-line" />
            </IconButton>

            <Typography variant="h6" sx={{ flex: 1, ml: 2 }}>
              {Stock} | {Year_field} | {Make} | {Model}
            </Typography>

            {/* <Button autoFocus color="inherit" variant="contained" onClick={dialog.onFalse}>
              Edit
            </Button> */}
          </Toolbar>
        </AppBar>
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
          {renderTabs}
          {currentTab === 'bookers' && (
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
                {slides.map((booker, index) => (
                  <Image
                    alt={slides[index]?.src}
                    src={slides[index]?.src}
                    onClick={() => lightbox.onOpen(slides[index]?.src)}
                    sx={{ borderRadius: 1 }}
                  />
                ))}
              </Box>
            </>
          )}
        </Container>
      </Dialog>
      <Card>
        {renderImages}
        {renderTexts}

        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {renderInfo2}
          {renderInfo}
          {renderInfo1}
        </Carousel>
        {carousel.dialogSwipe}
      </Card>
      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            onView();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onEdit();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onDelete();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}

TourItem.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  tour: PropTypes.object,
};
