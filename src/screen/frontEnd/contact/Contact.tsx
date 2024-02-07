import {ScrollView, Text, View} from 'react-native';
import React, {Component} from 'react';
import User from '../../../components/contactUserInfo/User';
import Header from '../../../components/tabHeader/Header';
import {styles} from './ContactStyle';

export default class Contact extends Component {
  render() {
    return (
      <>
        <Header name="Contact" />
        <ScrollView
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
            marginBottom: 10,
          }}>
          <View style={styles.TextView}>
            <Text style={styles.TextHeading}>MY Contact</Text>
          </View>
          <View style={styles.LettersView}>
            <Text style={styles.LetterText}>A</Text>
            <User />
            <User />
            <User />
          </View>
          <View style={styles.LettersView}>
            <Text style={styles.LetterText}>B</Text>
            <User />
            <User />
            <User />
          </View>
          <View style={styles.LettersView}>
            <Text style={styles.LetterText}>C</Text>
            <User />
            <User />
            <User />
          </View>
          <View style={styles.LettersView}>
            <Text style={styles.LetterText}>D</Text>
            <User />
            <User />
            <User />
          </View>
          <View style={styles.LettersView}>
            <Text style={styles.LetterText}>E</Text>
            <User />
            <User />
            <User />
          </View>
        </ScrollView>
      </>
    );
  }
}
