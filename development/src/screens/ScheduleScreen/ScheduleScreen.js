import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  AsyncStorage,
  StyleSheet
 } from 'react-native';
import {connect} from 'react-redux';

import TimerMixin from 'react-timer-mixin';
import HeaderWithImage from '../../components/HeaderWithImage/HeaderWithImage';
import IconButton from '../../components/UI/IconButton/IconButton';
import WeekButtonBar from '../../components/WeekButtonBar/WeekButtonBar';
import ScheduleTable from '../../components/ScheduleTable/ScheduleTable';
import MessageModal from '../../components/MessageModal/MessageModal'
import {convertNumber} from '../../utility/convertNumber';
import {
  splitMessageData,
  btSetTimeMethod,
  btSetSchedule,
  getSelectedDays,
  getSelectedHours
} from '../../utility/ble/ble';
import {btLoadingState} from '../../store/actions/index';

import bs64 from 'base64-js';

class ScheduleScreen extends Component {

  state = {
    iconData: iconWrong,
    showModal: false,
    rxData: null,
    isReading: false
  }

  onRunButtonHandler = () => {
    if(this.props.btIsConnected){
      this.props.onBtStatusLoading(true);
      const selectedDays = getSelectedDays(this.props.weekDay);
      const selectedHours = getSelectedHours(this.props.hours);
      const packet = btSetSchedule(selectedDays,selectedHours,'1');
      this.sendBTData(packet);
    }else{
      alert('Please connect to device!')
    }
  }

  sendBTData = async(packet) => {
    try{
      for(let i=0; i<packet.length; i++){
        const temp = splitMessageData(packet[i],20);
        for(let j=0; j<temp.length;j++){
          let aux = temp[j].split('');
          aux = aux.map(char => {return char.charCodeAt(0)});
          aux = bs64.fromByteArray(aux);
          await this.props.btManager.writeCharacteristicWithoutResponseForDevice(
            this.props.btDevice.id,
            this.props.btService.uuid,
            this.props.btCharacteristic.uuid,
            aux
          );
        }
      }

      this.props.onBtStatusLoading(false);
      this.setState(prevState => {
        return{
            ...prevState,
            showModal: true,
            iconData: iconCorrect
        }
      });
      this.timer2 = TimerMixin.setTimeout(() => {
        this.onModalMessageClosed();
        TimerMixin.clearTimeout(this.timer2);
      }, 1500);

    }
    catch(e){
      console.log(e);
    }
  }


  activateReadData = async() => {
    console.log('Entre a activar lectura');
    this.setState(prevState => {
      return{
          ...prevState,
          isReading: true
      }
    });
    this.props.btManager.monitorCharacteristicForDevice(
      this.props.btDevice.id,
      this.props.btService.uuid,
      this.props.btCharacteristic.uuid,
      (err, temp) => {
          if(err){
            console.log(err.message);
            return;
          }
          // const data = bs64.toByteArray(temp.value);
          // let dataStr = []
          // data.forEach(data => {
          //   dataStr.push(String.fromCharCode(data));
          // });
          console.log(temp);
      }
    )
  }

  onSaveButtonHandler = () => {
    const days = this.checkSelectedDays();
    const hours = this.checkSelectedHours();

    if(days !== '0' && hours !=='0'){
      const temp =  days + ',' + hours;
      this.props.navigator.showModal({
        screen:'appLuminarias.SaveDataScreen',
        navigatorStyle: navStyles.titleStyle,
        passProps: {dataToSave:temp}
      });
    }else{
      alert('Please select days and hours!')
    }
  }

  onLoadButtonHandler = () => {
    this.props.navigator.showModal({
      screen:'appLuminarias.LoadDataScreen',
      navigatorStyle: navStyles.titleStyle
    });
  }

  checkSelectedDays = () => {
    //Lunes es el bit mas significativo
    const data = this.props.weekDay.map(value => {
      return value.checked ? '1' : '0';
    }).join('');
    return convertNumber(data,2,16);
  }

  checkSelectedHours = () => {
    // La primera hora es el bit mas significativo
    const data = this.props.hours.map(value => {
      return value.checked ? '1' : '0';
    }).join('');
    return convertNumber(data,2,16);
  }

  onModalMessageClosed = () => {
    this.setState(prevState => {
      return{
        ...prevState,
        showModal: false
      }
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <MessageModal
          iconMessage = {this.state.iconData}
          visible={this.state.showModal}
          onRequestClose={() => this.onModalMessageClosed()}
        />
        <HeaderWithImage data="My Device"/>
        <View style={styles.btnTimer}>
          <IconButton
            color='#0c0f1c'
            icon='md-folder-open'
            onPress={() => this.onLoadButtonHandler()}
          >
            Load
          </IconButton>
          <IconButton
            color='#0c0f1c'
            icon='md-play'
            onPress={() => this.onRunButtonHandler()}
          >
            Run
          </IconButton>
          <IconButton
            color='#0c0f1c'
            icon='md-bookmark'
            onPress={() => this.onSaveButtonHandler()}
          >
            Save
          </IconButton>
        </View>
        <WeekButtonBar/>
        <ScheduleTable />
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

const navStyles = {
  titleStyle: {
    navBarHidden: true,
  }
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center'
  },
  btnTimer:{
    width:"80%",
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop:20,
    marginBottom:20
  }
});

const mapStateToProps = state => {
  return{
    weekDay: state.schedules.weekDay,
    hours: state.schedules.hours,
    btManager: state.ble.btManager,
    btDevice: state.ble.btDevice,
    btService: state.ble.btService,
    btCharacteristic: state.ble.btCharacteristic,
    btIsConnected: state.ble.isConnected,
    btIsLoading: state.ble.isLoading
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
      onBtStatusLoading: (status) => dispatch(btLoadingState(status))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ScheduleScreen);
