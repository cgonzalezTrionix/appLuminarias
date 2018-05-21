import React from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  AsyncStorage,
  StyleSheet
 } from 'react-native';

 import Icon from 'react-native-vector-icons/Ionicons';

 const popMessage = props => {
   return(
     <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.children}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon
          name={props.icon}
          color={props.iconColor}
          size={64}
        />
      </View>
     </View>
   );
 }

 const styles = StyleSheet.create({
   container: {
     alignItems:'center',
     width:250,
     borderRadius: 10,
     backgroundColor:'#fff'
   },
   titleContainer:{
     margin:20,
     marginTop:40
   },
   title:{
     fontSize:28,
     fontWeight:'bold',
     color:'#333',
     textAlign:'center'
   },
   iconContainer:{
     margin:10,
     marginBottom:40
   }
 });

 export default popMessage;
