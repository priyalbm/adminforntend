import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { combineReducers } from 'redux';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// Import reducers
import authReducer from './authSlice';
import usersReducer from './usersSlice';
import planReducer from './planSlice';
import subscriptionReducer from './subscriptionSlice';
import botReducer from "./botSlice";
import ticketReducer from "./supportSlice";
import notificationReducer from "./notificationSlice";
import logReducer from "./logSlice";
import dashboardReducer from "./dashboardSlice";


// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist auth state
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  plans: planReducer,
  subscriptions: subscriptionReducer,
  bots: botReducer,
  support: ticketReducer,
  notification: notificationReducer,
  logs: logReducer,
  dashboard: dashboardReducer,


});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions in serializable check
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'auth/login', 'auth/register'],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

// Create persistor
export const persistor = persistStore(store);

export default store;