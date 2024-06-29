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

export default function TransitionsDialogRight() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { swipeRightState, loginUserState, addingKeysNeededLoading, swipeData } = useSelector(
    (store) => store.user
  );

  const [openForm, setOpenForm] = useState(swipeRightState);
  const [alreadyKeyNeeded, setAlreadyKeyNeeded] = useState(false);

  useEffect(() => {
    // console.log('carData Left', swipeData);
    // setCarDetails(carData);
    if (swipeRightState) {
      setOpenForm(true);
    } else {
      setOpenForm(false);
    }
  }, [swipeRightState]);
  useEffect(() => {
    // console.log('carData Right', carData);

    const config = {};
    config.appName = loginUserState?.appLinkName;
    config.reportName = 'On_Site_Inventory';
    config.id = swipeData?.ID;
    config.ACTION_V = 'ADDING_KEYS';
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
    if (swipeData?.Keys !== 'Need') {
      updateRecordResp();
    } else {
      console.log('NO ACTION. ALREADY ADDED TO KEY NEEDED.');
      setAlreadyKeyNeeded(true);
    }
  }, [loginUserState, swipeData, dispatch]);
  const handleClose = () => {
    dispatch(handleChangeState({ name: 'swipeRightState', value: false }));
  };
  // onClose={handleClose}
  return (
    <div>
      <Dialog keepMounted open={openForm} TransitionComponent={Transition}>
        <DialogTitle sx={{ borderBottom: `dashed 1px ${theme.palette.divider}` }}>
          {swipeData?.Car_FullName}
        </DialogTitle>
        <DialogContent sx={{ pb: 3 }}>
          <Typography sx={{ mb: 3, mt: 3, textAlign: 'center' }}>
            {!alreadyKeyNeeded && addingKeysNeededLoading && 'Adding to Keys Needed'}

            {!alreadyKeyNeeded && !addingKeysNeededLoading && 'Success! Added to Keys Needed'}
            {alreadyKeyNeeded &&
              'This vehicle are already in added in Keys Needed. Please see the history for more details.'}
          </Typography>
          {!alreadyKeyNeeded && addingKeysNeededLoading && <LoadingScreen />}
        </DialogContent>
        {/* onClick={handleClose} */}
        {(!addingKeysNeededLoading || alreadyKeyNeeded) && (
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
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}

TransitionsDialogRight.propTypes = {
  // carData: PropTypes.object.isRequired,
};
