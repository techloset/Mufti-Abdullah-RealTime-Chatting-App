import {StyleSheet} from 'react-native';

export const HeaderStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    paddingVertical: 27,
  },
  iconContainer: {
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
    backgroundColor: 'white',
  },
  imageSearch: {
    height: 22,
    width: 22,
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  profilePhoto: {
    width: 44,
    height: 44,
    borderRadius: 30,
  },
  alternatePhoto: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'black',
    opacity: 0.4,
  },
  main: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 27,
  },
  screenName: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Poppins',
  },
  image: {
    width: 42,
    height: 42,
    backgroundColor: '#666',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //--------------here is the changing the styling for settting screens header
});
