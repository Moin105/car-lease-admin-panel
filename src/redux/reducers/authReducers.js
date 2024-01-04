// reducers/authReducer.js

import { createReducer } from '@reduxjs/toolkit';

// Initial state for auth reducer
const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

// Reducer function to handle actions
const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('auth/loginSuccess', (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.token = action.payload.token;
    })
    // Add other cases using 'builder.addCase' as needed
    // For example:
    // .addCase('auth/logout', (state, action) => {
    //   state.isLoggedIn = false;
    //   state.user = null;
    //   state.token = null;
    // })
    // .addCase('auth/someOtherAction', (state, action) => {
    //   // Handle other actions
    // })
    ;
});

export default authReducer;
