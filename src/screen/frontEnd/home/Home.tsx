import { Image, ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import Header from '../../../components/tabHeader/Header'
import UserInfo from '../../../components/userInfo/UserInfo'


export class Home extends Component {
  render() {
    return (
        <>
        <Header name={'Home'} />
      <ScrollView>
  <UserInfo/>
  <UserInfo/>
  <UserInfo/>
  <UserInfo/>
  <UserInfo/>
  <UserInfo/>
  <UserInfo/>
  <UserInfo/>
  <UserInfo/>
  <UserInfo/>
  <UserInfo/>
  <UserInfo/>
  <UserInfo/>
      </ScrollView>
        </>
    )
  }
}

export default Home