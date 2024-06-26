import { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { handleChangeState, updateRecord } from 'src/features/user/userSlice';
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

Transition.displayName = 'Transition';

export default function TransitionsDialogRight({ carData }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { swipeRightState, loginUserState, addingKeysNeededLoading } = useSelector(
    (store) => store.user
  );
  // useEffect(() => {
  //   console.log('carData Right', carData);
  //   const config = {};
  //   // config.appName = loginUserState?.appLinkName;
  //   config.reportName = 'On_Site_Inventory';
  //   config.id = carData?.car_info?.ID;
  //   const formData = {};
  //   const fieldData = {};
  //   fieldData.Keys = 'Need';
  //   formData.data = fieldData;
  //   config.formData = formData;
  //   console.log('CONFIG', config);
  // }, [carData]);
  useEffect(() => {
    console.log('carData Right', carData);
    const config = {};
    config.appName = loginUserState?.appLinkName;
    config.reportName = 'On_Site_Inventory';
    config.id = carData?.car_info?.ID;
    const formData = {};
    const fieldData = {};
    fieldData.Keys = 'Need';
    formData.data = fieldData;
    config.formData = formData;
    console.log('CONFIG', config);

    const updateRecordResp = async () => {
      // You can await here
      await dispatch(updateRecord(config));
      // ...
    };
    updateRecordResp();
  }, [carData, loginUserState, dispatch]);
  const handleClose = () => {
    dispatch(handleChangeState({ name: 'swipeRightState', value: false }));
  };
  return (
    <div>
      <Dialog
        keepMounted
        open={swipeRightState}
        TransitionComponent={Transition}
        // onClose={() => actionFunc(false)}
      >
        <DialogTitle sx={{ borderBottom: `dashed 1px ${theme.palette.divider}` }}>
          {carData?.car_info?.Car_FullName}
        </DialogTitle>
        <DialogContent sx={{ pb: 3 }}>
          <Typography sx={{ mb: 3, mt: 3, textAlign: 'center' }}>
            {addingKeysNeededLoading ? 'Adding to Keys Needed' : 'Success! Added to Keys Needed'}
          </Typography>
          {addingKeysNeededLoading && <LoadingScreen />}
        </DialogContent>
        {/* onClick={handleClose} */}
        {!addingKeysNeededLoading && (
          <DialogActions
            sx={{
              borderTop: `dashed 1px ${theme.palette.divider}`,
              mt: 3,
              justifyContent: 'center',
            }}
          >
            <Button variant="outlined" onClick={handleClose}>
              Okay
            </Button>
            {/* <Button variant="contained" autoFocus>
            s Agree
          </Button> */}
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}

TransitionsDialogRight.propTypes = {
  carData: PropTypes.object.isRequired,
};
