import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './HeaderStyle';
import {useAuthContext} from '../../context/AuthContext';
import {HEADERICON, USERPROFILEIMAGE} from '../../constants/assets/AllImages';
import auth from '@react-native-firebase/auth';

/////Logut use in header
const Header = (props: {name: string}) => {
  const {user, Logout} = useAuthContext();
  console.log('user', user);
  return (
    <View style={styles.MainView}>
      <View style={styles.IconAndProfileView}>
        <HEADERICON.search style={styles.Icon} />
      </View>

      <Text style={styles.Text} onPress={Logout}>
        {props.name}
      </Text>

      {user.photoURL == null ? (
        <USERPROFILEIMAGE.ProfileImage style={styles.ProfileImage} />
      ) : (
        <Image source={user.photoURL} style={styles.ProfileImage} />
      )}
    </View>
  );
};

export default Header;
