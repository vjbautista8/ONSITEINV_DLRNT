import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
// theme
import { bgBlur } from 'src/theme/css';
// hooks
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
import Logo from 'src/components/logo';
import SvgColor from 'src/components/svg-color';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import { HEADER, NAV } from '../config-layout';
import {
  Searchbar,
  AccountPopover,
  SettingsButton,
  ContactsPopover,
  NotificationsPopover,
} from '../_common';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const settings = useSettingsContext();

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');

  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset && !isNavHorizontal;
  const openFilters = useBoolean();
  const renderContent = (
    <>
      {/* <Typography variant="h4" gutterBottom>
        On Site Inventory
      </Typography> */}
      {lgUp && isNavHorizontal && <Typography variant="h4">On Site Inventory</Typography>}
      {/* {lgUp && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

      {!lgUp && (
        <IconButton onClick={onOpenNav}>
          <SvgColor src="/app/assets/icons/navbar/ic_menu_item.svg" />
        </IconButton>
      )} */}

      <Searchbar />

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        <Button
          disableRipple
          color="inherit"
          endIcon={
            <Badge color="error" variant="dot" invisible="true">
              <Iconify icon="ic:round-filter-list" />
            </Badge>
          }
          onClick={openFilters.onTrue}
          // onClick={onOpen} !canReset
        >
          Filters
        </Button>
        <Button
          disableRipple
          color="inherit"
          endIcon={
            <Badge color="error" variant="dot" invisible="true">
              <Iconify icon="ic:round-filter-list" />
            </Badge>
          }
          onClick={openFilters.onTrue}
          // onClick={onOpen} !canReset
        >
          {lgUp ? ' Sort By : Modified Time' : ''}
        </Button>
        <Button
          disableRipple
          color="inherit"
          endIcon={
            <Badge color="error" variant="dot" invisible="true">
              <Iconify icon="ic:round-filter-list" />
            </Badge>
          }
          onClick={openFilters.onTrue}
          // onClick={onOpen} !canReset
        >
          {lgUp ? ' Sort Order : Ascending' : ''}
        </Button>

        {/* <Button
          disableRipple
          color="inherit"
          endIcon={
            <Badge color="error" variant="dot" invisible="true">
              <Iconify icon="mdi:sort" />
            </Badge>
          }
          // onClick={openFilters.onTrue}
          // onClick={onOpen} !canReset
        >
          Sort
        </Button> */}
        {/* <NotificationsPopover /> */}

        {/* <ContactsPopover /> */}
        {/* {settings.themeMode === 'light' && (
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
        )} */}

        {/* <SettingsButton /> */}

        {/* <AccountPopover /> */}
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
          height: HEADER.H_DESKTOP,
          ...(offsetTop && {
            height: HEADER.H_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            height: HEADER.H_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
