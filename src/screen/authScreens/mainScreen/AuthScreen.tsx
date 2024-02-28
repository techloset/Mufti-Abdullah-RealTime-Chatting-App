import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Button,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RootStackParamsList} from '../../../navigation/AuthStackNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import {useAuthContext} from '../../../context/AuthContext';
import {UserProfileData} from '../../../constants/Types';
import {FONTS} from '../../../constants/fonts/Font';
import {styles} from './Style';
import {useDispatch} from 'react-redux';
import {login} from '../../../redux/AuthSlice';
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
GoogleSignin.configure({
  webClientId:
    '880655244940-tggqp0tccp4liuaj3r69m97hr9ljllds.apps.googleusercontent.com',
  scopes: ['profile', 'email'], // what API you want to access on behalf of the user, default is email and profile
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  openIdRealm: '',
  profileImageSize: 120,
});

interface LoginProps {
  navigation: StackNavigationProp<RootStackParamsList, 'LOGIN', 'SIGNUP'>;
}

export default function AuthScreen({navigation}: LoginProps) {
  // const {dispatch} = useAuthContext();
  const dispatch = useDispatch();
  const LoginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );

      console.log('🚀 ~ LoginWithGoogle ~ userCredential:', userCredential);
      const userData = {
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        photoURL: userCredential.user.photoURL,
        uid: userCredential.user.uid,
        creationTime: userCredential.user.metadata.creationTime,
      };

      // Ensure the user is signed in before accessing their UID

      // Set user data in Firestore
      await firestore().collection('users').doc(userCredential.user.uid).set({
        username: userData.displayName,
        email: userData.email,
        uid: userData.uid,
        password: '',
        confirmPassword: '',
        photoURL: userData.photoURL,
        creationTime: userData.creationTime,
        status: 'Active',
      });
      dispatch(login(userData as any));
      console.log('Success', 'User SignUp Successfully', 'success');
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };
  return (
    <>
      <LinearGradient
        colors={['#43116A', '#68E1FD']}
        start={{x: 2, y: 5}}
        end={{x: 8, y: 11}}
        style={styles.container}>
        <View style={styles.container}>
          <ImageBackground
            source={require('../../../assets/images/Ellipse 1226.png')}
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
                <Image source={require('../../../assets/icons/Google.png')} />
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
              <Text>Sign up with mail</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LOGIN');
              }}>
              <Text style={styles.forgot_button}>
                Existing account? <Text style={styles.login}> Log in</Text>
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </LinearGradient>
    </>
  );
}
