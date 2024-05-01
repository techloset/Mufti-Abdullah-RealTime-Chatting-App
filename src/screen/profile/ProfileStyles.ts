import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors/color';

export const profileStyles = StyleSheet.create({
  mainView: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  inSideMainView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    borderRadius: 60,
  },
  userProfile: {
    position: 'absolute',
    left: 35,
    top: -30,
    width: 60,
    height: 60,
  },
  nouch: {
    width: 30,
    height: 3,
    marginBottom: 24,
    backgroundColor: COLORS.NOCH,
    alignSelf: 'center',
  },
});
