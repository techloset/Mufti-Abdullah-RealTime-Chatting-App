import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {styles} from './signupStyles';
import useSignup from './useSignup';
import Loader from '../../components/loader/Loader';
export default function SignUp() {
  const {loading, state, handleChange, handleRegister} = useSignup();
  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Text style={styles.main}>Sign up with Email</Text>
          <Text style={styles.des}>
            Get chatting with friends and family today by signing up for our
            chat app!
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
              source={require('../../assets/images/background.png')}>
              <Text style={styles.loginBtnText}>Create Account</Text>
            </ImageBackground>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
