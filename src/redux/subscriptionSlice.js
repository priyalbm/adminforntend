import baseUrl from "./BaseUrl";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createSubscription = createAsyncThunk(
  'subscription/createSubscription',
  async (plan_id, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token');
      }
      const response = await fetch(`${baseUrl}/api/subscriptions/create_order/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' ,
        },
        body: JSON.stringify(plan_id),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error || data.detail || 'Failed to subscribe plan');
      }
      return data;
    } catch (error) {
      console.error('subscribe plan error:', error);
      return rejectWithValue(error.message || 'Failed to subscribe plan');
    }
  }
);

export const fetchAllSubscription = createAsyncThunk(
  'subscription/fetchAllSubscription',
  async ({ page, limit, searchQuery }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token');
      }
      const response = await fetch(`${baseUrl}/api/subscriptions/?page=${page}&page_size=${limit}&search=${searchQuery}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' ,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.error || data.detail || 'Failed to fetch subscriptions');
      }
      
      return data;
    } catch (error) {
      console.error('Fetch subscriptions error:', error);
      return rejectWithValue(error.message || 'Failed to fetch subscriptions');
    }
  }
);

const initialState = {
  allsubscriptions: null,
  count: null,
  singleplan: null,
  isLoading: false,
  error: null,
  message: null,
};

const subscriptionSlice = createSlice({
  name: 'plan',
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
      .addCase(createSubscription.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message || "Plan Subscribed succussfuly";
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error in creating subscription';
      })
      // # single subscription fetching
      .addCase(fetchAllSubscription.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllSubscription.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count = action.payload.count;
        state.allsubscriptions = action.payload.results;
      })
      .addCase(fetchAllSubscription.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error in fetching subscription detail';
      })
   
  },
});

// Export actions
export const { clearError, clearMessage } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;