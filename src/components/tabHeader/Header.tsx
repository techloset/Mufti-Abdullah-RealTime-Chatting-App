import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './HeaderStyle';

const Header = (props: {name: string}) => {
  return (
    <View style={styles.MainView}>
      <Image
        source={require('../../assets/icons/Search.png')}
        style={styles.Icon}
      />

      <Text style={styles.Text}>{props.name}</Text>

      <Image
        source={require('../../assets/images/man.jpg')}
        style={styles.ProfileImage}
      />
    </View>
  );
};

export default Header;
