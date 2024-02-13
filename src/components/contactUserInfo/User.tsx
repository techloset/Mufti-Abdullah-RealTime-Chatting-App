import {Image, Text, View} from 'react-native';
import React, {Component} from 'react';
import {styles} from './Style';
import {USERPROFILEIMAGE} from '../../constants/assets/AllImages';
import {useAuthContext} from '../../context/AuthContext';

export default function User() {
  const {user} = useAuthContext();
  return (
    <View style={styles.MainView}>
      <View style={styles.InnerView}>
        {user.photoURL == null ? (
          <USERPROFILEIMAGE.ProfileImage style={styles.Profile} />
        ) : (
          <Image source={user.photoURL} style={styles.Profile} />
        )}
        <View style={styles.TextView}>
          <Text style={styles.Name}>{user.username}</Text>
          <Text style={styles.Description}>{user.status}</Text>
        </View>
      </View>
    </View>
  );
}
