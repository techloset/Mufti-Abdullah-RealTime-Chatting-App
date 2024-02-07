import {Image, ScrollView, Text, View} from 'react-native';
import React, {Component} from 'react';
import Header from '../../../components/tabHeader/Header';
import UserInfo from '../../../components/userInfo/UserInfo';

export class Home extends Component {
  render() {
    return (
      <>
        <Header name={'Home'} />
        <ScrollView
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
            marginBottom: 10,
          }}>
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
        </ScrollView>
      </>
    );
  }
}

export default Home;
