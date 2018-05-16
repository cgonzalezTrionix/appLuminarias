import React, {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

class TouchableListItem extends Component {

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
          <Text
            style={[
              {color:this.props.checked ? '#fff' : '#777'}
            ]}
          >
            {this.props.value} hrs
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
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

export default TouchableListItem;
