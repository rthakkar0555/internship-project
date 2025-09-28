import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS, AXIOS_CONFIG, logApiCall } from "../../../config/api";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    logApiCall('POST', API_ENDPOINTS.ADMIN_PRODUCTS.ADD, formData);
    const result = await axios.post(
      API_ENDPOINTS.ADMIN_PRODUCTS.ADD,
      formData,
      AXIOS_CONFIG
    );
    return result?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    logApiCall('GET', API_ENDPOINTS.ADMIN_PRODUCTS.GET_ALL);
    const result = await axios.get(
      API_ENDPOINTS.ADMIN_PRODUCTS.GET_ALL,
      AXIOS_CONFIG
    );
    return result?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const url = API_ENDPOINTS.ADMIN_PRODUCTS.EDIT(id);
    logApiCall('PUT', url, formData);
    const result = await axios.put(
      url,
      formData,
      AXIOS_CONFIG
    );
    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const url = API_ENDPOINTS.ADMIN_PRODUCTS.DELETE(id);
    logApiCall('DELETE', url);
    const result = await axios.delete(
      url,
      AXIOS_CONFIG
    );
    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
