import React, {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {selectHour} from '../../store/actions/index';
import TouchableListItem from '../UI/TouchableListItem/TouchableListItem';
class ScheduleTable extends Component {

  shouldComponentUpdate(nextProps, nextState){
    console.log('Updating.');
    return nextProps.hours !== this.props.hours;
  }

  hourBtnHandler = (id) => {
    this.props.onSelectHours(id);
  }

  render(){
    return(
      <View style={styles.container}>
        <FlatList
          data={this.props.hours}
          renderItem={({item}) => (
            <TouchableListItem
              checked={item.checked}
              value={item.value}
              onPress={() => this.hourBtnHandler(item.id)}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width:"90%",
    margin:15
  },
  itemContainer:{
    width:"99.5%",
    height:30,
    borderRadius: 5,
    margin:1,
    padding:0,
    alignItems:'center',
    justifyContent:'center'
  }
});

const mapStateToProps = state => {
  return{
    hours: state.schedules.hours
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onSelectHours: (idHour) => dispatch(selectHour(idHour))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ScheduleTable);
