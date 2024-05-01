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
    width: 229,
    display: 'flex',
    flexDirection: 'row',
  },
  Profile: {
    borderRadius: 22,
    height: 52,
    width: 52,
  },
  TextView: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 6,
    marginLeft: 4,
  },
  Name: {
    color: COLORS.DARKBLACK,
    fontFamily: FONTS.MEDIUM,
    padding: 2,
    fontSize: 16,
    lineHeight: 16,
  },
  Description: {
    color: COLORS.STATUS,
    padding: 2,
    fontSize: 12,
    lineHeight: 12,
  },
});
