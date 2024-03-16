import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {SigninUserData, usersData} from '../../../constants/types/Types';
import {login} from '../../../store/slices/AuthSlice';
import {useAppDispatch} from '../../../store/store';
import {ShowToast} from '../../../components/toast/ShowToast';

const initialState = {email: '', password: ''};
export default function useLogin() {
  const [state, setState] = useState(initialState);
  const [loading, setisloading] = useState(false);
  const dispatch = useAppDispatch();
  const handleChange = (name: string, value: string): void => {
    setState(s => ({...s, [name]: value}));
  };
  const handleLogin = () => {
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
    loginUser(userData);

    setState(initialState);
  };
  const loginUser = (userData: SigninUserData): void => {
    auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then(userCredential => {
        const user = userCredential.user;
        if (user) {
          console.log('User Login Successfully!', 'Welcome to TEXTit Chat app');
          ShowToast('sucess', 'Yor are Login Sucessfully ,WellCome');
          dispatch(login(user));
          setisloading(false);
        }
      })
      .catch(error => {
        setisloading(false);
        if (error.code === 'auth/email-already-in-use') {
          ShowToast('danger', 'That email address is already registered!');

          return console.log(
            'Email Error',
            'That email address is already registered!',
            'error',
          );
        }
        if (error.code === 'auth/invalid-email') {
          ShowToast('danger', 'Email|Password Error');

          console.log('Email|Password Error', 'Please try again', 'error');
          return;
        }
        return console.log('Email|Password Error', 'Please try again', 'error');
      });
  };
  return {handleLogin, loading, handleChange, state, setState};
}
