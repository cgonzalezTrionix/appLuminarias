import React, {Component} from 'react';
import {View,Modal, StyleSheet,Text} from 'react-native';
import Spinner from 'react-native-spinkit';
import PopMessage from '../PopMessage/PopMessage';
import IconCircleButton from '../UI/IconCircleButton/IconCircleButton';

class MessageModal extends Component {
  render(){
    return(
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}>
        <View style={styles.modalContainer}>
          <View style={styles.subContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Are you sure to delete this item? </Text>
            </View>
            <View style={styles.buttonContainer}>
              <IconCircleButton
                size={40}
                color='#0c0f1c'
                iconColor='white'
                icon='md-checkmark'
                onPress={this.props.onPressContinue}
              />
              <IconCircleButton
                size={40}
                color='red'
                iconColor='white'
                icon='md-close'
                onPress={this.props.onPressCancel}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer:{
    flex: 1,
    backgroundColor: "#000000AA",
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center'
  },
  subContainer:{
    borderRadius: 10,
    backgroundColor:'#fff',
    alignItems:'center',
    width:300,
  },
  buttonContainer:{
    width:"40%",
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:30,
    marginTop: 10
  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    color:'#333',
    textAlign:'center'
  },
  textContainer:{
    margin:20
  }
});

export default MessageModal;
