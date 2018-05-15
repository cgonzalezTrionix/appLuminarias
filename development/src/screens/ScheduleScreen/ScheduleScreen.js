import React, {Component} from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import HeaderWithImage from '../../components/HeaderWithImage/HeaderWithImage';
import IconButton from '../../components/UI/IconButton/IconButton';

class ScheduleScreen extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <HeaderWithImage data="My Device"/>
          <View style={styles.btnTimer}>
            <IconButton color='#0c0f1c' icon='md-time'>Set Current Time</IconButton>
          </View>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center'
  },
  btnTimer:{
    marginTop:20
  }
});

export default ScheduleScreen;
