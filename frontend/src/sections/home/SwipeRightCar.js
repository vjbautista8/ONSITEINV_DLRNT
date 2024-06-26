import React, { useEffect } from 'react';
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

const SwipeRightCar = () => {
  useEffect(() => {
    console.log('SwipeRightCar');
  }, []); // The empty array ensures this runs only on mount

  return (
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
            label: 'Execute Action B ?',
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
          <Button
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
          </Button>
        </Grid>
      </Stack>
    </>
  );
};

export default SwipeRightCar;
