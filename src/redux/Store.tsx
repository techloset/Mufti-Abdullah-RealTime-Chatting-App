import {configureStore} from '@reduxjs/toolkit';
import userReducer, {UserState} from './UserSlice';

// Define RootState type
export type RootState = {
  user: UserState;
  // Add other slice states here if needed
};

const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers here if needed
  },
});

export default store;
