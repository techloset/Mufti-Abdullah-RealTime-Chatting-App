import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import ToastManager, {Toast} from 'toastify-react-native';

import {
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import {styles} from './ForgotStyle';
export default function Forgot() {
  const [email, setEmail] = useState('');
  const handleSubmit = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        // Toast.success('Check Email For reset Password');
        console.log('link sent successfully');
        setEmail('');
      })
      .catch(error => {
        // Toast.show({
        //   type: 'error',
        //   text1: 'server error',
        // });
        console.log('server error');
        console.error(error);
        // Toast.error;
      });
  };
  return (
    <View style={styles.container}>
      {/* <ToastManager /> */}
      <Text style={styles.main}>Forget Password</Text>
      <Text style={styles.des}>
        Forgot your password? Don’t worry, we’ll send you a magic link right at
        your inbox!{' '}
      </Text>

      <View style={styles.inputView}>
        <Text style={styles.lable}>Your Email</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={email => setEmail(email)}
        />
      </View>

      <TouchableOpacity onPress={handleSubmit}>
        <ImageBackground
          style={styles.loginBtn}
          source={require('../../../assets/images/background.png')}>
          <Text style={styles.loginBtnText}>Create an account</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}
