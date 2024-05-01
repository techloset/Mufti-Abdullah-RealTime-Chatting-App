import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {RootStackParamsList} from '../../navigation/authStackNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {styles} from './authScreenStyle';
import UseAuthScreen from './useAuthScreen';
interface LoginProps {
  navigation: StackNavigationProp<RootStackParamsList, 'LOGIN', 'SIGNUP'>;
}

export default function AuthScreen({navigation}: LoginProps) {
  const {LoginWithGoogle} = UseAuthScreen();
  return (
    <>
      <ImageBackground
        source={require('../../assets/images/a0b7afd36c9b9128fdc5ae0e32bdfd6c.png')}
        style={styles.container}>
        <View style={styles.container}>
          <ImageBackground
            source={require('../../assets/images/Ellipse 1226.png')}
            style={styles.container}>
            <Text style={styles.mainHeading}>
              Connect friends easily & quickly
            </Text>
            <Text style={styles.description}>
              Our chat app is the perfect way to stay connected with friends and
              family.
            </Text>
            <TouchableOpacity onPress={LoginWithGoogle}>
              <View style={styles.img}>
                <Image source={require('../../assets/icons/Google.png')} />
              </View>
            </TouchableOpacity>
            <View style={styles.orMainView}>
              <View style={styles.orFirstView} />
              <View>
                <Text style={styles.orText}>OR</Text>
              </View>
              <View style={styles.orSecondView} />
            </View>

            <TouchableOpacity
              style={styles.loginBtnText}
              onPress={() => {
                navigation.navigate('SIGNUP');
              }}>
              <Text style={styles.signupText}>Sign up with mail</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LOGIN');
              }}>
              <Text style={styles.login_button}>
                Existing account? <Text style={styles.login}> Log in</Text>
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </ImageBackground>
    </>
  );
}
