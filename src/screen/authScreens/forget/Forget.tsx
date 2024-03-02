import {
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {styles} from './ForgotStyle';
import useForget from './useForget';
import {COLORS} from '../../../constants/colors/Color';
export default function Forgot() {
  const {handleSubmit, setEmail, loading} = useForget();
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.main}>Forget Password</Text>
        <Text style={styles.des}>
          Forgot your password? Don’t worry, we’ll send you a magic link right
          at your inbox!{' '}
        </Text>

        <View style={styles.inputView}>
          <Text style={styles.lable}>Your Email</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="Email."
            placeholderTextColor="#003f5c"
            onChangeText={email => setEmail(email)}
          />
        </View>

        <TouchableOpacity onPress={handleSubmit}>
          <ImageBackground
            style={styles.loginBtn}
            source={require('../../../assets/images/background.png')}>
            {loading ? (
              <ActivityIndicator size="large" color={COLORS.WHITE} />
            ) : (
              <Text style={styles.loginBtnText}>Forgot Password</Text>
            )}
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
