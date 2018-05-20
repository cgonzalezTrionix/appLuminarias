import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet
 } from 'react-native';

  import HeaderWithImage from '../../components/HeaderWithImage/HeaderWithImage';

 class ScheduleFilesScreen extends Component {
   render(){
     return(
       <View>
          <HeaderWithImage data="My Device"/>
       </View>
     );
   }
 }

 export default ScheduleFilesScreen;
