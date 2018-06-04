import React from 'react';
import {View,Modal, StyleSheet} from 'react-native';
import Spinner from 'react-native-spinkit';
import PopMessage from '../../components/PopMessage/PopMessage';


const messageModal = props => {
  //'md-checkmark-circle-outline'
  //'green'
  return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}>
      <View style={styles.modalContainer}>
        <PopMessage
          icon={props.iconMessage.name}
          iconColor={props.iconMessage.color}
        >
          {props.iconMessage.data}
        </PopMessage>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer:{
    flex: 1,
    backgroundColor: "#000000AA",
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center'
  },
  spinnerContainer:{
    borderRadius: 10,
    backgroundColor:'#fff'
  },
  spinner:{
    margin:30
  }
});

export default messageModal;
