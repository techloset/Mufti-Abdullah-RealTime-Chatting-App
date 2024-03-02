import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {SigninUserData, usersData} from '../../../constants/Types';
import {login} from '../../../store/slices/AuthSlice';
import {useAppDispatch} from '../../../store/Store';
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
      return console.log(
        'plz Enter Email',
        ' formate like: abc@gmail.com',
        'error',
      );
    }
    if (!validRegex.test(email)) {
      return console.log(
        'Invalid Email Format',
        ' formate like: abc@gmail.com',
        'error',
      );
    }

    if (password.length < 6) {
      return console.log(
        'Invalid Password',
        'Password length minimum 6 character',
        'error',
      );
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
          return console.log(
            'Email Error',
            'That email address is already registered!',
            'error',
          );
        }
        if (error.code === 'auth/invalid-email') {
          return console.log(
            'Email|Password Error',
            'Please try again',
            'error',
          );
        }
        return console.log('Email|Password Error', 'Please try again', 'error');
      });
  };
  return {handleLogin, loading, handleChange, state, setState};
}
