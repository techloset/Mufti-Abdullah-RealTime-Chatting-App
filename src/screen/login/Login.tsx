import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {RootStackParamsList} from '../../navigation/AuthStackNavigation';
import {styles} from './LoginStyle';

import useLogin from './useLogin';
import Loader from '../../components/loader/Loader';
import {COLORS} from '../../constants/colors/Color';
interface SignupScreenProps {
  navigation?: StackNavigationProp<RootStackParamsList, 'LOGIN'>;
}

export default function Login({navigation}: SignupScreenProps) {
  const {handleLogin, loading, handleChange, state} = useLogin();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <Text style={styles.main}>Log in to Chatbox</Text>
          <Text style={styles.des}>
            Welcome back! Sign in using your social account or email to continue
            us
          </Text>
          <View style={styles.img}>
            <Image source={require('../../assets/icons/Google.png')} />
          </View>
          <View style={styles.bellowGoogle}>
            <View style={styles.view2nd} />
            <View>
              <Text style={styles.orLeft}>OR</Text>
            </View>
            <View style={styles.orRight} />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.lable}>Email</Text>
            <TextInput
              style={styles.TextInput}
              placeholder="Email."
              placeholderTextColor={COLORS.PLACEHOLDER}
              value={state.email}
              onChangeText={(value: string) => handleChange('email', value)}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.lable}>Password</Text>
            <TextInput
              style={styles.TextInput}
              placeholder="Password."
              placeholderTextColor={COLORS.PLACEHOLDER}
              secureTextEntry={true}
              value={state.password}
              onChangeText={(value: string) => handleChange('password', value)}
            />
          </View>
          <TouchableOpacity onPress={handleLogin}>
            <ImageBackground
              style={styles.loginBtn}
              source={require('../../assets/images/background.png')}>
              <Text style={styles.loginBtnText}>LOGIN</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('Navigating to forgot screen');
              navigation?.navigate('FORGOT_PASSWORD');
            }}>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
