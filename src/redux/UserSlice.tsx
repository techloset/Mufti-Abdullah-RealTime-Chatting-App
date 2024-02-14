import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Dispatch} from 'redux';
import {RootState} from './store'; // Assuming you have a RootState type defined in your Redux store configuration
import firestore from '@react-native-firebase/firestore';

// Define types for user and error
interface User {
  // Define the structure of your user object
  // For example:
  id: string;
  name: string;
  // Add other properties as needed
}

type ErrorType = string | null;

export interface UserState {
  users: User[];
  loading: boolean;
  error: ErrorType;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsersRequest: state => {
      state.loading = true;
    },
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure} =
  userSlice.actions;

export const fetchAllUsers = () => async (dispatch: Dispatch) => {
  dispatch(fetchUsersRequest());
  try {
    const usersSnapshot = await firestore().collection('users').get();
    const usersData = usersSnapshot.docs.map(doc => {
      return {id: doc.id, ...doc.data()} as User;
    });
    dispatch(fetchUsersSuccess(usersData));
  } catch (error: any) {
    console.error('Error fetching users:', error);
    dispatch(fetchUsersFailure(error.message));
  }
};

export const selectAllUsers = (state: RootState) => state.user.users;

export default userSlice.reducer;
