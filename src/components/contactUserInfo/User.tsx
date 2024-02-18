import {Image, Text, View} from 'react-native';
import React, {Component} from 'react';
import {styles} from './Style';
import {USERPROFILEIMAGE} from '../../constants/assets/AllImages';
import {useAuthContext} from '../../context/AuthContext';
interface UserInfoProps {
  photoURL: string;
  username: string;
  status: string;
}
const User: React.FC<UserInfoProps> = ({photoURL, username, status}) => {
  return (
    <View style={styles.MainView}>
      <View style={styles.InnerView}>
        {photoURL === null ? (
          <USERPROFILEIMAGE.ProfileImage width={50} height={50} />
        ) : (
          <Image source={{uri: photoURL}} style={styles.Profile} />
        )}
        <View style={styles.TextView}>
          <Text style={styles.Name}>{username}</Text>
          <Text style={styles.Description}>{status}</Text>
        </View>
      </View>
    </View>
  );
};
export default User;
