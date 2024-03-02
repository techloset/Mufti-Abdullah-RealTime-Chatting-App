import {configureStore} from '@reduxjs/toolkit';
import AuthSlice from './slices/AuthSlice';
import UserSlice from './slices/UserSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const Store = configureStore({
  reducer: {
    users: UserSlice,
    auth: AuthSlice,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default Store;
