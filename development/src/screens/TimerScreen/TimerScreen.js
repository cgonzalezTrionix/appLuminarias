import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet
 } from 'react-native';

 import TimerMixin from 'react-timer-mixin';

import HeaderWithImage from '../../components/HeaderWithImage/HeaderWithImage';
import TimerClock from '../../components/TimerClock/TimerClock';
import TimerCounter from '../../components/TimerCounter/TimerCounter';
import IconButton from '../../components/UI/IconButton/IconButton';
import CustomSubtitle from '../../components/CustomSubtitle/CustomSubtitle';

 class TimerScreen extends Component {

    constructor(props) {
      super(props);
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    state = {
      currentTime: '00:00:00'
    }

    onNavigatorEvent(event) {
      switch(event.id) {
        case 'willAppear':
         break;
        case 'didAppear':
          this.timer = TimerMixin.setInterval(
            () => {
              this.getCurrentTime();
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

      let hour = new Date().getHours();
      let minutes = new Date().getMinutes();
      let seconds = new Date().getSeconds();

      minutes = (minutes < 10) ? '0' + minutes : minutes;
      seconds = (seconds < 10) ? '0' + seconds : seconds;
      hour = (hour < 10) ? '0' + hour : hour;

      this.setState(prevState => {
        return{
          ...prevState,
          currentTime: hour + ':' + minutes + ':' + seconds
        }
      });
    }


   render(){
     return(
       <View>
          <HeaderWithImage data="My Device"/>
          <CustomSubtitle> My phone </CustomSubtitle>
          <View style={styles.subcontainer}>
            <TimerClock currentTime={this.state.currentTime}/>
            <IconButton color='#0c0f1c' icon='md-time'>Set Time</IconButton>
          </View>
          <CustomSubtitle> My device </CustomSubtitle>
          <View style={styles.subcontainer}>
            <TimerCounter />
            <View><IconButton color='#0c0f1c' icon='md-time'>Read Time</IconButton></View>
          </View>
       </View>
     );
   }
 }

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

 export default TimerScreen;
