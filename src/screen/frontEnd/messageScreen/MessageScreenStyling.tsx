import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/colors/Color';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icons: {
    alignSelf: 'center',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  main: {
    flex: 1,
  },
  Send: {
    color: COLORS.BLACK,
    width: 50,
    padding: 5,
    height: 30,
  },
  text: {
    color: COLORS.BLACK,
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
    color: COLORS.BLACK,
    fontWeight: '500',
  },
  MessageText: {
    backgroundColor: COLORS.RECIVER,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 8,
    color: COLORS.BLACK,
  },
  time: {
    color: COLORS.TIME,
    textAlign: 'right',
    fontSize: 10,
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
    color: COLORS.WHITE,
    backgroundColor: COLORS.LABLE,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 8,
  },
  myTime: {
    color: COLORS.TIME,
    textAlign: 'right',
    width: 46,
    fontSize: 10,
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
    backgroundColor: COLORS.BOTTOM,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 260,
    height: 40,
    paddingStart: 3,
  },
  bottomInput: {
    color: COLORS.TIME,
    width: 170,
  },
  camera: {
    marginLeft: 10,
  },
});
