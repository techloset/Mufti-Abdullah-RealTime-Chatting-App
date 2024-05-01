import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors/color';

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
  hiddenItem: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    marginHorizontal: 10,
    paddingTop: 13,
    paddingHorizontal: 5,
    gap: 6,
  },
});
