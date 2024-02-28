import {Text, TouchableOpacity, View} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import User from '../../../components/contactUserInfo/User';
import SettingInfo from '../../../components/settingPageComponents/SettingInfo';
import {HEADERICON, SETTINGICON} from '../../../constants/assets/AllImages';
import {styles} from '../../../components/settingPageComponents/Style';
import SettingHeader from '../../../components/tabHeader/SettingHeader';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useAuthContext} from '../../../context/AuthContext';
import {HeaderStyles} from '../../../styles/headerStyling/HeaderStyling';
import {SettingStackParamsList, UserData} from '../../../constants/Types';
import firestore from '@react-native-firebase/firestore';
interface navigationProps {
  navigation: StackNavigationProp<SettingStackParamsList, 'SETTING'>;
}
export default function Setting({navigation}: navigationProps) {
  const user = auth().currentUser;
  console.log('currentUser.uid', user);
  // const dispatch = useDispatch();
  // const users = useSelector(selectAllUsers);

  // useEffect(() => {
  //   dispatch(fetchAllUsers());
  // }, [dispatch]);
  const [usersData, setUsersData] = useState<UserData | null>(null);
  console.log('usersData', usersData);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (user) {
          const usersSnapshot = await firestore()
            .collection('users')
            .doc(user.uid)
            .get();
          const userData = usersSnapshot.data();

          if (userData) {
            setUsersData(userData);
          }
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <>
      <LinearGradient
        style={HeaderStyles.mainContainer}
        colors={['#000', '#43116A']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View style={HeaderStyles.container}>
          <View style={HeaderStyles.topbar}>
            <TouchableOpacity
              style={HeaderStyles.iconContainerForSettingStack}
              onPress={() => {
                // Handle search icon press
              }}>
              <HEADERICON.leftArrow style={HeaderStyles.imageSearch} />
            </TouchableOpacity>
            <Text style={HeaderStyles.screenName}>Setting</Text>
            <View></View>
          </View>
        </View>
        <View style={HeaderStyles.main}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PROFILE');
            }}>
            <View style={{marginLeft: 24, marginBottom: 16}}>
              <User
                photoURL={user?.photoURL}
                username={user?.displayName}
                status={usersData?.status}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 0.1,
              width: 375,
              backgroundColor: 'gray',
              marginVertical: 10,
              borderWidth: 1,
              marginHorizontal: 0,
            }}
          />

          <View style={{marginLeft: 24, marginTop: 2, marginBottom: 20}}>
            <SettingInfo
              name="Notifications"
              description="Messages, group and others"
              icon={<SETTINGICON.NotificationIcon style={styles.Profile} />}
            />
            <SettingInfo
              name="Help"
              description="Help center, contact us, privacy policy"
              icon={<SETTINGICON.Help style={styles.Profile} />}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CHANGE_PASSWORD');
              }}>
              <SettingInfo
                name="Change Password"
                description="Change Account Password"
                icon={<SETTINGICON.Password style={styles.Profile} />}
              />
            </TouchableOpacity>
            <SettingInfo
              name="Invite a friend"
              icon={<SETTINGICON.Password style={styles.Profile} />}
            />
          </View>
        </View>
      </LinearGradient>
    </>
  );
}
