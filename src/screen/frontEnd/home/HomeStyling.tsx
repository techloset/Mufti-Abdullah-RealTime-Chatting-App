import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/colors/Color';

export const HomeStyles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
  },
  textContainer: {
    flex: 1,
    paddingStart: 12,
  },
  textContainer1: {
    flex: 1,
  },
  nouch: {
    width: 30,
    height: 3,
    marginBottom: 24,
    backgroundColor: COLORS.NOCH,
    alignSelf: 'center',
  },
});
