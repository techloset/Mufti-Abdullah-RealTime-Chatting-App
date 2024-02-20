import {StackNavigationProp} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import ToastManager, {Toast} from 'toastify-react-native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {RootStackParamsList} from '../../../navigation/StackNavigation';
import {useAuthContext} from '../../../context/AuthContext';
import {FirebaseUser, UserProfileData} from '../../../constants/Types';
import {styles} from './LoginStyle';
import {useDispatch, useSelector} from 'react-redux';
import {login, readUserProfile} from '../../../redux/AuthSlice';
// import ToastManager, {Toast} from 'toastify-react-native';
interface SignupScreenProps {
  navigation?: StackNavigationProp<RootStackParamsList, 'forgot'>;
}

type SigninUserData = {
  email: string;
  password: string;
};
const initialState = {email: '', password: ''};
export default function Login({navigation}: SignupScreenProps) {
  const [state, setState] = useState(initialState);
  const [loading, setisloading] = useState(false);
  // const {dispatch} = useAuthContext();
  const dispatch = useDispatch();
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
      .then(() => {
        dispatch(login(userData));

        console.log('User Login Successfully!', 'WEllCOME to TEXTit Chat app');
        setisloading(false);
        // dispatch({type: 'Login', payload: {userData: userData}});
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
    <>
      <View style={styles.container}>
        {/* <ToastManager /> */}
        <Text style={styles.main}>Log in to Chatbox</Text>
        <Text style={styles.des}>
          Welcome back! Sign in using your social account or email to continue
          us
        </Text>
        <View style={styles.img}>
          <Image source={require('../../../assets/icons/Google.png')} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 332,
            height: 14,
            marginBottom: 30,
          }}>
          <View
            style={{flex: 1, width: 132, height: 1, backgroundColor: '#CDD1D0'}}
          />
          <View>
            <Text
              style={{
                color: '#797C7B',
                fontWeight: '900',
                fontSize: 14,
                lineHeight: 14,
                textAlign: 'center',
                marginLeft: 10,
                marginRight: 10,
              }}>
              OR
            </Text>
          </View>
          <View
            style={{flex: 1, width: 132, height: 1, backgroundColor: '#CDD1D0'}}
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
        <TouchableOpacity onPress={handleLogin}>
          <ImageBackground
            style={styles.loginBtn}
            source={require('../../../assets/images/background.png')}>
            <Text style={styles.loginBtnText}>LOGIN</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('Navigating to forgot screen');
            navigation?.navigate('forgot');
          }}>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
