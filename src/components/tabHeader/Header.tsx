import { View, Text, Image } from 'react-native'
import React from 'react'

const Header = (props: { name: string }) => {
  return (
    <View style={{ display:"flex",flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' ,height:70,backgroundColor:"#09102E", paddingTop:10,paddingHorizontal:10}}>
   
    <Image source={require("../../assets/icons/Search.png")} style={{ alignSelf: 'center' }} />
    
    <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', alignSelf: 'center' }}>
      {props.name}
    </Text>
  
    <Image source={require("../../assets/images/man.jpg")} style={{ alignSelf: 'center',height:44,width:44 ,borderRadius:33}} />
  </View>
  
  )
}

export default Header