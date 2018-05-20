import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

class TimerClock extends Component {

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.timerText}>
          {this.props.currentTime}
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

export default TimerClock;
