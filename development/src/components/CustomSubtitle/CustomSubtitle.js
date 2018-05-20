import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

class CustomSubtitle extends Component {
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.timerText}>
          {this.props.children}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    width: "100%",
    padding: 5,
    backgroundColor: '#ccc',
    alignItems:'flex-start'
  },
  timerText:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000'
  }
});

export default CustomSubtitle;
