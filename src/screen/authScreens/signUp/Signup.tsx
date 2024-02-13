import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {styles} from './SignUPStyles';
import {useAuthContext} from '../../../context/AuthContext';
import {Toast} from 'toastify-react-native';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
type UserData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  uid?: string;
  photoURL?: string | null;
  creationTime?: string;
  status?: string;
};
export default function SignUp() {
  const {dispatch} = useAuthContext();
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
      return console.log(
        'plz Enter Username',
        'username length minimum 3 character ',
        'error',
      );
    }
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
    if (confirmPassword != password) {
      return console.log(
        'Enter Confirm Password',
        'Password Not match',
        'error',
      );
    }
    let userData: UserData = {username, email, password, confirmPassword};
    setisloading(true);
    createUser(userData);
    setState(initialState);
    setisloading(false);
  };

  const createUser = (userData: UserData): void => {
    auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(userCredential => {
        // User account created & signed in!
        const user = userCredential.user;

        // Generate a UID for the user
        userData.uid = user.uid;
        userData.photoURL = user.photoURL;
        userData.creationTime = user.metadata.creationTime;
        userData.status = 'active';
        // Set user data in Firestore using the generated UID
        firestore()
          .collection('users')
          .doc(userData.uid)
          .set(userData)
          .then(() => {
            // dispatch({type: 'Login', payload: {userData}});
            console.log('Success', 'User SignUp Successfully', 'success');
            setisloading(false);
          })
          .catch((error: any) => {
            console.error('Error adding user data to Firestore: ', error);
          });
      })

      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setisloading(false);
          return console.log(
            'Email Error',
            'That email address is already register!',
            'error',
          );
        }

        if (error.code === 'auth/invalid-email') {
          setisloading(false);
          return console.log('Email|Password Error', 'plz try again', 'error');
        }
        setisloading(false);
        return console.log('Email|Password Error', 'plz try again', 'error');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.main}>Sign up with Email</Text>
      <Text style={styles.des}>
        Get chatting with friends and family today by signing up for our chat
        app!
      </Text>
      <View style={styles.inputView}>
        <Text style={styles.lable}>Your Name</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Your Name."
          placeholderTextColor="#003f5c"
          value={state.username}
          onChangeText={(value: string) => handleChange('username', value)}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.lable}>Email</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          value={state.email}
          onChangeText={(value: string) => handleChange('email', value)}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.lable}>Password</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={state.password}
          onChangeText={(value: string) => handleChange('password', value)}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.lable}>Confirm Password</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={state.confirmPassword}
          onChangeText={(value: string) =>
            handleChange('confirmPassword', value)
          }
        />
      </View>
      <TouchableOpacity onPress={handleRegister}>
        <ImageBackground
          style={styles.loginBtn}
          source={require('../../../assets/images/background.png')}>
          <Text style={styles.loginBtnText}>Create Account</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}
