import { Image, ScrollView, Text, TextInput, View } from 'react-native'
import React, { Component } from 'react'
import User from '../../../components/contactUserInfo/User'

export class Search extends Component {
  render() {
    return (
        <>
      <View style={{marginHorizontal:24,marginVertical:20,display:"flex",flexDirection:"row",width:327,borderRadius:12,borderStartColor:"#F3F6F6"}}>
        <Image source={require("../../../assets/icons/Search.png")} style={{alignSelf:"center",tintColor:"black"}}/>
        <TextInput placeholder='Search' style={{  height: 40,

    paddingLeft: 20,
    margin: 5,width:200 ,color:"black"}}
          placeholderTextColor="black"/>
          <Image source={require("../../../assets/icons/remove.png")} style={{justifyContent:"flex-end",alignSelf:"center"}}/>
      </View>
      <ScrollView>
        <View style={{marginHorizontal:24,marginVertical:20,width:185}}>
            <Text style={{color:"black",marginBottom:10 ,fontSize:16,fontWeight:"500",lineHeight:16}}>People</Text>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        </View>
        <View style={{marginHorizontal:24,marginVertical:20,width:185}}>
            <Text style={{color:"black",marginBottom:10 ,fontSize:16,fontWeight:"500",lineHeight:16}}>Group Chat</Text>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        </View>
    
      </ScrollView>
        </>
    )
  }
}

export default Search