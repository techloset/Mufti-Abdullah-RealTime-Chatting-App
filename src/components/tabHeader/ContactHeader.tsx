import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './HeaderStyle';
import {useAuthContext} from '../../context/AuthContext';
import {HEADERICON} from '../../constants/assets/AllImages';
/////Logut use in header
const ContactHeader = (props: {name: string}) => {
  const {user, Logout} = useAuthContext();
  console.log('user', user);
  return (
    <View style={styles.MainView}>
      <View style={styles.IconAndProfileView}>
        <HEADERICON.search style={styles.Icon} />
      </View>

      <Text style={styles.Text} onPress={Logout}>
        {props.name}
      </Text>
      <View style={styles.IconAndProfileView}>
        <HEADERICON.AddUser style={styles.ProfileImage} />
      </View>
    </View>
  );
};

export default ContactHeader;
