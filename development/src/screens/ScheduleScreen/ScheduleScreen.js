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

import HeaderWithImage from '../../components/HeaderWithImage/HeaderWithImage';
import IconButton from '../../components/UI/IconButton/IconButton';
import WeekButtonBar from '../../components/WeekButtonBar/WeekButtonBar';
import ScheduleTable from '../../components/ScheduleTable/ScheduleTable';

import {convertNumber} from '../../utility/convertNumber';

class ScheduleScreen extends Component {

  onRunButtonHandler = () => {
    this.getAllKeys();

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
    //this.saveData('MyData',temp);
  }

  onLoadButtonHandler = () => {
    this.loadData('MyData');
  }

  getAllKeys = async() => {
    try{
      const value = await AsyncStorage.getAllKeys();
      console.log(value);
    }catch(error){
      console.log(error);
    }
  }

  saveData = async(key,data) => {

    try {
      //'@MySuperStore:key'
      await AsyncStorage.setItem(key, data);
      console.log('Data saved!!')
    } catch (error) {
      console.log(error);
    // Error saving data
    }

  }

  loadData = async(key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null){
        // We have data!!
        console.log('Data readed');
        console.log(value);
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
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

  render() {

    return (
      <View style={styles.container}>
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
    hours: state.schedules.hours
  }
}

export default connect(mapStateToProps)(ScheduleScreen);
