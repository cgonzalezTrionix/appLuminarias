import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet
 } from 'react-native';

 import {connect} from 'react-redux';
 import bs64 from 'base64-js';

 import TimerMixin from 'react-timer-mixin';

import HeaderWithImage from '../../components/HeaderWithImage/HeaderWithImage';
import TimerClock from '../../components/TimerClock/TimerClock';
import TimerCounter from '../../components/TimerCounter/TimerCounter';
import IconButton from '../../components/UI/IconButton/IconButton';
import CustomSubtitle from '../../components/CustomSubtitle/CustomSubtitle';

import CustomModal from '../../components/CustomModal/CustomModal';
import MessageModal from '../../components/MessageModal/MessageModal';

import {splitMessageData,btSetTimeMethod,btDecodeMessage,btEncodeMessage} from '../../utility/ble/ble';
import {refreshState} from '../../utility/generic/generic';

import {btLoadingState} from '../../store/actions/index';

 class TimerScreen extends Component {

    constructor(props) {
      super(props);
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    state = {
      currentTime: '00:00:00',
      iconData: iconWrong,
      showModal: false,
      rxData: '',
      isReading: null,
      deviceTime: '00:00:00',
      deltaTime: 0,
      runDT: false
    }

    onNavigatorEvent(event) {
      switch(event.id) {
        case 'willAppear':
         break;
        case 'didAppear':
          this.timer = TimerMixin.setInterval(
            () => {
              this.getCurrentTime();
              this.getDeviceTime();
            },
            1000
          );
          break;
        case 'willDisappear':
          TimerMixin.clearInterval(this.timer);
          break;
        case 'didDisappear':
          break;
        case 'willCommitPreview':
          break;
      }
    }

    getCurrentTime = () =>{
      let hostTime = new Date(Date.now());

      let hour = hostTime.getHours();
      let minutes = hostTime.getMinutes();
      let seconds = hostTime.getSeconds();

      minutes = (minutes < 10) ? '0' + minutes : minutes;
      seconds = (seconds < 10) ? '0' + seconds : seconds;
      hour = (hour < 10) ? '0' + hour : hour;

      this.setState(prevState => {
        return{
          ...prevState,
          'currentTime': hour + ':' + minutes + ':' + seconds
        }
      });
    }

    getDeviceTime = () => {
      if(this.state.runDT){
        let deviceTime = new Date(Date.now()-this.state.deltaTime);
        let hour = deviceTime.getHours();
        let minutes = deviceTime.getMinutes();
        let seconds = deviceTime.getSeconds();

        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        hour = (hour < 10) ? '0' + hour : hour;

        this.setState(prevState => {
          return{
            ...prevState,
            'deviceTime': hour + ':' + minutes + ':' + seconds
          }
        });
      }
    }

    calculateOffsetTime = (timestamp) => {
      const host = new Date(Date.now());
      const device = new Date(timestamp);
      const diff = host - device;
      console.log(diff);
      this.setState( prevState => {
        return{
          ...prevState,
          runDT: true,
          deltaTime: diff
        }
      });
    }

    sendCurrentTimeBT = async() => {
      try{
        if (this.props.btIsConnected){
          this.props.onBtStatusLoading(true);
          await this.write2BLE(btSetTimeMethod());
          this.activateReadData(); // Enable rx
          console.log('Termine de enviar datos');
        }else{
          alert('Please connect to device!');
        }

      }catch(err){
        console.log('Hubo un ERRORRR!!!')
        console.log(err);
      }

    }

    readDeviceTimeBT = async() => {
      try{
        if (this.props.btIsConnected){
          const msg = {
            action: 'get',
            data:{
              time:'time'
            }
          };
          this.props.onBtStatusLoading(true);
          await this.write2BLE(JSON.stringify(msg)+'\r\n');
          this.activateReadDeviceBT();

          console.log('Termine de enviar datos');
        }else{
          alert('Please connect to device!');
        }
      }
      catch(e){
        console.log('Hubo un ERRORRR!!!')
        console.log(err);
      }
    }

    activateReadDeviceBT = async() => {
      const subscription = this.props.btManager.monitorCharacteristicForDevice(
        this.props.btDevice.id,
        this.props.btService.uuid,
        this.props.btCharacteristic.uuid,
        (err, temp) => {
          if(err){
            console.log(err.message);
            return;
          }
          try{
            let aux = this.state.rxData + btDecodeMessage(temp);
            if (aux.substr(-2) === "\r\n") { // End of reception
                console.log(aux);
                const jsData = JSON.parse(aux);
                this.calculateOffsetTime(jsData.data.time);
                this.props.onBtStatusLoading(false);
                this.updateState_showModal(true);
                this.updateState_iconData(iconCorrect);
                this.closeModalWithTimer();
                this.updateState_rxData('');
                subscription.remove();
            }else{ // Keep reading
              this.updateState_rxData(aux);
            }
          }
          catch(e){
            console.log(e);
            this.props.onBtStatusLoading(false);
            this.updateState_showModal(true);
            this.updateState_iconData(iconWrong);
            this.closeModalWithTimer();
            this.updateState_rxData('');
            subscription.remove();
          }

      });
    }


    write2BLE = async(message) => {
      const data = splitMessageData(message,20);
      let i;
      for(i = 0; i<data.length; i++){
        await this.props.btManager.writeCharacteristicWithoutResponseForDevice(
          this.props.btDevice.id,
          this.props.btService.uuid,
          this.props.btCharacteristic.uuid,
          btEncodeMessage(data[i])
        );
      };
    }




    activateReadData = async() => {
      console.log('Read starting')
      const subscription = this.props.btManager.monitorCharacteristicForDevice(
        this.props.btDevice.id,
        this.props.btService.uuid,
        this.props.btCharacteristic.uuid,
        (err, temp) => {
          if(err){
            console.log(err.message);
            return;
          }
          try{
            let aux = this.state.rxData + btDecodeMessage(temp);
            if (aux.substr(-2) === "\r\n") { // End of reception
                console.log(aux);
                const jsData = JSON.parse(aux);
                this.props.onBtStatusLoading(false);
                this.updateState_showModal(true);
                if(jsData.status){
                  this.updateState_iconData(iconCorrect);
                }else{
                  this.updateState_iconData(iconWrong);
                }

                this.closeModalWithTimer();
                this.updateState_rxData('');
                subscription.remove();
            }else{ // Keep reading
              this.updateState_rxData(aux);
            }
          }
          catch(e){
            console.log(e);
            this.props.onBtStatusLoading(false);
            this.updateState_showModal(true);
            this.updateState_iconData(iconWrong);
            this.closeModalWithTimer();
            this.updateState_rxData('');
            subscription.remove();
          }

      });
    }


    onModalClosed = () => {
      this.props.onBtStatusLoading(false);
    }

    onModalMessageClosed = () => {
      this.setState(prevState => {
        return{
          ...prevState,
          showModal: false
        }
      });
    }

    closeModalWithTimer(){
      this.timer2 = TimerMixin.setTimeout(() => {
        this.onModalMessageClosed();
        TimerMixin.clearTimeout(this.timer2);
      }, 1500);
    }

    updateState_rxData = (data) => {
      this.setState(prevState => {
        return{
          ...prevState,
          rxData: data
        }
      });
    }

    updateState_showModal = (data) => {
      this.setState(prevState => {
        return{
          ...prevState,
          showModal: data
        }
      });
    }

    updateState_iconData = (data) => {
      this.setState(prevState => {
        return{
          ...prevState,
          iconData: data
        }
      });
    }


   render(){
     return(
       <View style={styles.container}>
           <CustomModal
             visible={this.props.btIsLoading}
             onRequestClose={() => this.onModalClosed()}
           />
           <MessageModal
             iconMessage = {this.state.iconData}
             visible={this.state.showModal}
             onRequestClose={() => this.onModalMessageClosed()}
           />
          <HeaderWithImage data="My Device" />
          <CustomSubtitle > My phone </CustomSubtitle>
          <View style={styles.subcontainer}>
            <TimerClock currentTime={this.state.currentTime}/>
            <IconButton color='#0c0f1c' icon='md-time' onPress={() => this.sendCurrentTimeBT()}>Set Time</IconButton>
          </View>
          <CustomSubtitle > My device </CustomSubtitle>
          <View style={styles.subcontainer}>
            <TimerClock currentTime={this.state.deviceTime}/>
            <View><IconButton color='#0c0f1c' icon='md-time' onPress={() => this.readDeviceTimeBT()}>Read Time</IconButton></View>
          </View>
       </View>
     );
   }

 }

 const iconCorrect = {
   name: 'md-checkmark-circle-outline',
   color: 'green',
   data: 'Dato enviado.'
 };

 const iconWrong = {
   name: 'md-close-circle',
   color: 'red',
   data: 'Hubo un error'
 };

 const styles = StyleSheet.create({
   container:{
     flex:1,
     alignItems:'center'
   },
   subcontainer:{
     marginTop:5,
     marginBottom:15
   }
 });

 const mapStateToProps = state => {
    return{
      btManager: state.ble.btManager,
      btDevice: state.ble.btDevice,
      btService: state.ble.btService,
      btCharacteristic: state.ble.btCharacteristic,
      btIsConnected: state.ble.isConnected,
      btIsLoading: state.ble.isLoading
    }
  }

const mapDispatchToProps = (dispatch) => {
  return{
      onBtStatusLoading: (status) => dispatch(btLoadingState(status))
  };
};

 export default connect(mapStateToProps, mapDispatchToProps)(TimerScreen);
