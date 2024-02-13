import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import Header from '../../../components/tabHeader/HomeHeader';
import UserInfo from '../../../components/userInfo/UserInfo';
import {SwipeListView} from 'react-native-swipe-list-view';
import * as firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';

interface State {
  users: UserProfile[];
}

interface UserProfile {
  uid: string;
  username: string;
  email: string;
  role: string;
  status: string;
}

export class Home extends Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('publicProfiles');

    ref
      .limit(10)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          const user = doc.data();
          console.log(user.username);
        });
      })
      .catch(function (error) {
        // Handle any errors that occur while retrieving documents
        console.error('Error retrieving documents:', error);
      });
  }

  render() {
    return (
      <>
        <Header name={'Home'} />

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
          <View>
            <SwipeListView
              data={[{key: '1'}]}
              renderItem={() => (
                <View>
                  <UserInfo />
                </View>
              )}
              renderHiddenItem={() => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    // backgroundColor: 'transparent',
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'red',
                      justifyContent: 'center',
                      alignItems: 'center',
                      // width: 100,
                    }}
                    // onPress={() => alert('Delete')}
                  >
                    <Text style={{color: 'white'}}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'blue',
                      justifyContent: 'center',
                      alignItems: 'center',
                      // width: 100,
                    }}
                    // onPress={() => alert('Notify')}
                  >
                    <Text style={{color: 'white'}}>Notify</Text>
                  </TouchableOpacity>
                </View>
              )}
              rightOpenValue={-105}
            />
          </View>
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
          <UserInfo />
        </ScrollView>
      </>
    );
  }
}

export default Home;
