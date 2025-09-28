import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS, AXIOS_CONFIG, logApiCall } from "../../config/api";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    logApiCall('POST', API_ENDPOINTS.AUTH.REGISTER, formData);
    const response = await axios.post(
      API_ENDPOINTS.AUTH.REGISTER,
      formData,
      AXIOS_CONFIG
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData) => {
    logApiCall('POST', API_ENDPOINTS.AUTH.LOGIN, formData);
    const response = await axios.post(
      API_ENDPOINTS.AUTH.LOGIN,
      formData,
      AXIOS_CONFIG
    );
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async () => {
    logApiCall('POST', API_ENDPOINTS.AUTH.LOGOUT);
    const response = await axios.post(API_ENDPOINTS.AUTH.LOGOUT, {}, AXIOS_CONFIG);
    return response.data;
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async () => {
    logApiCall('GET', API_ENDPOINTS.AUTH.CHECK_AUTH);
    const response = await axios.get(API_ENDPOINTS.AUTH.CHECK_AUTH, {
      ...AXIOS_CONFIG,
      headers: {
        ...AXIOS_CONFIG.headers,
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);

        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
