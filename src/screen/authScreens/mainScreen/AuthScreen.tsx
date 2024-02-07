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
import {RootStackParamsList} from '../../../navigation/StackNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useAuthContext} from '../../../context/AuthContext';
import {UserProfileData} from '../../../constants/Types';
import {FONTS} from '../../../constants/fonts/Font';
import {styles} from './Style';

GoogleSignin.configure({
  webClientId:
    '113924888324-hlb4v8i80cckco84qhlrtg49apu8at8m.apps.googleusercontent.com',
  scopes: ['profile', 'email'], // what API you want to access on behalf of the user, default is email and profile
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120p
});

interface LoginProps {
  navigation: StackNavigationProp<RootStackParamsList, 'login', 'signup'>;
}

export default function AuthScreen({navigation}: LoginProps) {
  const {dispatch} = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const LoginWithGoogle = async () => {
    try {
      // Check for Google Play Services
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      // Initiate Google sign-in
      const {idToken} = await GoogleSignin.signIn();

      // Create Google credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in with the credential
      const googleLoginUser: UserProfileData = {
        // Include other properties from User or customize as needed
      };
      dispatch({type: 'Login', payload: {userData: googleLoginUser}});
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      // Handle the error appropriately, e.g., display an error message to the user
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
              family.{' '}
            </Text>
            <TouchableOpacity onPress={LoginWithGoogle}>
              <View style={styles.img}>
                <Image source={require('../../../assets/icons/Google.png')} />
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 332,
                height: 14,
                marginBottom: 30,
              }}>
              <View
                style={{
                  flex: 1,
                  width: 132,
                  height: 1,
                  backgroundColor: '#CDD1D0',
                }}
              />
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '900',
                    fontSize: 14,
                    lineHeight: 14,
                    textAlign: 'center',
                    marginLeft: 10,
                    marginRight: 10,
                    fontFamily: FONTS.BOLD,
                  }}>
                  OR
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  width: 132,
                  height: 1,
                  backgroundColor: '#CDD1D0',
                }}
              />
            </View>

            <TouchableOpacity
              style={styles.loginBtnText}
              onPress={() => {
                navigation.navigate('signup');
              }}>
              <Text>Sign up with mail</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('login');
              }}>
              <Text style={styles.forgot_button}>
                Existing account?{' '}
                <Text style={{color: '#FFFFFF'}}> Log in</Text>
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </LinearGradient>
    </>
  );
}
