import {ImageBackground, Text, TextInput, View} from 'react-native';
import React, {Component} from 'react';
import {USERPROFILEIMAGE} from '../../../constants/assets/AllImages';
import {styles} from '../../authScreens/signUp/SignUPStyles';
import Header from '../../../components/tabHeader/Header';

export default class ChangePassword extends Component {
  render() {
    return (
      <>
        <Header name="Profile" />
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
            alignItems: 'center',
          }}>
          <View style={{marginHorizontal: 20, marginVertical: 80}}>
            <View style={styles.inputView}>
              <Text style={styles.lable}>Current Password</Text>
              <TextInput
                style={styles.TextInput}
                secureTextEntry={true}
                placeholder="Current Password"
                placeholderTextColor="#003f5c"
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.lable}>New Password</Text>
              <TextInput
                style={styles.TextInput}
                secureTextEntry={true}
                placeholder="New Password."
                placeholderTextColor="#003f5c"
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.lable}>Conform Password</Text>
              <TextInput
                style={styles.TextInput}
                secureTextEntry={true}
                placeholder="New Password."
                placeholderTextColor="#003f5c"
              />
            </View>
          </View>

          <ImageBackground
            source={require('../../../assets/images/background.png')}
            style={styles.loginBtn}>
            <Text>Update Password</Text>
          </ImageBackground>
        </View>
      </>
    );
  }
}
