import {Image, ScrollView, Text, TextInput, View} from 'react-native';
import React, {Component} from 'react';
import User from '../../../components/contactUserInfo/User';
import {styles} from './SearchStyles';

export class Search extends Component {
  render() {
    return (
      <>
        <View style={styles.searchView}>
          <Image
            source={require('../../../assets/icons/Search.png')}
            style={styles.searchImage}
          />
          <TextInput
            placeholder="Search"
            style={styles.Input}
            placeholderTextColor="black"
          />
          <Image
            source={require('../../../assets/icons/remove.png')}
            style={styles.removeImage}
          />
        </View>
        <ScrollView>
          <View style={styles.HeadingView}>
            <Text style={styles.PeopleText}>People</Text>
            <User />
            <User />
            <User />
            <User />
            <User />
          </View>
          <View style={styles.HeadingView}>
            <Text style={styles.GroupText}>Group Chat</Text>
            <User />
            <User />
            <User />
            <User />
            <User />
          </View>
        </ScrollView>
      </>
    );
  }
}

export default Search;
