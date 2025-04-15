import baseUrl from "./BaseUrl";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSetting = createAsyncThunk(
  'notification/fetchSetting',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token');
      }
      const response = await fetch(`${baseUrl}/api/notification-settings/`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' ,
        },
      });

      const data = await response.json();
      console.log(data);
      
      if (!response.ok) {
        return rejectWithValue(data.error || data.detail || 'Failed to fetch bot');
      }
      
      return data;
    } catch (error) {
      console.error('Fetch bot error:', error);
      return rejectWithValue(error.message || 'Failed to fetch bot');
    }
  }
);

export const updateSetting = createAsyncThunk(
  'notification/updateSetting',
  async (updateddata, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token');
      }
      const response = await fetch(`${baseUrl}/api/notification-settings/`, {
        method:"PUT",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' ,
        },
        body: JSON.stringify(updateddata)
      });

      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.error || data.detail || 'Failed to fetch bot');
      }
      
      return data;
    } catch (error) {
      console.error('Fetch bot error:', error);
      return rejectWithValue(error.message || 'Failed to fetch bot');
    }
  }
);

const initialState = {
  settings: null,
  isLoading: false,
  error: null,
  message: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // # setting fetching
      .addCase(fetchSetting.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSetting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = action.payload;
      })
      .addCase(fetchSetting.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error in fetching settings detail';
      })
            // # setting update
      .addCase(updateSetting.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSetting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = action.payload;
        state.message =  'Settings Update successfuly';
      })
      .addCase(updateSetting.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error in updating settings detail';
      })
   
  },
});

// Export actions
export const { clearError, clearMessage } = notificationSlice.actions;

export default notificationSlice.reducer;