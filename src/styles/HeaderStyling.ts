import {StyleSheet} from 'react-native';
import {FONTS} from '../constants/fonts/font';
import {COLORS} from '../constants/colors/color';
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
    backgroundColor: COLORS.BACKGROUND,
  },
  imageSearch: {
    height: 22,
    width: 22,
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
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
    backgroundColor: COLORS.BLACK,
    opacity: 0.4,
  },
  main: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 27,
  },
  screenName: {
    fontSize: 20,
    color: COLORS.WHITE,
    fontFamily: FONTS.REGULAR,
    fontWeight: '500',
  },
  image: {
    width: 42,
    height: 42,
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //--------------here is the changing the styling for settting screens header
  iconContainerForSettingStack: {
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainerForPassword: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 27,
    alignItems: 'center',
  },
});
