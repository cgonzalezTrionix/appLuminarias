import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const iconCircleButton = props => {

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
            },
            props.style
          ]}
        >
        <Icon
          name={props.icon}
          color={props.iconColor}
          size={props.size*0.6}
        />
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

export default iconCircleButton;
