import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors/Color';
import {FONTS} from '../../constants/fonts/Font';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: FONTS.REGULAR,
  },

  inputView: {
    borderRadius: 20,
    width: 331,
    height: 58,
  },
  TextInput: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT,
    color: COLORS.BLACK,
  },
  lable: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '500',
    color: COLORS.LABLE,
  },
  loginBtn: {
    width: 327,
    borderRadius: 25,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 320,
    backgroundColor: 'transparent',
  },
  loginBtnText: {
    color: COLORS.WHITE,
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '700',
    fontFamily: FONTS.REGULAR,
  },
  main: {
    width: 160,
    height: 18,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 18,
    color: COLORS.LABLE,
    marginBottom: 15,
    marginTop: 80,
  },
  des: {
    width: 293,
    height: 40,
    textAlign: 'center',
    fontWeight: '300',
    lineHeight: 20,
    fontSize: 14,
    color: '#797C7B',
    fontFamily: FONTS.REGULAR,
    marginBottom: 60,
  },
});
