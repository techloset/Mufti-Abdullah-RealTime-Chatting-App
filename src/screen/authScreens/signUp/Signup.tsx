import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {styles} from './SignUPStyles';
export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.main}>Sign up with Email</Text>
      <Text style={styles.des}>
        Get chatting with friends and family today by signing up for our chat
        app!
      </Text>
      <View style={styles.inputView}>
        <Text style={styles.lable}>Your Name</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Your Name."
          placeholderTextColor="#003f5c"
          onChangeText={userName => setEmail(userName)}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.lable}>Email</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={email => setEmail(email)}
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
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.lable}>Confirm Password</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>
      <TouchableOpacity>
        <ImageBackground
          style={styles.loginBtn}
          source={require('../../../assets/images/background.png')}>
          <Text style={styles.loginBtnText}>Create Account</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}
