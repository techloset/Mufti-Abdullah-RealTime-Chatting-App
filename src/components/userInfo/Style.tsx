import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  MainView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  FirstView: {
    paddingTop: 6,
    width: 120,
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
    color: 'black',
    padding: 2,
    fontSize: 20,
    lineHeight: 20,
  },
  SecondText: {
    color: 'black',
    padding: 2,
    fontSize: 12,
    lineHeight: 12,
  },
  ThirdText: {
    color: 'black',
    alignSelf: 'center',
  },
});
