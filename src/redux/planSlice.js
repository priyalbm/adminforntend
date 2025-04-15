import baseUrl from "./BaseUrl";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createplan = createAsyncThunk(
  'plan/createplan',
  async (values, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token');
      }
      const response = await fetch(`${baseUrl}/api/plans/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' ,
        },
        body: JSON.stringify(values),
      });
      console.log(response);
      
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error || data.detail || 'Failed to create plan');
      }
      
      return data;
    } catch (error) {
      console.error('Create plan error:', error);
      return rejectWithValue(error.message || 'Failed to create plan');
    }
  }
);

export const fetchAllPlans = createAsyncThunk(
  'plan/fetchAllPlans',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token');
      }
      const response = await fetch(`${baseUrl}/api/plans/`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' ,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.error || data.detail || 'Failed to fetch plans');
      }
      
      return data;
    } catch (error) {
      console.error('Fetch plans error:', error);
      return rejectWithValue(error.message || 'Failed to fetch plans');
    }
  }
);

const initialState = {
  allplans: null,
  count: null,
  singleplan: null,
  isLoading: false,
  error: null,
  message: null,
};

const planSlice = createSlice({
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
      .addCase(createplan.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createplan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message || "Plan created succussfuly";
      })
      .addCase(createplan.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error in creating plan';
      })
      // # single user fetching
      .addCase(fetchAllPlans.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllPlans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count = action.payload.count;
        state.allplans = action.payload.results;
      })
      .addCase(fetchAllPlans.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error in fetching user detail';
      })
   
  },
});

// Export actions
export const { clearError, clearMessage } = planSlice.actions;

export default planSlice.reducer;