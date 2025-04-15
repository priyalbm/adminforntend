import baseUrl from "./BaseUrl";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllTicket = createAsyncThunk(
  'ticket/fetchAllTicket',
  async ({ page, limit, searchQuery }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token');
      }
      const response = await fetch(`${baseUrl}/api/support/tickets/?page=${page}&page_size=${limit}&search=${searchQuery}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' ,
        },
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

export const fetchAllMessage = createAsyncThunk(
  'ticket/fetchAllMessage',
  async ({ticket}, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token');
      }
      const response = await fetch(`${baseUrl}/api/support/messages/?ticket=${ticket}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' ,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error || data.detail || 'Failed to fetch Message');
      }
      return data;
    } catch (error) {
      console.error('Fetch Message error:', error);
      return rejectWithValue(error.message || 'Failed to fetch Message');
    }
  }
);

export const SendMessage = createAsyncThunk(
  'ticket/SendMessage',
  async ({ticket, content}, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token');
      }
      const response = await fetch(`${baseUrl}/api/support/messages/`, {
        method: 'POST',
        headers: {'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'},
        body: JSON.stringify({ticket, content}),

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
  alltickets: null,
  count: null,
  singleticket: null,
  isLoading: false,
  error: null,
  message: null,
  allMessages: [],
  sendMessageStatus: null,
};

// Slice
const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearSendMessageStatus: (state) => {
      state.sendMessageStatus = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Tickets
      .addCase(fetchAllTicket.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count = action.payload.count;
        state.alltickets = action.payload.results;
      })
      .addCase(fetchAllTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || 'Error fetching tickets';
      })

      // Messages
      .addCase(fetchAllMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allMessages = action.payload.results;
      })
      .addCase(fetchAllMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || 'Error fetching messages';
      })

      // Send message
      .addCase(SendMessage.pending, (state) => {
        state.isLoading = true;
        state.sendMessageStatus = null;
        state.error = null;
      })
      .addCase(SendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sendMessageStatus = 'success';
        state.allMessages.push(action.payload); // append the new message
      })
      .addCase(SendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.sendMessageStatus = 'failed';
        state.error = action.payload?.error || 'Error sending message';
      });
  },
});

// Export actions
export const { clearError, clearMessage, clearSendMessageStatus } = ticketSlice.actions;

// Export reducer
export default ticketSlice.reducer;