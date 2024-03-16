import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors/Color';
import {FONTS} from '../../constants/fonts/Font';

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
    borderRadius: 22,
    height: 44,
    width: 44,
  },
  TextView: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 6,
    marginLeft: 12,
  },
  Name: {
    color: COLORS.DARKBLACK,
    fontFamily: FONTS.MEDIUM,
    fontWeight: '500',
    padding: 2,
    fontSize: 16,
    lineHeight: 18,
  },
  Description: {
    color: COLORS.STATUS,
    padding: 2,
    fontSize: 12,
    lineHeight: 12,
  },
});
