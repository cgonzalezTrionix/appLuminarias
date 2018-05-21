import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  AsyncStorage,
  StyleSheet
 } from 'react-native';

import Spinner from 'react-native-spinkit';
import TimerMixin from 'react-timer-mixin';

import HeaderWithImage from '../../components/HeaderWithImage/HeaderWithImage';
import IconCircleButton from '../../components/UI/IconCircleButton/IconCircleButton';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import PopMessage from '../../components/PopMessage/PopMessage';

 class SaveDataScreen extends Component {

   state = {
     filename: '',
     saving: false,
     saved: false
   }


   saveData = async(key,data) => {
     try {
       this.setState( prevState => {
         return{
           ...prevState,
           saving: true
         }
       });
       await AsyncStorage.setItem(key, data);
       this.setState( prevState => {
         return{
           ...prevState,
           saving: false,
           saved: true
         }
       });
       this.timer = TimerMixin.setTimeout(() => {
          this.closeSaveModal();
       }, 2000);

     } catch (error) {
     // Error saving data
     }

   }

   closeSaveModal = () => {
     TimerMixin.clearTimeout(this.timer);
     this.props.navigator.dismissModal({
       animationType: 'slide-down'
     });
   }

   onSaveButtonHandler = () => {
     const key = this.state.filename.trim();
     if(key !== ''){
       this.saveData(key,this.props.dataToSave);
     }else{
       alert('Please enter a name');
     }
   }

   onCloseButtonHandler = () => {
     this.props.navigator.dismissModal({
       animationType: 'slide-down'
     });
   }

   onInputChangedHandler(val){
     this.setState(prevState => {
       return{
         ...prevState,
         filename: val
       }
     })
   }

   render(){

     let contentData = null;
     if(this.state.saved){
      contentData = (
        <PopMessage
          icon='md-checkmark-circle-outline'
          iconColor='green'
        >
        Successfully Saved!
        </PopMessage>
      );
     }else{
       if(!this.state.saving){
         contentData = (
           <View style={styles.subcontainer}>
             <View style={styles.textContainer}>
               <Text style={styles.title}>Save Data</Text>
             </View>
             <DefaultInput
               onChangeText={(val) => this.onInputChangedHandler(val)}
               placeholder='Please enter filename'
               style={styles.inputContainer}
             />
             <View style={styles.buttonContainer}>
               <IconCircleButton
                 size={40}
                 color='#0c0f1c'
                 iconColor='white'
                 icon='md-checkmark'
                 onPress={() => this.onSaveButtonHandler()}
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
   buttonContainer:{
     width:"40%",
     alignItems:'center',
     flexDirection:'row',
     justifyContent:'space-between',
     marginBottom:30
   },
   inputContainer:{
     marginTop:20,
     marginBottom:20,
     width:"80%",
     borderRadius:5,
     borderWidth:1,
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
 })

 export default SaveDataScreen;
