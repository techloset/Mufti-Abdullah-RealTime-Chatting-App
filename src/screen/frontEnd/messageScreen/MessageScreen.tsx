import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {HEADERICON} from '../../../constants/assets/AllImages';
import User from '../../../components/contactUserInfo/User';
import {styles} from './MessageScreenStyling';
import {useNavigation} from '@react-navigation/native';

export default function MessageScreen({route}: any) {
  const navigation = useNavigation();
  const {userDetails} = route.params;
  console.log('userDetails.photoURL', userDetails.photoURL);
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={navigation.goBack}>
          <HEADERICON.ArrowBlack style={styles.icons} width={30} height={30} />
        </TouchableOpacity>
        <User
          photoURL={userDetails.photoURL}
          username={userDetails.username}
          status={'Active Now'}
        />
      </View>
      <ScrollView>
        <View style={styles.main}>
          <Text style={styles.text}>Today</Text>
          <View style={styles.MainUser}>
            <View style={styles.user}>
              <Image
                source={{uri: userDetails.photoURL}}
                style={styles.image}
              />
            </View>
            <View style={styles.userMessage}>
              <Text style={styles.Description}>{userDetails.username}</Text>
              <Text style={styles.MessageText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Text style={styles.time}>2010 AM </Text>
            </View>
          </View>
          <View style={styles.me}>
            <Text style={styles.myText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
              est.
            </Text>
            <Text style={styles.myTime}>10 AM</Text>
          </View>
          <View style={styles.MainUser}>
            <View style={styles.user}>
              <Image
                source={{uri: userDetails.photoURL}}
                style={styles.image}
              />
            </View>
            <View style={styles.userMessage}>
              <Text style={styles.Description}>{userDetails.username}</Text>
              <Text style={styles.MessageText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Text style={styles.time}>2010 AM </Text>
            </View>
          </View>
          <View style={styles.me}>
            <Text style={styles.myText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
              est.
            </Text>
            <Text style={styles.myTime}>10 AM</Text>
          </View>
          <View style={styles.MainUser}>
            <View style={styles.user}>
              <Image
                source={{uri: userDetails.photoURL}}
                style={styles.image}
              />
            </View>
            <View style={styles.userMessage}>
              <Text style={styles.Description}>{userDetails.username}</Text>
              <Text style={styles.MessageText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Text style={styles.time}>2010 AM </Text>
            </View>
          </View>
          <View style={styles.me}>
            <Text style={styles.myText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
              est.
            </Text>
            <Text style={styles.myTime}>10 AM</Text>
          </View>
          <View style={styles.MainUser}>
            <View style={styles.user}>
              <Image
                source={{uri: userDetails.photoURL}}
                style={styles.image}
              />
            </View>
            <View style={styles.userMessage}>
              <Text style={styles.Description}>{userDetails.username}</Text>
              <Text style={styles.MessageText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Text style={styles.time}>2010 AM </Text>
            </View>
          </View>
          <View style={styles.me}>
            <Text style={styles.myText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
              est.
            </Text>
            <Text style={styles.myTime}>10 AM</Text>
          </View>
          <View style={styles.MainUser}>
            <View style={styles.user}>
              <Image
                source={{uri: userDetails.photoURL}}
                style={styles.image}
              />
            </View>
            <View style={styles.userMessage}>
              <Text style={styles.Description}>{userDetails.username}</Text>
              <Text style={styles.MessageText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Text style={styles.time}>2010 AM </Text>
            </View>
          </View>
          <View style={styles.me}>
            <Text style={styles.myText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
              est.
            </Text>
            <Text style={styles.myTime}>10 AM</Text>
          </View>
          <View style={styles.MainUser}>
            <View style={styles.user}>
              <Image
                source={{uri: userDetails.photoURL}}
                style={styles.image}
              />
            </View>
            <View style={styles.userMessage}>
              <Text style={styles.Description}>{userDetails.username}</Text>
              <Text style={styles.MessageText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Text style={styles.time}>2010 AM </Text>
            </View>
          </View>
          <View style={styles.me}>
            <Text style={styles.myText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
              est.
            </Text>
            <Text style={styles.myTime}>10 AM</Text>
          </View>
          <View style={styles.MainUser}>
            <View style={styles.user}>
              <Image
                source={{uri: userDetails.photoURL}}
                style={styles.image}
              />
            </View>
            <View style={styles.userMessage}>
              <Text style={styles.Description}>{userDetails.username}</Text>
              <Text style={styles.MessageText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Text style={styles.time}>2010 AM </Text>
            </View>
          </View>
          <View style={styles.me}>
            <Text style={styles.myText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
              est.
            </Text>
            <Text style={styles.myTime}>10 AM</Text>
          </View>
          <View style={styles.MainUser}>
            <View style={styles.user}>
              <Image
                source={{uri: userDetails.photoURL}}
                style={styles.image}
              />
            </View>
            <View style={styles.userMessage}>
              <Text style={styles.Description}>{userDetails.username}</Text>
              <Text style={styles.MessageText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Text style={styles.time}>2010 AM </Text>
            </View>
          </View>
          <View style={styles.me}>
            <Text style={styles.myText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
              est.
            </Text>
            <Text style={styles.myTime}>10 AM</Text>
          </View>
          <View style={styles.MainUser}>
            <View style={styles.user}>
              <Image
                source={{uri: userDetails.photoURL}}
                style={styles.image}
              />
            </View>
            <View style={styles.userMessage}>
              <Text style={styles.Description}>{userDetails.username}</Text>
              <Text style={styles.MessageText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Text style={styles.time}>2010 AM </Text>
            </View>
          </View>
          <View style={styles.me}>
            <Text style={styles.myText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
              est.
            </Text>
            <Text style={styles.myTime}>10 AM</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
