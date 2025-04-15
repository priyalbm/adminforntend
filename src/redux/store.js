import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from './usersSlice';
import planReducer from './planSlice';
import subscriptionReducer from './subscriptionSlice';
import botReducer from "./botSlice"
import ticketReducer from "./supportSlice"
import notificationReducer from "./notificationSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    plans: planReducer,
    subscriptions: subscriptionReducer,
    bots: botReducer,
    support: ticketReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/login', 'auth/register'],
      },
    }),
  devTools: process.env.NODE_ENV === 'development', 
});

export default store;
