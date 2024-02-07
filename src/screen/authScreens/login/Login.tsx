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
import {RootStackParamsList} from '../../../navigation/StackNavigation';
import {useAuthContext} from '../../../context/AuthContext';
import {FirebaseUser, UserProfileData} from '../../../constants/Types';
import {styles} from './LoginStyle';
// import ToastManager, {Toast} from 'toastify-react-native';
interface SignupScreenProps {
  navigation?: StackNavigationProp<RootStackParamsList, 'forgot'>;
}

export default function Login({navigation}: SignupScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {dispatch} = useAuthContext();

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user: FirebaseUser | null = userCredential.user;
        console.log('user', user);
        if (user) {
          // Handle the case where user.email might be null or undefined
          const userEmail: string | undefined = user.email || undefined;

          const userData: UserProfileData = {
            email: userEmail,
            // Include other properties from User or customize as needed
          };

          dispatch({type: 'Login', payload: {userData}});
          navigation?.navigate('auth');
          // Navigate to the desired screen or perform other actions
        }
      })
      .catch(error => {
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
