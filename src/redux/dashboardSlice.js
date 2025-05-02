import baseUrl from "./BaseUrl";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const dashboardData = createAsyncThunk(
    "admin/dashboardData",
    async (_, { rejectWithValue, getState }) => {
      try {
        const token = getState().auth.token || localStorage.getItem("token");
        if (!token) return rejectWithValue("No authentication token");
  
        const response = await fetch(`${baseUrl}/api/auth/dashboard/data/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          return rejectWithValue(
            data.error || data.detail || "Failed to fetch dashbaord data"
          );
        }
  
        return data; // Full paginated response
      } catch (error) {
        console.error("Fetch dashbaord data error:", error);
        return rejectWithValue(error.message || "Failed to fetch dashbaord data");
      }
    }
  );
  
  export const fetchRecentUsers = createAsyncThunk(
    'admin/fetchRecentUsers',
    async (_, { rejectWithValue, getState }) => {
      try {
        const token = getState().auth.token || localStorage.getItem('token');
        if (!token) {
          return rejectWithValue('No authentication token');
        }
        const response = await fetch(`${baseUrl}/api/recent-users/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        if (!response.ok) {
          return rejectWithValue(data.error || data.detail || 'Failed to fetch users');
        }
        
        return data;
      } catch (error) {
        console.error('Fetch users error:', error);
        return rejectWithValue(error.message || 'Failed to fetch users');
      }
    }
  );
const initialState = {
  data: null,
  recentusers: null,
  isLoading: false,
  error: null,
  message: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
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
      .addCase(dashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(dashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(dashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error in fetching dashboard data";
      })
      // # recent user fetching
      .addCase(fetchRecentUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecentUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recentusers = action.payload.recent_users;
      })
      .addCase(fetchRecentUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error in fetching recent users';
      })
  },
});

// Export actions
export const { clearError, clearMessage } = dashboardSlice.actions;

export default dashboardSlice.reducer;
