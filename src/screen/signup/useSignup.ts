import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {login} from '../../store/slices/AuthSlice';
import {SignupUser} from '../../constants/types/Types';
import {ShowToast} from '../../components/toast/ShowToast';
import {FIREBASE_COLLECTIONS} from '../../constants/firebaseCollections/FirebaseCollectoin';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function useSignup() {
  const dispatch = useDispatch();
  const [loading, setisloading] = useState(false);
  const [state, setState] = useState(initialState);

  const handleChange = (name: string, value: string): void => {
    setState(s => ({...s, [name]: value}));
  };
  const handleRegister = () => {
    const {username, email, password, confirmPassword} = state;
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (username.length < 3) {
      console.log(
        'plz Enter Username',
        'username length minimum 3 character ',
        'error',
      );
      return ShowToast(
        'danger',
        'plz Enter Username username length minimum 3 character ',
      );
    }
    if (!email) {
      console.log('plz Enter Email', ' formate like: abc@gmail.com', 'error');
      return ShowToast('danger', 'plz Enter Email ');
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
    if (confirmPassword != password) {
      return console.log(
        'Enter Confirm Password',
        'Password Not match',
        'error',
      );
    }
    let userData: SignupUser = {username, email, password, confirmPassword};
    setisloading(true);
    createUser(userData);
    setState(initialState);
    setisloading(false);
  };

  const createUser = (userData: SignupUser): void => {
    auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(userCredential => {
        const user = userCredential.user;

        userData.uid = user.uid;
        userData.photoURL = user.photoURL;
        userData.creationTime = user.metadata.creationTime;
        userData.status = 'active';
        userData.lastSeen = new Date().toLocaleTimeString();

        firestore()
          .collection(FIREBASE_COLLECTIONS.USER)
          .doc(userData.uid)
          .set(userData)
          .then(() => {
            console.log('Success', 'User SignUp Successfully', 'success');
            ShowToast('sucess', 'User Signup Sucessfully');
            dispatch(login(user));
            setisloading(false);
          })
          .catch((error: any) => {
            console.error('Error adding user data to Firestore: ', error);
          });
      })

      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setisloading(false);
          console.log(
            'Email Error',
            'That email address is already register!',
            'error',
          );
          return ShowToast('danger', 'That email address is already register!');
        }

        if (error.code === 'auth/invalid-email') {
          setisloading(false);
          return console.log('Email|Password Error', 'plz try again', 'error');
        }
        setisloading(false);
        return console.log('Email|Password Error', 'plz try again', 'error');
      });
  };
  return {loading, state, setState, handleChange, handleRegister};
}
