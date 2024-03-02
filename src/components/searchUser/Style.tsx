import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors/Color';

export const styles = StyleSheet.create({
  MainView: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
  },
  InnerView: {
    paddingTop: 6,
    minWidth: 120,
    maxWidth: 220,
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
    width: 200,
    marginLeft: 4,
  },
  Name: {
    color: COLORS.BLACK,
    padding: 2,
    fontSize: 20,
    lineHeight: 20,
  },
  Description: {
    color: COLORS.BLACK,
    padding: 2,
    fontSize: 12,
    lineHeight: 12,
  },
});
