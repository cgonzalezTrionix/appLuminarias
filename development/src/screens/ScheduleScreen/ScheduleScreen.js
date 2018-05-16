import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet
 } from 'react-native';
import {connect} from 'react-redux';

import HeaderWithImage from '../../components/HeaderWithImage/HeaderWithImage';
import IconButton from '../../components/UI/IconButton/IconButton';
//import CircleButton from '../../components/UI/CircleButton/CircleButton';
import WeekButtonBar from '../../components/WeekButtonBar/WeekButtonBar';
import ScheduleTable from '../../components/ScheduleTable/ScheduleTable';

class ScheduleScreen extends Component {

  shouldComponentUpdate(nextProps, nextState){
    //console.log('Update ScheduleScreen Table');
    return true;
  }

  componentDidMount() {
    console.log('Render ScheduleScreen');
  }

  render() {

    return (
      <View style={styles.container}>
        <HeaderWithImage data="My Device"/>
        <View style={styles.btnTimer}><IconButton color='#0c0f1c' icon='md-time'>Set Current Time</IconButton></View>
        <WeekButtonBar/>
        <ScheduleTable />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center'
  },
  btnTimer:{
    marginTop:20,
    marginBottom:20
  }
});

const mapStateToProps = state => {
  return{
    weekDay: state.schedules.weekDay
  }
}

export default connect(mapStateToProps)(ScheduleScreen);
