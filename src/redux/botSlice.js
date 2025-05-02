import baseUrl from "./BaseUrl";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllExchange = createAsyncThunk(
  "bot/fetchAllExchange",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("No authentication token");
      }
      const response = await fetch(`${baseUrl}/api/exchanges/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.error || data.detail || "Failed to fetch bot"
        );
      }

      return data;
    } catch (error) {
      console.error("Fetch bot error:", error);
      return rejectWithValue(error.message || "Failed to fetch bot");
    }
  }
);

export const fetchAllBot = createAsyncThunk(
  "bot/fetchAllBot",
  async ({ page, limit, searchQuery }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("No authentication token");
      }
      const response = await fetch(
        `${baseUrl}/api/bot/configurations/?page=${page}&page_size=${limit}&search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.error || data.detail || "Failed to fetch bot"
        );
      }

      return data;
    } catch (error) {
      console.error("Fetch bot error:", error);
      return rejectWithValue(error.message || "Failed to fetch bot");
    }
  }
);

export const botStatusUpdate = createAsyncThunk(
  "bot/botStatusUpdate",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${baseUrl}/api/bot-configs/${id}/${status}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(
          data.error || data.detail || `bot ${status} successfuly`
        );
      }
      return data;
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const createExchange = createAsyncThunk(
  "bot/createExchange",
  async (exchangeData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("No authentication token");
      }
      const response = await fetch(`${baseUrl}/api/exchanges/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exchangeData),
      });
      console.log(response);

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(
          data.error || data.detail || "Failed to create exchange"
        );
      }

      return data;
    } catch (error) {
      console.error("Create plan error:", error);
      return rejectWithValue(error.message || "Failed to create exchange");
    }
  }
);

const initialState = {
  allexchange: null,
  allbots: null,
  count: null,
  singlebot: null,
  isLoading: false,
  error: null,
  message: null,
};

const botSlice = createSlice({
  name: "bot",
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
      .addCase(fetchAllBot.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllBot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count = action.payload.count;
        state.allbots = action.payload.results;
      })
      .addCase(fetchAllBot.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error in fetching bots detail";
      })
      // # exchannge fetching

      .addCase(fetchAllExchange.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllExchange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count = action.payload.count;
        state.allexchange = action.payload.results;
      })
      .addCase(fetchAllExchange.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error in fetching bots detail";
      })
      // # update bot status
      .addCase(botStatusUpdate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(botStatusUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(botStatusUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error in fetching bots detail";
      })
      // create exchange
      .addCase(createExchange.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createExchange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message =
          action.payload.message || "exchange created succussfuly";
      })
      .addCase(createExchange.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error in creating exchange";
      });
  },
});

// Export actions
export const { clearError, clearMessage } = botSlice.actions;

export default botSlice.reducer;
