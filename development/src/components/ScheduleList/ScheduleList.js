import React, {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import ListItemWithButton from '../UI/ListItemWithButton/ListItemWithButton';

class ScheduleList extends Component {

  render(){
    return(

      <View style={styles.container}>
        <FlatList
          data={this.props.data}
          renderItem={({ item }) => (
            <ListItemWithButton
              onPressDelete={() => this.props.onPressCancel(item.key)}
              onPressInfo={() => this.props.onPressInfo(item.key)}
              value={item.name}
              size={26}
            />
          )}
          keyExtractor={item => item.key.toString()}

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
    borderRadius: 5,
    margin:1,
    padding:0,
    alignItems:'center',
    justifyContent:'center'
  }
});

export default ScheduleList;
