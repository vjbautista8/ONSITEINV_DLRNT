import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { fCurrency } from 'src/utils/format-number';
import { useTheme } from '@mui/material/styles';
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
import EmptyContent from 'src/components/empty-content/empty-content';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import AnalyticsOrderTimeline from './history-time-line';

const ViewVehicleInfo = ({
  dialogvalue,
  dialogonFalse,
  Transition,
  tour,
  renderTabs,
  currentTab,
  slides,
  settings,
  historyTimeline,
}) => {
  const lightbox = useLightBox(slides);
  //   useEffect(() => {
  //     const handleScroll = () => {
  //       console.log('User is scrolling');
  //     };

  //     window.addEventListener('scroll', handleScroll);

  //     return () => {
  //       window.removeEventListener('scroll', handleScroll);
  //     };
  //   }, []);
  const renderTabBgColor = () => {
    if (settings.themeMode === 'dark') {
      return 'rgb(33, 43, 54)';
    }
    return 'rgb(255, 255, 255)';
  };
  return (
    <Dialog fullScreen open={dialogvalue} onClose={dialogonFalse} TransitionComponent={Transition}>
      <AppBar
        position="fixed"
        color="default"
        // className={`sticky-appbar-${tour?.ID}`}
        sx={{ position: 'sticky', top: 0, pr: '0 !important', bgcolor: renderTabBgColor() }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={dialogonFalse}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>

          <Typography variant="h6" sx={{ flex: 1, ml: 2 }}>
            {tour?.Stock} | {tour?.Year_field} | {tour?.Make} | {tour?.Model}
          </Typography>

          {/* <Button color="inherit" variant="contained" onClick={handlingEditRecord}>
              Edit
            </Button> */}
        </Toolbar>
        {renderTabs}
      </AppBar>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        {currentTab === 'bookers' && (
          <>
            {slides.length > 0 && (
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
            {slides.length === 0 && (
              <>
                <EmptyContent title="No Photo" filled sx={{ py: 10 }} />
              </>
            )}
          </>
        )}
        {currentTab === 'content' && (
          <>
            <Stack sx={{ mx: 'auto', m: 0, p: 3 }}>
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
                sx={{
                  mb: 2,
                  pb: 2,
                  borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
                }}
              >
                {[
                  {
                    label: 'Type',
                    value: tour?.Type,
                    icon: <Iconify icon="material-symbols-light:car-crash-rounded" />,
                  },
                  {
                    label: 'VIN',
                    value: tour?.VIN,
                    icon: <Iconify icon="material-symbols-light:car-crash-rounded" />,
                  },
                  {
                    label: 'Stock',
                    value: tour?.Stock,
                    icon: <Iconify icon="material-symbols-light:car-crash-rounded" />,
                  },
                  {
                    label: 'Year',
                    value: tour?.Year_field,
                    icon: <Iconify icon="material-symbols-light:car-crash-rounded" />,
                  },
                  {
                    label: 'Make',
                    value: tour?.Make,
                    icon: <Iconify icon="material-symbols-light:car-crash-rounded" />,
                  },
                  {
                    label: 'Model',
                    value: tour?.Model,
                    icon: <Iconify icon="material-symbols-light:car-crash-rounded" />,
                  },
                  {
                    label: 'Trim',
                    value: tour?.Trim,
                    icon: <Iconify icon="material-symbols-light:car-crash-rounded" />,
                  },
                  {
                    label: 'Exterior Color',
                    value: tour?.ExteriorColor,
                    icon: <Iconify icon="material-symbols-light:car-crash-rounded" />,
                  },
                  {
                    label: 'Interior Color',
                    value: tour?.InteriorColor,
                    icon: <Iconify icon="material-symbols-light:car-crash-rounded" />,
                  },
                  {
                    label: 'Miles',
                    value: tour?.Miles,
                    icon: <Iconify icon="material-symbols-light:car-crash-rounded" />,
                  },
                  {
                    label: 'Selling Price',
                    value: fCurrency(tour?.SellingPrice),
                    icon: <Iconify icon="material-symbols-light:car-crash-rounded" />,
                  },
                  {
                    label: 'MSRP',
                    value: fCurrency(tour?.MSRP),
                    icon: <Iconify icon="material-symbols-light:car-crash-rounded" />,
                  },
                  {
                    label: 'Certified',
                    value: tour?.Certified,
                    icon: <Iconify icon="material-symbols-light:car-crash-rounded" />,
                  },
                  {
                    label: 'Image Count',
                    value: tour?.Image_Count,
                    icon: <Iconify icon="material-symbols-light:car-crash-rounded" />,
                  },
                  {
                    label: 'Days In Stock',
                    value: tour?.Days_In_Stock,
                    icon: <Iconify icon="material-symbols-light:car-crash-rounded" />,
                  },
                ].map((item) => (
                  <Stack key={item.label} spacing={1.5} direction="row">
                    {item.icon}
                    <ListItemText
                      primary={item.label}
                      secondary={item.value}
                      primaryTypographyProps={{
                        typography: 'body2',
                        color: 'text.secondary',
                        mb: 0.5,
                      }}
                      secondaryTypographyProps={{
                        typography: 'subtitle2',
                        color: 'text.primary',
                        component: 'span',
                      }}
                    />
                  </Stack>
                ))}
              </Box>
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
                {[
                  {
                    label: 'Dealer',
                    value: tour?.Dealer?.display_value,
                    icon: <Iconify icon="solar:user-rounded-bold" />,
                  },
                  {
                    label: 'Dealer Phone',
                    value: tour?.Dealer_Phone,
                    icon: <Iconify icon="solar:user-rounded-bold" />,
                  },
                  {
                    label: 'Dealer Address',
                    value: tour?.Dealer_Address1,
                    icon: <Iconify icon="solar:user-rounded-bold" />,
                  },
                ].map((item) => (
                  <Stack key={item.label} spacing={1.5} direction="row">
                    {item.icon}
                    <ListItemText
                      primary={item.label}
                      secondary={item.value}
                      primaryTypographyProps={{
                        typography: 'body2',
                        color: 'text.secondary',
                        mb: 0.5,
                      }}
                      secondaryTypographyProps={{
                        typography: 'subtitle2',
                        color: 'text.primary',
                        component: 'span',
                      }}
                    />
                  </Stack>
                ))}
              </Box>

              {/* <Markdown children={tour?.Vehicle_History} /> */}
            </Stack>
          </>
        )}
        {currentTab === 'history' && (
          <>
            <Stack sx={{ mx: 'auto' }}>
              {/* <Markdown children={carInfo?.Vehicle_History} /> */}
              {historyTimeline.length > 0 && (
                <>
                  <AnalyticsOrderTimeline title="History Timeline" list={historyTimeline} />
                </>
              )}
              {historyTimeline.length === 0 && (
                <>
                  <EmptyContent title="No History" filled sx={{ py: 10 }} />
                </>
              )}
            </Stack>
          </>
        )}
      </Container>
    </Dialog>
  );
};

export default ViewVehicleInfo;

ViewVehicleInfo.propTypes = {
  dialogvalue: PropTypes.bool,
  dialogonFalse: PropTypes.func,
  Transition: PropTypes.func,
  tour: PropTypes.object,
  renderTabs: PropTypes.object,
  currentTab: PropTypes.string,
  slides: PropTypes.array,
  settings: PropTypes.func,
  historyTimeline: PropTypes.array,
};
