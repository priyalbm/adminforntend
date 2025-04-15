import baseUrl from "./BaseUrl";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (values, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.error || data.detail || 'Login failed');
      }
      console.log(data);
      
      localStorage.setItem('token', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      
      return { user: data.user, access: data.access , refreshToken: data.refresh};
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (values, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/api/users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return rejectWithValue(data.error || data.detail || 'Registration failed');
      }
  
      // Store tokens in localStorage
      localStorage.setItem('token', data.tokens.access);
      localStorage.setItem('refreshToken', data.tokens.refresh);
  
      return { user: data.user, tokens: data.tokens };
    } catch (error) {
      console.error("Registration error:", error);
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const requestOTP = createAsyncThunk(
  'auth/requestOTP',
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/otp/request/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.error || data.detail || 'OTP request failed');
      }
      
      return data;
    } catch (error) {
      console.error("OTP Request error:", error);
      return rejectWithValue(error.message || 'OTP request failed');
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async ({ email, otp, userData }, { rejectWithValue }) => {
    try {
      // Store registration data in session first (handled by Django)
      if (userData) {
        const sessionResponse = await fetch(`${baseUrl}/api/auth/store-registration/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
          credentials: 'include'  // Important for session cookies
        });
        
        if (!sessionResponse.ok) {
          const errorData = await sessionResponse.json();
          return rejectWithValue(errorData.error || 'Failed to store registration data');
        }
      }
      
      // Now verify OTP
      const response = await fetch(`${baseUrl}/api/auth/otp/verify/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
        credentials: 'include'  // Important for session cookies
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.error || data.detail || 'OTP verification failed');
      }
      
      // If we have user and tokens, store them
      if (data.tokens) {
        localStorage.setItem('token', data.tokens.access);
        localStorage.setItem('refreshToken', data.tokens.refresh);
      }
      
      return data;
    } catch (error) {
      console.error("OTP Verification error:", error);
      return rejectWithValue(error.message || 'OTP verification failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem('refreshToken');
      
      if (token) {
        // Blacklist the token on the server
        await fetch(`${baseUrl}/api/auth/logout/`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().auth.token}`
          },
          body: JSON.stringify({ refresh: token }),
        });
      }
      
      // Clean up stored tokens
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      
      return null;
    } catch (error) {
      console.error("Logout error:", error);
      // Still remove tokens on error
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      if (!token ) {
        return rejectWithValue('No authentication token');
      }
      const response = await fetch(`${baseUrl}/api/users/me/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.error || data.detail || 'Failed to fetch profile');
      }
      return data;
    } catch (error) {
      console.error("Fetch profile error:", error);
      return rejectWithValue(error.message || 'Failed to fetch profile');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/password-reset/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.error || data.detail || 'Password reset request failed');
      }
      
      return data;
    } catch (error) {
      console.error("Password reset request error:", error);
      return rejectWithValue(error.message || 'Password reset request failed');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, uid, newPassword }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/password-reset/confirm/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, uid, new_password: newPassword }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.error || data.detail || 'Password reset failed');
      }
      
      return data;
    } catch (error) {
      console.error("Password reset error:", error);
      return rejectWithValue(error.message || 'Password reset failed');
    }
  }
);

export const refreshAuthToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        return rejectWithValue('No refresh token available');
      }
      
      const response = await fetch(`${baseUrl}/api/auth/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Clear tokens on refresh failure
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        return rejectWithValue(data.error || data.detail || 'Token refresh failed');
      }
      
      // Update access token
      localStorage.setItem('token', data.access);
      
      return { token: data.access };
    } catch (error) {
      console.error("Token refresh error:", error);
      // Clear tokens on error
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      return rejectWithValue(error.message || 'Token refresh failed');
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isAuthenticated: Boolean(localStorage.getItem('token')),
  isLoading: false,
  otpRequested: false,
  otpVerified: false,
  passwordResetRequested: false,
  passwordResetComplete: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    setCredentials: (state, action) => {
      const { user, token, refreshToken } = action.payload;
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken || state.refreshToken;
      state.isAuthenticated = Boolean(token);
    },
    resetAuthState: (state) => {
      state.otpRequested = false;
      state.otpVerified = false;
      state.passwordResetRequested = false;
      state.passwordResetComplete = false;
      state.error = null;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.message = 'Login successful';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
      })
      
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.tokens.access;
        state.refreshToken = action.payload.tokens.refresh;
        state.message = 'Registration successful';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Registration failed';
      })

      // OTP Request cases
      .addCase(requestOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestOTP.fulfilled, (state) => {
        state.isLoading = false;
        state.otpRequested = true;
        state.message = 'OTP sent successfully';
      })
      .addCase(requestOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'OTP request failed';
      })

      // OTP Verification cases
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.otpVerified = true;
        if (action.payload.user && action.payload.tokens) {
          state.user = action.payload.user;
          state.token = action.payload.tokens.access;
          state.refreshToken = action.payload.tokens.refresh;
          state.isAuthenticated = true;
          state.message = 'Registration successful';
        } else {
          state.message = 'OTP verified successfully';
        }
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'OTP verification failed';
      })

      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = null;
        state.message = 'Logged out successfully';
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.message = 'Logged out';
      })
      
      // Fetch profile cases
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload === 'No authentication token') {
          state.isAuthenticated = false;
          state.token = null;
          state.refreshToken = null;
        } else {
          state.error = action.payload || 'Failed to fetch profile';
        }
      })

      // Forgot password cases
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.passwordResetRequested = true;
        state.message = 'Password reset instructions sent to your email';
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Password reset request failed';
      })

      // Reset password cases
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.passwordResetComplete = true;
        state.message = 'Password reset successful';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Password reset failed';
      })

      // Refresh token cases
      .addCase(refreshAuthToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(refreshAuthToken.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      });
  },
});

// Export actions
export const { clearError, clearMessage, setCredentials, resetAuthState } = authSlice.actions;

// Export selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthMessage = (state) => state.auth.message;
export const selectOtpRequested = (state) => state.auth.otpRequested;
export const selectOtpVerified = (state) => state.auth.otpVerified;
export const selectPasswordResetRequested = (state) => state.auth.passwordResetRequested;
export const selectPasswordResetComplete = (state) => state.auth.passwordResetComplete;

// Export reducer
export default authSlice.reducer;