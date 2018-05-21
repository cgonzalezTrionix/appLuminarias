import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  AsyncStorage,
  Picker,
  StyleSheet,
 } from 'react-native';

import {connect} from 'react-redux';

import Spinner from 'react-native-spinkit';
import TimerMixin from 'react-timer-mixin';

import HeaderWithImage from '../../components/HeaderWithImage/HeaderWithImage';
import IconCircleButton from '../../components/UI/IconCircleButton/IconCircleButton';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import PopMessage from '../../components/PopMessage/PopMessage';

import {changeAll} from '../../store/actions/index'

import {convertNumber} from '../../utility/convertNumber';

class LoadDataScreen extends Component {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  state = {
    selectedValue:'delta',
    dataKeys: [],
    isLoading: true,
    isLoaded: false
  }

  onNavigatorEvent(event) {
    switch(event.id) {
      case 'willAppear':
       break;
      case 'didAppear':
        this.getAllKeys();
        break;
      case 'willDisappear':
        break;
      case 'didDisappear':
        break;
      case 'willCommitPreview':
        break;
    }
  }

  getAllKeys = async() => {
    try{
      console.log('Obtener llaves')
      const value = await AsyncStorage.getAllKeys();
      this.setState(prevState => {
        return{
          ...prevState,
          selectedValue: value[0],
          dataKeys: [...value],
          isLoading: false
        }
      });
    }catch(error){
    }
  }

  loadData = async(key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null){
        // We have data!!
        const newData = value.split(',');
        const dataDays = convertNumber(newData[0],16,2).split('');
        const dataHours = convertNumber(newData[1],16,2).split('');
        this.props.onUpdateSchedules(dataDays,dataHours);
        this.setState( prevState => {
          return{
            ...prevState,
            isLoaded: true
          }
        });
        this.timer = TimerMixin.setTimeout(() => {
           this.closeSaveModal();
        }, 3000);

      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  }

  closeSaveModal = () => {
    TimerMixin.clearTimeout(this.timer);
    this.props.navigator.dismissModal({
      animationType: 'slide-down'
    });
  }

  onValueChangeHandler = (itemValue, itemIndex) => {
    this.setState(prevState => {
      return{
        ...prevState,
        selectedValue:itemValue
      }
    });
  }

  onLoadButtonHandler = () => {
    this.loadData(this.state.selectedValue);
  }

  onCloseButtonHandler = () => {
    this.props.navigator.dismissModal({
      animationType: 'slide-down'
    });
  }


  render(){

    let contentData = null;
    if(this.state.isLoaded){
      contentData = (
        <PopMessage
          icon='md-checkmark-circle-outline'
          iconColor='green'
        >
        Successfully Loaded!
        </PopMessage>
      );
    }else{
      if(this.state.dataKeys !== null && !this.state.isLoading){

        const pickerTemp = this.state.dataKeys.map( (data,index) => {
          return <Picker.Item label={data} value={data} key={index.toString()}/>
        });
        //const pickerTemp = null;
        contentData = (
          <View style={styles.subcontainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Load Schedule</Text>
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                mode={'dropdown'}
                selectedValue={this.state.selectedValue}
                style={styles.pickersubContainer}
                onValueChange={(itemValue, itemIndex) => this.onValueChangeHandler(itemValue, itemIndex)}
              >
                {pickerTemp}
              </Picker>
            </View>
            <View style={styles.buttonContainer}>
              <IconCircleButton
                size={40}
                color='#0c0f1c'
                iconColor='white'
                icon='md-checkmark'
                onPress={() => this.onLoadButtonHandler()}
              />
              <IconCircleButton
                size={40}
                color='#0c0f1c'
                iconColor='white'
                icon='md-close'
                onPress={() => this.onCloseButtonHandler()}
              />
            </View>
          </View>
        );
      }else{
        console.log('Estoy cargando')
        contentData = (
          <View style={styles.spinnerContainer}>
             <Spinner style={styles.spinner} color='#0c0f1c' size={150} type='Circle'/>
          </View>
        );
      }
    }


    return(
      <View style={styles.container}>
        {contentData}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#000000AA",
    justifyContent:'center',
    alignItems:'center',
    padding: 24
  },
  subcontainer:{
    alignItems:'center',
    width:300,
    borderRadius: 10,
    backgroundColor:'#fff'
  },
  pickersubContainer:{
    height:50,
    width:"100%"
  },
  buttonContainer:{
    width:"40%",
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:30
  },
  pickerContainer:{
    width:"80%",
    marginTop:20,
    marginBottom:20,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#eee'
  },
  title:{
    fontSize:32,
    fontWeight:'bold',
    color:'#333'
  },
  textContainer:{
    marginTop:20
  },
  spinnerContainer:{
    borderRadius: 10,
    backgroundColor:'#fff',
  },
  spinner:{
    margin:30
  }
});

mapDispatchToProps = (dispatch) => {
  return{
      onUpdateSchedules: (newDays,newHours) => dispatch(changeAll(newDays,newHours))
  };
};

export default connect(null,mapDispatchToProps)(LoadDataScreen);
