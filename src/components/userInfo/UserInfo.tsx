import {Image, Text, View} from 'react-native';
import React, {Component} from 'react';
import {styles} from './Style';

export default class UserInfo extends Component {
  render() {
    return (
      <View style={styles.MainView}>
        <View style={styles.FirstView}>
          <Image
            source={require('../../assets/images/man.jpg')}
            style={styles.Image}
          />
          <View style={styles.SecondView}>
            <Text style={styles.FirstText}>John Borino</Text>
            <Text style={styles.SecondText}>Have a good day 🌸</Text>
          </View>
        </View>
        <Text style={styles.ThirdText}>2 min ago</Text>
      </View>
    );
  }
}
