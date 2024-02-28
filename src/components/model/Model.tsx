import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import uesHome from '../../screen/frontEnd/home/uesHome';
import User from '../contactUserInfo/User';
import {SEARCHPAGEICON} from '../../constants/assets/AllImages';

const Model = ({isVisible}: any) => {
  const [modalVisible, setModalVisible] = useState(isVisible);
  const {usersData} = uesHome();
  React.useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <ScrollView>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.remove}
              onPress={() => setModalVisible(false)}>
              <SEARCHPAGEICON.Remove />
            </TouchableOpacity>
            {usersData &&
              usersData.map(user => {
                return (
                  <User
                    photoURL={user.photoURL}
                    username={user.username}
                    status={user.status}
                  />
                );
              })}
            {/* <Text style={styles.modalText}>Hello World!</Text> */}
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    marginTop: 80,
    width: 350,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  remove: {
    width: 70,
    height: 70,
    marginTop: 0,
    marginLeft: 250,
  },
});

export default Model;
