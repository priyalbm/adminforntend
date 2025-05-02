import baseUrl from "./BaseUrl";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLogs = createAsyncThunk(
    "log/fetchLogs",
    async (params, { rejectWithValue, getState }) => {
      try {
        console.log(params);
        
        const token = getState().auth.token || localStorage.getItem("token");
        if (!token) return rejectWithValue("No authentication token");
  
        const queryString = new URLSearchParams(params).toString();
  
        const response = await fetch(`${baseUrl}/api/logs/?${queryString}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          return rejectWithValue(
            data.error || data.detail || "Failed to fetch logs"
          );
        }
  
        return data; // Full paginated response
      } catch (error) {
        console.error("Fetch logs error:", error);
        return rejectWithValue(error.message || "Failed to fetch logs");
      }
    }
  );
  
const initialState = {
  alllogs: null,
  count: null,
  isLoading: false,
  error: null,
  message: null,
};

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // # bot fetching
      .addCase(fetchLogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count = action.payload.count;
        state.alllogs = action.payload.results;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error in fetching logs";
      })
  },
});

// Export actions
export const { clearError, clearMessage } = logSlice.actions;

export default logSlice.reducer;
