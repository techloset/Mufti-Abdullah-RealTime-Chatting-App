import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {SigninUserData, usersData} from '../../constants/types/Types';
import {login} from '../../store/slices/authSlice';
import {useAppDispatch} from '../../store/store';
import {ShowToast} from '../../components/showToast/ShowToast';
import {signInUser} from '../../store/slices/userSlice';

const initialState = {email: '', password: ''};
export default function useLogin() {
  const [state, setState] = useState(initialState);
  const [loading, setisloading] = useState(false);
  const dispatch = useAppDispatch();
  const handleChange = (name: string, value: string): void => {
    setState(s => ({...s, [name]: value}));
  };
  const handleLogin = async () => {
    const {email, password} = state;
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email) {
      ShowToast('danger', 'plz Enter Email');
      console.log('plz Enter Email', ' formate like: abc@gmail.com', 'error');
      return;
    }
    if (!validRegex.test(email)) {
      ShowToast(
        'danger',
        'Invalid Email Format formate like: abc@gmail.complz Enter Email',
      );

      console.log(
        'Invalid Email Format',
        ' formate like: abc@gmail.com',
        'error',
      );
      return;
    }

    if (password.length < 8) {
      ShowToast('danger', 'Password length minimum 8 character');

      console.log(
        'Invalid Password',
        'Password length minimum 6 character',
        'error',
      );
      return;
    }
    let userData = {email, password};
    setisloading(true);
    await dispatch(signInUser(userData) as any);
    setState(initialState);
    setisloading(false);
  };

  return {handleLogin, loading, handleChange, state, setState};
}
