import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS, AXIOS_CONFIG, logApiCall } from "../../../config/api";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async (formData) => {
    logApiCall('POST', API_ENDPOINTS.ADDRESS.ADD, formData);
    const response = await axios.post(
      API_ENDPOINTS.ADDRESS.ADD,
      formData,
      AXIOS_CONFIG
    );
    return response.data;
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses",
  async (userId) => {
    const url = API_ENDPOINTS.ADDRESS.GET(userId);
    logApiCall('GET', url);
    const response = await axios.get(url, AXIOS_CONFIG);
    return response.data;
  }
);

export const editaAddress = createAsyncThunk(
  "/addresses/editaAddress",
  async ({ userId, addressId, formData }) => {
    const url = API_ENDPOINTS.ADDRESS.UPDATE(userId, addressId);
    logApiCall('PUT', url, formData);
    const response = await axios.put(url, formData, AXIOS_CONFIG);
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({ userId, addressId }) => {
    const url = API_ENDPOINTS.ADDRESS.DELETE(userId, addressId);
    logApiCall('DELETE', url);
    const response = await axios.delete(url, AXIOS_CONFIG);
    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
