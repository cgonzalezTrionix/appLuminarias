import React,{Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import CircleButton from '../UI/CircleButton/CircleButton';

class WeekButtonBar extends Component {

  state = {
    weekDay:[
      {value:'L', checked: false},
      {value:'M', checked: false},
      {value:'M', checked: false},
      {value:'J', checked: false},
      {value:'V', checked: false},
      {value:'S', checked: false},
      {value:'D', checked: false}
    ],
    iconSize: 40,
    colorBtn: '#0c0f1c'
  }

  selectButtonHandler = (id) => {

    let newWeekDay = [...this.state.weekDay];
    newWeekDay[id].checked = !newWeekDay[id].checked;

    this.setState(prevState =>({
      ...prevState,
      weekDay: newWeekDay
    }));

  }

  render(){

    //let circleArray = null,
    const circleArray = this.state.weekDay.map((data,index) =>
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

export default WeekButtonBar;
