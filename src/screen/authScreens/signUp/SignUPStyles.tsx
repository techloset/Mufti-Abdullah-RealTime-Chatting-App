import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
    color: '#000E08',
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
    marginTop: 20,
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
    marginBottom: 50,
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
