import {StyleSheet} from 'react-native';

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
    color: 'black',
    padding: 2,
    fontSize: 20,
    lineHeight: 20,
  },
  Description: {
    color: 'black',
    padding: 2,
    fontSize: 12,
    lineHeight: 12,
  },
});
