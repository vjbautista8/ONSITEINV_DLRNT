import { useEffect, useState } from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  addConcatenatedKey,
  getFirstNElements,
  sortByDateTimeKey,
  sortByKey,
  updateObjectById,
} from 'src/helper';
import { orderBy } from 'lodash';

const appState = {
  loginUserState: false,
  currentDashboardID: null,
  isMobile: false,
  screenSize: {},
  pathName: '',
};
const userState = {
  userFullDetails: null,
  getUserFullDetailsState: false,
  onSiteInventoryList: [],
  finishedGettingInventoryItems: false,
  list_page: 1,
  has_more_on_site_inventory: true,
  page_on_site: 1,
  statusOptionsState: [],
  servicesOptionsState: [],
  vehicleReports: [],
  swipeRightState: false,
  swipeLeftState: false,
  addingKeysNeededLoading: true,
  addingServicesLoading: false,
  swipeData: {},
};

const initialState = {
  ...userState,
  ...appState,
};
const ZOHO = window.ZOHO;

// ==============loginUser
export const loginUser = createAsyncThunk('user/loginUser', async (thunkAPI) => {
  try {
    // await ZOHO.CREATOR.init();
    const response = ZOHO.CREATOR.UTIL.getInitParams();
    return response;
  } catch (error) {
    console.log('loginUser ERROR =>', error.response);
    return thunkAPI.rejectWithValue(error.response);
  }
});

// ==============getUserFullDetails
export const getUserFullDetails = createAsyncThunk(
  'user/getUserFullDetails',
  async (data, thunkAPI) => {
    try {
      const config = {
        appName: data.appName,
        reportName: data.reportName,
        page: data.page,
        pageSize: 200,
        criteria: data.criteria,
        // id: data.Email,
      };
      // await ZOHO.CREATOR.init();
      const response = ZOHO.CREATOR.API.getAllRecords(config);
      return response;
    } catch (error) {
      // console.log('getUserFullDetails ERROR =>', data, error);
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const searchRecords = createAsyncThunk('user/searchRecords', async (data, thunkAPI) => {
  try {
    const config = {
      appName: data.appName,
      reportName: data.reportName,
      page: data.page,
      pageSize: 200,
      criteria: data.criteria,
    };
    // await ZOHO.CREATOR.init();
    const response = ZOHO.CREATOR.API.getAllRecords(config);
    return response;
  } catch (error) {
    console.log('searchRecords ERROR =>', data, error);
    return thunkAPI.rejectWithValue(error.response);
  }
});
export const createRecord = createAsyncThunk('user/createRecord', async (data, thunkAPI) => {
  try {
    const config = {
      appName: data.appName,
      formName: data.formName,
      data: data.formData,
    };
    // await ZOHO.CREATOR.init();
    const response = ZOHO.CREATOR.API.addRecord(config);
    return response;
  } catch (error) {
    console.log('createRecord ERROR =>', data, error);
    return thunkAPI.rejectWithValue(error.response);
  }
});
export const updateRecord = createAsyncThunk('user/updateRecord', async (data, thunkAPI) => {
  try {
    const config = {
      appName: data.appName,
      reportName: data.reportName,
      data: data.formData,
      id: data.id,
    };
    // await ZOHO.CREATOR.init();
    const response = ZOHO.CREATOR.API.updateRecord(config);
    return response;
  } catch (error) {
    console.log('updateRecord ERROR =>', data, error);
    return thunkAPI.rejectWithValue(error.response);
  }
});
export const getRecordByID = createAsyncThunk('user/getRecordByID', async (data, thunkAPI) => {
  try {
    const config = {
      appName: data.appName,
      reportName: data.reportName,
      id: data.id,
    };
    // await ZOHO.CREATOR.init();
    const response = ZOHO.CREATOR.API.getRecordById(config);
    return response;
  } catch (error) {
    console.log('getRecordByID ERROR =>', data, error);
    return thunkAPI.rejectWithValue(error.response);
  }
});
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleChangeState: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      // ==============loginUser
      .addCase(loginUser.pending, (state) => {})
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const result = payload;
        console.log('loginUser fulfilled =>', result);
        state.loginUserState = result;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        console.log('loginUser ERROR =>', payload);
        state.isLoading = false;
      })
      // ===============loginUser
      // ==============searchRecords
      .addCase(searchRecords.pending, (state) => {
        // state.finishedGettingInventoryItems = false;
      })
      .addCase(searchRecords.fulfilled, (state, { payload, meta }) => {
        console.log('searchRecords meta =>', meta);
        if (meta?.arg?.reportName === 'On_Site_Inventory' && payload?.data) {
          const keyList = ['Stock', 'Year_field', 'Make', 'Model', 'VIN'];
          const newKey = 'Car_FullName';
          const currentList = state.onSiteInventoryList;
          const result = addConcatenatedKey(payload?.data, keyList, newKey);
          // getFirstNElements(200, result);
          const result_unsorted = [...currentList, ...result];
          const result_sorted = sortByDateTimeKey(result_unsorted, 'Modified_Time', 'desc');
          state.onSiteInventoryList = result_sorted;
          const prevPage = state.page_on_site;
          state.page_on_site = prevPage + 1;
          console.log('searchRecords fulfilled  On_Site_Inventory =>', result);
        }

        if (meta?.arg?.reportName === 'Vehicle_Items1' && payload?.data) {
          const result = payload;
          console.log('searchRecords fulfilled  On_Site_Inventory =>', result);
          state.vehicleReports = payload?.data;
        }
        // state.finishedGettingInventoryItems = true;
      })

      .addCase(searchRecords.rejected, (state, { payload, meta }) => {
        if (meta?.arg?.reportName === 'On_Site_Inventory') {
          state.finishedGettingInventoryItems = true;
          console.log(`searchRecords ERROR => ${meta?.arg?.reportName}`, payload);
          state.has_more_on_site_inventory = false;
        }

        state.isLoading = false;
        // state.finishedGettingInventoryItems = true;
      })
      // ===============searchRecords
      // ==============updateRecord
      .addCase(updateRecord.pending, (state, { payload, meta }) => {
        if (meta?.arg?.reportName === 'On_Site_Inventory') {
          if (meta?.arg?.ACTION_V === 'ADDING_KEYS') {
            state.addingKeysNeededLoading = true;
          }
          if (meta?.arg?.ACTION_V === 'ADDING_REASONS') {
            state.addingServicesLoading = true;
          }
        }
        // state.finishedGettingInventoryItems = false;
      })
      .addCase(updateRecord.fulfilled, (state, { payload, meta }) => {
        if (meta?.arg?.reportName === 'On_Site_Inventory') {
          if (meta?.arg?.ACTION_V === 'ADDING_KEYS') {
            state.addingKeysNeededLoading = false;
            const currentInventoryList = state.onSiteInventoryList;
            const updatedList = updateObjectById(
              currentInventoryList,
              meta?.arg?.id,
              meta?.arg?.formData?.data
            );
            state.onSiteInventoryList = updatedList;
          }
          if (meta?.arg?.ACTION_V === 'ADDING_REASONS') {
            state.addingServicesLoading = false;
            const currentInventoryList = state.onSiteInventoryList;
            const updatedList = updateObjectById(currentInventoryList, meta?.arg?.id, {
              Vehicle_Items: meta?.arg?.UPDATE_FORMAT_VEHICLE_ITEMS,
            });
            state.onSiteInventoryList = updatedList;
            state.swipeLeftState = false;
            toast.success('Success! Reason(s) updated.');
          }
        }
        console.log('updateRecord meta =>', meta);
        console.log('updateRecord fulfilled =>', payload);
        // state.updateRecord = true;
      })

      .addCase(updateRecord.rejected, (state, { payload, meta }) => {
        if (meta?.arg?.reportName === 'On_Site_Inventory') {
          state.addingKeysNeededLoading = false;
        }
        if (meta?.arg?.ACTION_V === 'ADDING_REASONS') {
          state.addingServicesLoading = false;
        }
        console.log(`updateRecord ERROR => ${meta?.arg?.reportName}`, payload);

        state.isLoading = false;
        toast.error('Ops, Something went wrong! Please try again.');
        // state.finishedGettingInventoryItems = true;
      });
    // ===============searchRecords

    // ===============getUserFullDetails
  },
});
export const { handleChangeState } = userSlice.actions;
export default userSlice.reducer;
