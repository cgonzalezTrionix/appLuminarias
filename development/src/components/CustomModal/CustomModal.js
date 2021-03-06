import React from 'react';
import {View,Modal, StyleSheet} from 'react-native';
import Spinner from 'react-native-spinkit';


const customModal = props => {
  return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}>
      <View style={styles.modalContainer}>
        <View style={styles.spinnerContainer}>
          <Spinner style={styles.spinner} color='#0c0f1c' size={150} type='Circle'/>
        </View>
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

export default customModal;
