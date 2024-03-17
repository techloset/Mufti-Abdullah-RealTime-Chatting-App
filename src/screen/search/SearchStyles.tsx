import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors/Color';

export const styles = StyleSheet.create({
  searchView: {
    marginHorizontal: 24,
    padding: 6,
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    width: 327,
    borderRadius: 12,
    backgroundColor: COLORS.BOTTOM,
  },
  searchImage: {
    alignSelf: 'center',
    tintColor: COLORS.BLACK,
  },
  Input: {
    height: 40,
    paddingLeft: 20,
    margin: 5,
    width: 250,
    color: COLORS.BLACK,
  },
  removeImage: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  HeadingView: {
    marginHorizontal: 24,
    marginVertical: 20,
  },
  PeopleText: {
    color: COLORS.BLACK,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 16,
  },
  GroupText: {
    color: COLORS.BLACK,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 16,
  },
  nouch: {
    width: 30,
    height: 3,
    marginBottom: 24,
    backgroundColor: '#E6E6E6',
    alignSelf: 'center',
  },
});
