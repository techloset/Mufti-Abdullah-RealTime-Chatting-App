import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/colors/Color';

export const SettingStyles = StyleSheet.create({
  nouch: {
    width: 30,
    height: 3,
    marginBottom: 24,
    backgroundColor: COLORS.NOCH,
    alignSelf: 'center',
  },
  line: {
    height: 0.1,
    width: 375,
    backgroundColor: COLORS.NOCH,
    marginVertical: 10,
    borderWidth: 1,
  },
  main: {marginLeft: 24, marginTop: 2, marginBottom: 20},
  user: {marginLeft: 24, marginBottom: 16},
});
