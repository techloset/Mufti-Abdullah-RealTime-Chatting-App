import {Text, View} from 'react-native';
import React, {Component} from 'react';
import Header from '../../../components/tabHeader/Header';
import User from '../../../components/contactUserInfo/User';

export class Setting extends Component {
  render() {
    return (
      <>
        <Header name="Setting" />
        <View
          style={{
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            borderColor: 'white',
            borderWidth: 1,
            flex: 1,
            top: 90,
            zIndex: 1,
            position: 'relative',
            backgroundColor: 'white',
          }}>
          <View style={{marginLeft: 24, marginBottom: 16}}>
            <User />
          </View>
          <View
            style={{
              height: 0.1,
              width: 375,
              backgroundColor: 'gray',
              marginVertical: 10,
              borderWidth: 1,
              marginHorizontal: 0,
            }}
          />

          <View style={{marginLeft: 24, marginTop: 2, marginBottom: 20}}>
            <User />
            <User />
            <User />
            <User />
          </View>
        </View>
      </>
    );
  }
}

export default Setting;
