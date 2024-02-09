import {Image, Text, View} from 'react-native';
import React, {Component} from 'react';
import {styles} from './Style';
import {USERPROFILEIMAGE} from '../../constants/assets/AllImages';

export default class User extends Component {
  render() {
    return (
      <View style={styles.MainView}>
        <View style={styles.InnerView}>
          <USERPROFILEIMAGE.ProfileImage style={styles.Profile} />
          <View style={styles.TextView}>
            <Text style={styles.Name}>John Borino</Text>
            <Text style={styles.Description}>Have a good day 🌸</Text>
          </View>
        </View>
      </View>
    );
  }
}
