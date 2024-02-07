import {StackNavigationProp} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { RootStackParamsList } from '../../../navigation/StackNavigation';
import { useAuthContext } from '../../../context/AuthContext';
import { FirebaseUser, UserProfileData } from '../../../constants/Types';
// import ToastManager, {Toast} from 'toastify-react-native';
interface SignupScreenProps {
  navigation?: StackNavigationProp<RootStackParamsList, 'forgot'>;
}

export default function Login({navigation}: SignupScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useAuthContext();

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user: FirebaseUser | null = userCredential.user;
        console.log('user', user)
        if (user) {
          // Handle the case where user.email might be null or undefined
          const userEmail: string | undefined = user.email || undefined;
  
          const userData: UserProfileData = {
            email: userEmail,
            // Include other properties from User or customize as needed
          };
  
          dispatch({ type: 'Login', payload: { userData } });
          navigation?.navigate('auth');
          // Navigate to the desired screen or perform other actions
        }
      })
      .catch((error) => {
        // Handle login errors
        console.error(error);
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
            onChangeText={email => setEmail(email)}
            value={email}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.lable}>Password</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="Password."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
            value={password}
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
    marginBottom: 40,
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
  forgot_button: {
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    color: '#3D4A7A',
    top: 20,
  },
  loginBtn: {
    width: 327,
    borderRadius: 25,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
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
    marginBottom: 5,
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
  },
  img: {
    height: 48,
    width: 48,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 15,
    justifyContent: 'center',
  },
});
