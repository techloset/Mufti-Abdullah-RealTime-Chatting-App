import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './HeaderStyle';
import {useAuthContext} from '../../context/AuthContext';
import {HEADERICON} from '../../constants/assets/AllImages';
import {useNavigation} from '@react-navigation/native';
/////Logut use in header
const SettingHeader = (props: {name: string}) => {
  const {user, Logout} = useAuthContext();
  const navigation = useNavigation();
  console.log('user', user);
  return (
    <View style={styles.MainView}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <HEADERICON.leftArrow style={styles.Icon} />
      </TouchableOpacity>

      <Text style={styles.Text} onPress={Logout}>
        {props.name}
      </Text>
      <View style={styles.IconAndProfileView}>
        <HEADERICON.AddUser style={styles.ProfileImage} />
      </View>
    </View>
  );
};

export default SettingHeader;
