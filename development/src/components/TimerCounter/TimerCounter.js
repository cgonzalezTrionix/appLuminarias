import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import TimerMixin from 'react-timer-mixin';

class TimerCounter extends Component {

  state = {
    currentTime: '00:00:00'
  }

  componentDidMount(){

  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.timerText}>
          {this.state.currentTime}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    padding:5,
    alignItems:'center'
  },
  timerText:{
    fontSize: 50,
    color: '#000'
  }
});

export default TimerCounter;
