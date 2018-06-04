import React, {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import IconCircleButton from '../IconCircleButton/IconCircleButton'

class ListItemWithButton extends Component {

  shouldComponentUpdate(nextProps, nextState){
    //console.log('Render TouchableListItem' + nextProps.value);
    return nextProps.checked !== this.props.checked ||
           nextProps.value !== this.props.value;
  }

  render(){
    return(
      <TouchableOpacity onPress={this.props.onPress}>
        <View
          style={[
            styles.itemContainer,
            {backgroundColor:this.props.checked ? '#0c0f1c' : '#ddd'}
          ]}
        >
          <View style={styles.textContainer}>
            <Text
              style={[
                {color:this.props.checked ? '#000' : '#000'}
              ]}
            >
              {this.props.value}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <IconCircleButton
              color='#0c0f1c'
              icon='md-information'
              iconColor='white'
              size={this.props.size}
              onPress={this.props.onPressInfo}
            />
          </View>
          <View style={styles.iconContainer}>
            <IconCircleButton
              color='red'
              icon='md-remove'
              iconColor='white'
              size={this.props.size}
              onPress={this.props.onPressDelete}
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer:{
    width:"99.5%",
    borderRadius: 5,
    margin:1,
    padding:0,
    flexDirection:'row',
    alignItems:'center'
  },
  iconContainer:{
    width:"12%",
    alignItems:'center'
  },
  textContainer:{
    width:"76%",
    padding:10
  }
});

export default ListItemWithButton;
