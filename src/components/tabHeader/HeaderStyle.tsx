import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  MainView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 140,
    width: 360,
    backgroundColor: '#09102E',
    paddingBottom: 39,
    paddingHorizontal: 23,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    position: 'absolute',
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
  ProfileImage: {borderRadius: 33, height: 44, width: 44, alignSelf: 'center'},
  //Now Styling for Icon and  Image Background
  IconAndProfileView: {
    backgroundColor: '#383D51',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 33,
    height: 44,
    width: 44,
  },
});
