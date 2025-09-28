import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS, AXIOS_CONFIG, logApiCall } from "../../../config/api";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formdata) => {
    logApiCall('POST', API_ENDPOINTS.REVIEWS.ADD, formdata);
    const response = await axios.post(
      API_ENDPOINTS.REVIEWS.ADD,
      formdata,
      AXIOS_CONFIG
    );
    return response.data;
  }
);

export const getReviews = createAsyncThunk("/order/getReviews", async (id) => {
  const url = API_ENDPOINTS.REVIEWS.GET(id);
  logApiCall('GET', url);
  const response = await axios.get(url, AXIOS_CONFIG);
  return response.data;
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
