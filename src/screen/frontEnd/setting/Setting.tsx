import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Header from '../../../components/tabHeader/Header'

export class Setting extends Component {
  render() {
    return (
    <>
    <Header name='Setting'/>
      <View>
        <Text>Setting</Text>
      </View>
    </>
    )
  }
}

export default Setting