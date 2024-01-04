// store.js

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import reducers and create a root reducer
import authReducer from './redux/reducers/authReducers' // Replace with your auth reducer

const rootReducer = combineReducers({
  auth: authReducer, // Replace 'auth' with your reducer name
  // Other reducers if you have them
});

// Configure persistence for the root reducer
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  // Add middleware, dev tools, etc. if needed
});

export const persistor = persistStore(store);
