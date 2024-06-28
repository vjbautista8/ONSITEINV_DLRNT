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
import { handleChangeState, updateRecord } from 'src/features/user/userSlice';
import { LoadingScreen } from 'src/components/loading-screen';
import {
  getDisplayValueObjects,
  getDistinctValuesByKey,
  getFilteredIDs,
  getValuesByKey,
} from 'src/helper';
// ----------------------------------------------------------------------

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

Transition.displayName = 'Transition';

export default function TransitionsDialogLeft() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { swipeLeftState, vehicleReports, swipeData, loginUserState, addingServicesLoading } =
    useSelector((store) => store.user);
  const [openForm, setOpenForm] = useState(swipeLeftState);
  // const [carDetails, setCarDetails] = useState(swipeData);
  const [services, setServices] = useState(
    getValuesByKey(swipeData?.Vehicle_Items, 'display_value')
  );
  const handleAddFilterServices = (newValue) => {
    if (services.includes(newValue)) {
      setServices(services.filter((service) => service !== newValue));
    } else {
      setServices([...services, newValue]);
    }
  };
  useEffect(() => {
    console.log('carData Left services', services);
    // setCarDetails(carData);
    if (swipeLeftState) {
      setOpenForm(true);
    } else {
      setOpenForm(false);
    }
  }, [swipeLeftState, services]);

  const handleClose = () => {
    setOpenForm(false);
    dispatch(handleChangeState({ name: 'swipeLeftState', value: false }));
  };
  const handleSaveServices = () => {
    const config = {};
    config.appName = loginUserState?.appLinkName;
    config.reportName = 'On_Site_Inventory';
    config.id = swipeData?.ID;
    config.ACTION_V = 'ADDING_REASONS';
    const formData = {};
    const fieldData = {};
    const listOfReasonsIDs = getFilteredIDs(vehicleReports, services);
    fieldData.Vehicle_Items = listOfReasonsIDs;
    formData.data = fieldData;
    config.formData = formData;
    config.UPDATE_FORMAT_VEHICLE_ITEMS = getDisplayValueObjects(vehicleReports, listOfReasonsIDs);
    console.log('CONFIG', config);
    const updateRecordResp = async () => {
      // You can await here
      await dispatch(updateRecord(config));
      // ...
    };
    updateRecordResp();
  };

  const serviceOptions = getDistinctValuesByKey(vehicleReports, 'Vehicle_Item');
  const renderServices = (
    <Stack>
      {serviceOptions.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={services.includes(option)}
              onClick={() => handleAddFilterServices(option)}
            />
          }
          label={option}
        />
      ))}
    </Stack>
  );
  // onClose = { handleClose };
  return (
    <div>
      <Dialog keepMounted open={openForm} TransitionComponent={Transition}>
        <DialogTitle sx={{ borderBottom: `dashed 1px ${theme.palette.divider}` }}>
          {swipeData?.Car_FullName}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 3, mt: 3 }}>
            {addingServicesLoading
              ? 'Adding Reason(s) the vehicle could not be serviced'
              : 'Reason(s) the vehicle could not be serviced'}
          </Typography>
          {addingServicesLoading && <LoadingScreen />}
          {!addingServicesLoading && renderServices}
        </DialogContent>
        <DialogActions
          sx={{
            borderTop: `dashed 1px ${theme.palette.divider}`,
            mt: 3,
            justifyContent: 'center',
          }}
        >
          {!addingServicesLoading && (
            <>
              <Button variant="contained" autoFocus onClick={handleSaveServices}>
                Save
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

TransitionsDialogLeft.propTypes = {
  // carData: PropTypes.object.isRequired,
};
