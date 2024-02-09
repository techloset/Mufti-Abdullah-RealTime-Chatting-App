import {ImageBackground, Text, View} from 'react-native';
import React, {Component} from 'react';
import Header from '../../../components/tabHeader/Header';
import {USERPROFILEIMAGE} from '../../../constants/assets/AllImages';
import {styles} from '../../authScreens/signUp/SignUPStyles';
import {TextInput} from 'react-native';

export default class Profile extends Component {
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
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <USERPROFILEIMAGE.ProfileImage height={120} width={120} />
          </View>
          <View style={{marginHorizontal: 20, marginVertical: 20}}>
            <View style={styles.inputView}>
              <Text style={styles.lable}>Your Name</Text>
              <TextInput
                style={styles.TextInput}
                placeholder="Your Name."
                placeholderTextColor="#003f5c"
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.lable}>Your Email</Text>
              <TextInput
                style={styles.TextInput}
                placeholder="Your Email."
                placeholderTextColor="#003f5c"
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.lable}>Your Status</Text>
              <TextInput
                style={styles.TextInput}
                placeholder="Your Status."
                placeholderTextColor="#003f5c"
              />
            </View>
          </View>

          <ImageBackground
            source={require('../../../assets/images/background.png')}
            style={styles.loginBtn}>
            <Text>Update Profile</Text>
          </ImageBackground>
        </View>
      </>
    );
  }
}
