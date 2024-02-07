import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  MainView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#09102E',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  Text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
  },
  Icon: {
    alignSelf: 'center',
  },
  ProfileImage: {
    alignSelf: 'center',
    height: 44,
    width: 44,
    borderRadius: 33,
  },
});
