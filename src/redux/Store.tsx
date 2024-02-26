import {configureStore} from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';

export type RootState = {
  auth: ReturnType<typeof AuthSlice>;
};

const Store = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});

export default Store;
