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
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamsList } from '../../../navigation/StackNavigation';
import { StackNavigationProp } from '@react-navigation/stack';

interface LoginProps{
  navigation:StackNavigationProp<RootStackParamsList,"login","signup">
}

export default function AuthScreen({navigation}:LoginProps) {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
    <LinearGradient
    colors={['#43116A', '#68E1FD']}
    start={{ x: 2, y: 5 }}
    end={{ x: 8, y: 11 }}
    style={styles.container}
  >
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/Ellipse 1226.png')}
        style={styles.container}>
        <Text style={styles.main}>Connect friends easily & quickly</Text>
        <Text style={styles.des}>
          Our chat app is the perfect way to stay connected with friends and
          family.{' '}
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
                color: 'white',
                fontWeight: '900',
                fontSize: 14,
                lineHeight: 14,
                textAlign: 'center',
                marginLeft: 10,
                marginRight: 10,
                fontFamily:"Poppins-SemiBold"
              }}>
              OR
            </Text>
          </View>
          <View
            style={{flex: 1, width: 132, height: 1, backgroundColor: '#CDD1D0'}}
          />
        </View>

        <TouchableOpacity style={styles.loginBtnText} onPress={()=>{navigation.navigate("signup")}}>
          <Text>Sign up with mail</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate("login")}}>
          <Text style={styles.forgot_button}>Existing account? <Text style={{color:"#FFFFFF"}} > Log in</Text></Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
      </LinearGradient>
      </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      'linear-gradient(271.23deg, #43116A 36.61%, #68E1FD 106.23%)',
    alignItems: 'center',
    justifyContent: 'center',
    height: 1040,
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
    marginBottom: 70,
  },

  loginBtnText: {
    width: 327,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    borderRadius: 25,
    height: 48,
    lineHeight: 16,
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.37)',
    marginBottom: 40,

  },
  main: {
    marginTop:20,
    marginLeft:25,
    width: 338,
    flex: 1,
    height: 312,
    fontWeight: '700',
    fontSize: 68,
    lineHeight: 78,
    color: 'rgba(255, 255, 255, 1)',
  },
  des: {
    width: 293,
    height: 52,
    textAlign: 'center',
    fontWeight: '300',
    lineHeight: 26,
    fontSize: 16,
    color: '#797C7B',
    fontFamily: 'Poppins',
    marginBottom:10
  },
  img: {
    height: 48,
    width: 48,
    marginTop: 20,
    marginBottom: 30,
    justifyContent: 'center',
    alignContent:"center",
    alignItems:"center",
    backgroundColor:"#797C7B",
    borderRadius:25
  },
});
