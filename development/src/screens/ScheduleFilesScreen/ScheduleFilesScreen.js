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
import ScheduleList from '../../components/ScheduleList/ScheduleList';
import IconButton from '../../components/UI/IconButton/IconButton';
import WarningModal from '../../components/WarningModal/WarningModal';

import {btLoadingState} from '../../store/actions/index';

 class ScheduleFilesScreen extends Component {

   constructor(props) {
     super(props);
     this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
   }

   onNavigatorEvent(event) {
     switch(event.id) {
       case 'willAppear':
        break;
       case 'didAppear':
        this.loadFilenames();
         break;
       case 'willDisappear':
         break;
       case 'didDisappear':
         break;
       case 'willCommitPreview':
         break;
     }
   }

   state = {
     showCloseModal: false,
     selectedFile: 0,
     files: []
   }

   loadFilenames = async() => {
     try{
       this.props.onBtStatusLoading(true);
       const data = await AsyncStorage.getAllKeys();
       const temp = data.map( (value,key) => {
         return {key:key, name:value}
       });
       this.setState(prevState => {
         return{
           ...prevState,
           files:[...temp]
         }
       });
       this.props.onBtStatusLoading(false);
     }
     catch(e){
       console.log(e);
     }
   }

   onCloseModalHandler = () => {
      this.setState(prevState=>{
        return{
          ...prevState,
          showCloseModal:false
        }
      })
   }

   onDeleteBtnHandler = (key) => {
     //alert('Borrar el elemento' + this.state.files[key].name)
     console.log(key)
     this.setState(prevState => {
       return{
         ...prevState,
         selectedFile: key,
         showCloseModal:true
       }
     })
   }

   onInfoBtnHandler = (key) => {
       return;
   }

   removeElement = (array, key) => {
     console.log(array);
     console.log(key)
     return array.filter(e => e.key !== key);
   }

   onPressContinueHandler = async() => {
     try{
       console.log('Procedo a cancelar');
       this.setState(prevState => {
         return{
           ...prevState,
           showCloseModal:false
         }
       })
       this.props.onBtStatusLoading(true);
       await AsyncStorage.removeItem(this.state.files[this.state.selectedFile].name);
       await this.loadFilenames();
       this.props.onBtStatusLoading(false);
       //const temp = this.removeElement(this.state.files, this.state.selectedFile);

     }
     catch(e){
       console.log(e);
     }
   }

   render(){
     return(
       <View style={styles.container}>
          <WarningModal
            visible={this.state.showCloseModal}
            onPressContinue = {() => this.onPressContinueHandler()}
            onPressCancel = {() => this.onCloseModalHandler()}
            onRequestClose = {() => this.onCloseModalHandler()}
          />
          <HeaderWithImage data="My Device"/>
          <ScheduleList
            data={this.state.files}
            onPressCancel={this.onDeleteBtnHandler}
            onPressInfo={this.onInfoBtnHandler}
          />
       </View>
     );
   }
 }

 const styles = StyleSheet.create({
   container: {
     flex:1,
     alignItems: 'center'
   },
   btnContainer:{
     marginTop:10
   }
 });

 const mapStateToProps = state => {
    return{
      btIsLoading: state.ble.isLoading
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return{
        onBtStatusLoading: (status) => dispatch(btLoadingState(status))
    };
  };

 export default connect(mapStateToProps, mapDispatchToProps)(ScheduleFilesScreen);
