import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors/Color';

export const styles = StyleSheet.create({
  TextView: {
    marginHorizontal: 24,
    marginVertical: 20,
  },
  TextHeading: {
    color: COLORS.BLACK,
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 24,
  },
  LettersView: {
    marginHorizontal: 24,
    marginVertical: 20,
    width: 185,
  },
  LetterText: {
    color: COLORS.BLACK,
    marginBottom: 10,
    fontWeight: '700',
  },
  nouch: {
    width: 30,
    height: 3,
    marginBottom: 24,
    backgroundColor: COLORS.NOCH,
    alignSelf: 'center',
  },
});
