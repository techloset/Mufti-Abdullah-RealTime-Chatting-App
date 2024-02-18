import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './Style';
import {USERPROFILEIMAGE} from '../../constants/assets/AllImages';

interface UserInfoProps {
  profileImage: string;
  displayName: string;
  status: string;
  lastActive: string;
}

const UserInfo: React.FC<UserInfoProps> = ({
  profileImage,
  displayName,
  status,
  lastActive,
}) => {
  return (
    <View style={styles.MainView}>
      <View style={styles.FirstView}>
        {profileImage === null ? (
          <USERPROFILEIMAGE.ProfileImage width={50} height={50} />
        ) : (
          <Image source={{uri: profileImage}} style={styles.Image} />
        )}
        <View style={styles.SecondView}>
          <Text style={styles.FirstText}>{displayName}</Text>
          <Text style={styles.SecondText}>{status}</Text>
        </View>
      </View>
      <Text style={styles.ThirdText}>{lastActive}</Text>
    </View>
  );
};

export default UserInfo;
