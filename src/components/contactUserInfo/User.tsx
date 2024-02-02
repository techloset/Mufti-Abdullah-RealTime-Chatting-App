import {Image, Text, View} from 'react-native';
import React, {Component} from 'react';

export default class User extends Component {
  render() {
    return (
      <View style={{display: 'flex', flexDirection: 'row', marginVertical: 10}}>
        <View
          style={{
            paddingTop: 6,
            width: 120,
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../assets/images/man.jpg')}
            style={{borderRadius: 22, height: 52, width: 52}}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingTop: 6,
              marginLeft: 4,
            }}>
            <Text
              style={{
                color: 'black',
                padding: 2,
                fontSize: 20,
                lineHeight: 20,
              }}>
              John Borino
            </Text>
            <Text
              style={{
                color: 'black',
                padding: 2,
                fontSize: 12,
                lineHeight: 12,
              }}>
              Have a good day 🌸
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
