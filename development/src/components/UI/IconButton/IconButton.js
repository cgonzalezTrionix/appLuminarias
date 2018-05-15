import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const iconButton = props => {
  return(
    <TouchableOpacity>
      <View
        style={[
          styles.button,
          {backgroundColor:props.color}
        ]}
      >
        <View style={styles.iconWrapper}>
          <Icon
            name={props.icon}
            color="white"
            size={20}
          />
        </View>
        <View>
          <Text style={{color:'white'}}>{props.children}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button:{
    margin:5,
    padding:10,
    borderRadius: 20,
    borderWidth:1,
    borderColor: 'black',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center'
  },
  iconWrapper:{
    marginRight:5
  }
});

export default iconButton;
