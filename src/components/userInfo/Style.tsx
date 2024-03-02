import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors/Color';

export const styles = StyleSheet.create({
  MainView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.WHITE,
  },
  FirstView: {
    paddingTop: 6,
    minWidth: 120,
    maxWidth: 180,
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  Image: {
    borderRadius: 22,
    height: 52,
    width: 52,
  },
  SecondView: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 6,
    marginLeft: 4,
  },
  FirstText: {
    color: COLORS.BLACK,
    padding: 2,
    fontSize: 20,
    lineHeight: 20,
  },
  SecondText: {
    color: COLORS.BLACK,
    padding: 2,
    fontSize: 12,
    lineHeight: 12,
  },
  ThirdText: {
    color: COLORS.BLACK,
    alignSelf: 'center',
  },
});
