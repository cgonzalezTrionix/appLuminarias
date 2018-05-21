import React from 'react';
import {View,Modal, StyleSheet} from 'react-native';

const customModal = props => {
  return(
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}>
      <View style={styles.modalContainer}>
        {props.children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer:{
    flex: 1,
    backgroundColor: "#000000AA",
    justifyContent:'center',
    padding: 24
  }
});

export default customModal;
