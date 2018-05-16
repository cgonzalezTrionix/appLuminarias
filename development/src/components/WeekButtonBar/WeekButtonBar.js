import React,{Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';

import CircleButton from '../UI/CircleButton/CircleButton';

import {selectDay} from '../../store/actions/index';


class WeekButtonBar extends Component {

  shouldComponentUpdate(nextProps, nextState){
    return true;
  }

  state = {
    iconSize: 40,
    colorBtn: '#0c0f1c'
  }

  selectButtonHandler = (id) => {
    this.props.onSelectDay(id);
  }

  render(){

    //let circleArray = null,
    const circleArray = this.props.weekDay.map((data,index) =>
      <CircleButton
        color={this.state.colorBtn}
        size={this.state.iconSize}
        disable={!data.checked}
        onPress={() => this.selectButtonHandler(index)}
        key={index}
      >
        {data.value}
      </CircleButton>
    );

    return(
        <View style={styles.container}>
          {circleArray}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    width:"90%",
    flexDirection: 'row',
    justifyContent:'space-between'
  }
})

const mapStateToProps = state => {
  return{
    weekDay: state.schedules.weekDay
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onSelectDay: (idDay) => dispatch(selectDay(idDay))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(WeekButtonBar);
