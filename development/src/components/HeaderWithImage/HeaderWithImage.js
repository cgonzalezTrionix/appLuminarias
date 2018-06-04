import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import IconCircleButton from '../UI/IconCircleButton/IconCircleButton';

import {btConnectDevice, btUpdateDevice} from '../../store/actions';

import {btLoadingState} from '../../store/actions/index'

class HeaderWithImage extends Component {

  state = {
    tempDevice: null,
    tempService: null,
    tempCharacteristic: null
  }
  // Check if there are some important changes on components
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.data !== this.props.data||
    nextProps.btIsConnected !== this.props.btIsConnected;
  }

  // When button is pressed
  btBtnHandler = () => {
    if(this.props.btIsConnected){
      this.btDisconnectHandler();
    }else{
      this.connectionHandler();
    }
  }

  // Stablish connection
  connectionHandler = () => {
    this.props.btManager.state()
    .then((data)=>{
      if(data === 'PoweredOn'){
        this.props.onBtStatusLoading(true);
        this.scanAndConnect();
      }else{
        alert('Please turn your Bluetooth on');
      }
    });
  }

  // Search for an specific device and connect to it
  scanAndConnect = () => {
    this.props.btManager.startDeviceScan(null, null, (error, device) => {
      if(error){
        console.log(error);
        return;
      }
      if(device.name === 'BT05'){
        this.props.btManager.stopDeviceScan();
        device.connect({requestMTU:100})
        .then((device) => {
          this.setState(prevState => {
            return{
              ...prevState,
              tempDevice:device
            }
          });
          return device.discoverAllServicesAndCharacteristics();
        })
        .then((device) => {
          return this.state.tempDevice.services();
        })
        .then((services) => {
          this.setState(prevState => {
            return{
              ...prevState,
              tempService:services[3]
            }
          });
          return this.state.tempDevice.characteristicsForService(services[3].uuid);
        })
        .then((chart) => {
          this.setState(prevState => {
            return{
              ...prevState,
              tempCharacteristic:chart[0]
            }
          });
          return this.props.btManager.requestMTUForDevice(this.state.tempDevice.id,100)
        })
        .then((device) =>{
          this.setState(prevState => {
            return{
              ...prevState,
              tempDevice: device
            }
          });
          return device.requestMTU(100);

        })
        .then((device) => {
          this.setState(prevState => {
            return{
              ...prevState,
              tempDevice: device
            }
          });
          this.props.onBTUpdateDevice(device,this.state.tempService,this.state.tempCharacteristic);
          this.props.onBTConnectDevice(true);
          this.props.onBtStatusLoading(false);
        },
        (error) => {
          console.log(error)
        });
      }
    });
  }



  btDisconnectHandler = () => {
    this.props.onBtStatusLoading(true);
    this.props.btDevice.cancelConnection()
    .then( d => {
      this.props.onBTConnectDevice(false);
      this.props.onBTUpdateDevice(null,null,null);
      this.props.onBtStatusLoading(false);
    });
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={styles.iconWrapper}>
            <IconCircleButton
              size={60}
              icon='md-wifi'
              iconColor={this.props.btIsConnected ? '#70DBDB' : 'white'}
              onPress={() => this.btBtnHandler()}
            />
          </View>
          <View>
            <Text style={styles.textWraper}>{this.props.data}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    width: "100%",
    height: 85,
    backgroundColor:'#0c0f1c'
  },
  subcontainer:{
    flex:1,
    alignItems:'center'
  },
  iconWrapper:{
    marginTop: 0,
  },
  textWraper:{
    color: 'white'
  }
});

const mapStateToProps = state => {
 return{
   btManager: state.ble.btManager,
   btDevice: state.ble.btDevice,
   btService: state.ble.btService,
   btCharacteristic: state.ble.btCharacteristic,
   btIsConnected: state.ble.isConnected
 }
}

const mapDispatchToProps = dispatch => {
 return{
   onBTConnectDevice: (isConnected) => dispatch(btConnectDevice(isConnected)),
   onBTUpdateDevice: (device,service,charact) => dispatch(btUpdateDevice(device,service,charact)),
   onBtStatusLoading: (status) => dispatch(btLoadingState(status))
 }
}

export default connect(mapStateToProps,mapDispatchToProps)(HeaderWithImage);
