import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: 'black',
    // color: 'white',
    alignItems: 'center',
    gap: 10,
  },
  icons: {
    alignSelf: 'center',
    // justifyContent: 'center',
    marginVertical: 10,
    // backgroundColor: 'black',
  },
  main: {
    flex: 1,
  },
  text: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  MainUser: {
    width: 249,
    marginHorizontal: 24,
    display: 'flex',
    flexDirection: 'row',
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  userMessage: {
    paddingHorizontal: 10,
    width: 187,
  },

  Description: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
    fontWeight: '500',
  },
  MessageText: {
    backgroundColor: '#F2F7FB',
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 8,
    color: 'black',
  },
  time: {
    color: '#797C7B80',
    textAlign: 'right',
  },
  me: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: 154,
    marginLeft: 195,
    marginVertical: 10,
  },
  myText: {
    color: 'white',
    backgroundColor: '#3D4A7A',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 8,
  },
  myTime: {
    color: '#797C7B80',
    textAlign: 'right',
    width: 46,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  bottom: {
    width: 375,
    height: 90,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  attachment: {
    marginRight: 4,
    marginLeft: 0,
  },
  bootomView: {
    backgroundColor: '#F3F6F6',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 260,
    height: 40,

    padding: 3,
  },
  bottomInput: {
    color: '#797C7B80',
  },
  camera: {
    marginLeft: 10,
  },
});
