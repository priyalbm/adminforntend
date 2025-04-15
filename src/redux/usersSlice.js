import baseUrl from "./BaseUrl";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async ({ page, limit, searchQuery }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token');
      }
      const response = await fetch(`${baseUrl}/api/users/?page=${page}&page_size=${limit}&search=${searchQuery}`, {
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
export const fetchSingleUsers = createAsyncThunk(
  'users/fetchSingleUsers',
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token');
      }
      const response = await fetch(`${baseUrl}/api/users/${id}`, {
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
export const updateUsers = createAsyncThunk(
  'users/updateUsers',
  async ({id,updatedFields}, { rejectWithValue, getState }) => {
    try {
      console.log(id,updatedFields);
      
      const token = getState().auth.token || localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token');
      }
      const response = await fetch(`${baseUrl}/api/users/${id}/`, {
        method: 'PATCH',
        headers: {'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'},
        body: JSON.stringify(updatedFields),
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
  allusers: null,
  count: null,
  singleuser: null,
  isLoading: false,
  error: null,
  message: null,
};

const usersSlice = createSlice({
  name: 'users',
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
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count = action.payload.count;
        state.allusers = action.payload.results;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error in fetching users';
      })
      // # single user fetching
      .addCase(fetchSingleUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleuser = action.payload;
      })
      .addCase(fetchSingleUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error in fetching user detail';
      })
       // # update user fetching
       .addCase(updateUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload || "updateds";
      })
      .addCase(updateUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error in fetching user detail';
      })
   
  },
});

// Export actions
export const { clearError, clearMessage } = usersSlice.actions;

export default usersSlice.reducer;