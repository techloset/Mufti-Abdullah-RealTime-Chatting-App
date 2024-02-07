import React, {useState} from 'react';
// import Icon from "../../assets/icons/Google.png"
// import icon from "../../assets/background.png"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {styles} from './ForgotStyle';
export default function Forgot() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
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

      <TouchableOpacity>
        <ImageBackground
          style={styles.loginBtn}
          source={require('../../../assets/images/background.png')}>
          <Text style={styles.loginBtnText}>Create an account</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}
