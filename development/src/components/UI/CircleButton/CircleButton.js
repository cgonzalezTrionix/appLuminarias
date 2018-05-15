import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from 'react-native';

const circleButton = props => {

  return(
      <TouchableOpacity onPress={props.onPress}>
        <View
          style={[
            styles.button,
            {
              backgroundColor: props.disable ? '#ddd' : props.color,
              width: props.size,
              height: props.size,
              borderRadius: props.size/2
            }
          ]}
        >
          <Text style={{color:'white', fontSize:props.size/3, textAlign:'center'}}>{props.children}</Text>
        </View>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button:{
    alignItems:'center',
    justifyContent: 'center'
  },
})

export default circleButton;
