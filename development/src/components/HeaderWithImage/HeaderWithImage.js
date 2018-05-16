import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class HeaderWithImage extends Component {

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.data !== this.props.data;
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={styles.iconWrapper}>
            <Icon
              name="md-wifi"
              color="white"
              size={40}
            />
          </View>
          <View>
            <Text style={styles.textWraper}>{this.props.data}</Text>
          </View>
        </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container:{
    width: "100%",
    height: 80,
    backgroundColor:'#0c0f1c'
  },
  subcontainer:{
    flex:1,
    alignItems:'center'
  },
  iconWrapper:{
    marginTop: 10,
  },
  textWraper:{
    color: 'white'
  }
});

export default HeaderWithImage;
