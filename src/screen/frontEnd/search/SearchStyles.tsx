import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  searchView: {
    marginHorizontal: 24,
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    width: 327,
    borderRadius: 12,
    borderStartColor: '#F3F6F6',
  },
  searchImage: {
    alignSelf: 'center',
    tintColor: 'black',
  },
  Input: {
    height: 40,
    paddingLeft: 20,
    margin: 5,
    width: 200,
    color: 'black',
  },
  removeImage: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  HeadingView: {
    marginHorizontal: 24,
    marginVertical: 20,
    width: 185,
  },
  PeopleText: {
    color: 'black',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 16,
  },
  GroupText: {
    color: 'black',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 16,
  },
});
