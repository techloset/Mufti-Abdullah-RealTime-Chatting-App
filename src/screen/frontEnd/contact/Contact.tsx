import { ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import User from '../../../components/contactUserInfo/User'
import Header from '../../../components/tabHeader/Header'

export default class Contact extends Component {
  render() {
    return (
        <>
        <Header name='Contact'/>
      <View style={{marginHorizontal:24,marginVertical:20}}>
        <Text style={{color:"black",fontWeight:"500",fontSize:16}}>MY Contact</Text>
      </View>
      <ScrollView>
        <View style={{marginHorizontal:24,marginVertical:20,width:185}}>
            <Text style={{color:"black",marginBottom:10}}>A</Text>
        <User/>
        <User/>
        <User/>
        </View>
        <View style={{marginHorizontal:24,marginVertical:20,width:185}}>
            <Text style={{color:"black",marginBottom:10}}>B</Text>
        <User/>
        <User/>
        <User/>
        </View>
        <View style={{marginHorizontal:24,marginVertical:20,width:185}}>
            <Text style={{color:"black",marginBottom:10}}>C</Text>
        <User/>
        <User/>
        <User/>
        </View>
        <View style={{marginHorizontal:24,marginVertical:20,width:185}}>
            <Text style={{color:"black",marginBottom:10}}>D</Text>
        <User/>
        <User/>
        <User/>
        </View>
        <View style={{marginHorizontal:24,marginVertical:20,width:185}}>
            <Text style={{color:"black",marginBottom:10}}>E</Text>
        <User/>
        <User/>
        <User/>
        </View>
    
      </ScrollView>
        </>
    )
  }
}