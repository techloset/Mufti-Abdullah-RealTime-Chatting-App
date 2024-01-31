import React, {useState} from 'react';
// import Icon from "../../assets/icons/Google.png"
// import icon from "../../assets/background.png"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
export default function Forgot() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.main}>Forget Password</Text>
      <Text style={styles.des}>
      Forgot your password? Don’t worry, we’ll send you a magic link right at your inbox!     </Text>

      <View style={styles.inputView}>
        <Text style={styles.lable}>Your Email</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={email => setEmail(email)}
        />
      </View>
   
      <TouchableOpacity >
      <ImageBackground style={styles.loginBtn} source={require('../../../assets/images/background.png')}>
        <Text style={styles.loginBtnText}>Create an account</Text>
        </ImageBackground>  
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputView: {
    borderRadius: 20,
    width: 331,

    height: 58,
    // marginBottom: 90,
  },
  TextInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#CDD1D0',
    color: 'black',
  },
  lable: {
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    color: '#3D4A7A',
  },
  loginBtn: {
    width: 327,
    borderRadius: 25,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 350,
    backgroundColor: 'transparent',
  }, 
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '700',
    fontFamily: 'Poppins',
  },
  main: {
    width: 160,
    height: 18,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 18,
    color: '#3D4A7A',
    marginBottom: 15,
    marginTop:80
  },
  des: {
    width: 293,
    height: 40,
    textAlign: 'center',
    fontWeight: '300',
    lineHeight: 20,
    fontSize: 14,
    color: '#797C7B',
    fontFamily: 'Poppins',
    marginBottom:60
  },
  
});
