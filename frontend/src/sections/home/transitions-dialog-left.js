import { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { handleChangeState } from 'src/features/user/userSlice';
import { LoadingScreen } from 'src/components/loading-screen';
import { getDistinctValuesByKey } from 'src/helper';
// ----------------------------------------------------------------------

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

Transition.displayName = 'Transition';

export default function TransitionsDialogLeft({ carData }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { swipeLeftState, vehicleReports } = useSelector((store) => store.user);
  useEffect(() => {
    console.log('carData Right', carData);
  }, [carData]);
  const handleClose = () => {
    dispatch(handleChangeState({ name: 'swipeLeftState', value: false }));
  };
  const serviceOptions = getDistinctValuesByKey(vehicleReports, 'Vehicle_Item');
  const renderServices = (
    <Stack>
      <Typography sx={{ mb: 3, mt: 3 }}>Reason(s) the vehicle could not be serviced</Typography>
      {serviceOptions.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
            // checked={filters.services.includes(option)}
            // onClick={() => handleFilterServices(option)}
            />
          }
          label={option}
        />
      ))}
    </Stack>
  );
  return (
    <div>
      <Dialog
        keepMounted
        open={swipeLeftState}
        TransitionComponent={Transition}
        // onClose={() => actionFunc(false)}
      >
        <DialogTitle sx={{ borderBottom: `dashed 1px ${theme.palette.divider}` }}>
          {carData?.car_info?.Car_FullName}
        </DialogTitle>
        <DialogContent>
          {/* <Typography sx={{ mb: 3, mt: 3, textAlign: 'center' }}>
            Reason(s) the vehicle could not be serviced
          </Typography> */}
          {renderServices}
        </DialogContent>
        {/* onClick={handleClose} */}
        <DialogActions
          sx={{
            borderTop: `dashed 1px ${theme.palette.divider}`,
            mt: 3,
            justifyContent: 'center',
          }}
        >
          <Button variant="contained" autoFocus>
            Save
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

TransitionsDialogLeft.propTypes = {
  carData: PropTypes.object.isRequired,
};
