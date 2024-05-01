import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors/color';
import {FONTS} from '../../constants/fonts/font';

export const styles = StyleSheet.create({
  MainView: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
  },
  InnerView: {
    paddingTop: 6,
    minWidth: 120,
    maxWidth: 180,
    display: 'flex',
    flexDirection: 'row',
  },
  Profile: {
    borderRadius: 26,
    height: 52,
    width: 52,
  },
  TextView: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 6,
    marginLeft: 12,
  },
  Name: {
    color: COLORS.DARKBLACK,
    fontFamily: FONTS.REGULAR,
    fontWeight: '500',
    padding: 2,
    fontSize: 18,
    lineHeight: 20,
  },
  Description: {
    color: COLORS.STATUS,
    padding: 2,
    fontSize: 12,
    lineHeight: 12,
  },
});
