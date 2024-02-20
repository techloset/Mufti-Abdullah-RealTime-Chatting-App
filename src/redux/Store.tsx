import {configureStore} from '@reduxjs/toolkit';
import userReducer, {UserState} from './UserSlice';
import AuthSlice from './AuthSlice';

export type RootState = {
  user: UserState;
  auth: ReturnType<typeof AuthSlice>;
};

const Store = configureStore({
  reducer: {
    user: userReducer,
    auth: AuthSlice,
  },
});

export default Store;
