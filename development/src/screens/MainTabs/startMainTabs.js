import {Navigation} from 'react-native-navigation';
import {
  Platform,
  StyleSheet
} from  'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = {
  titleStyle: {
    navBarBackgroundColor: '#0c0f1c',
    navBarTextColor: '#fff'
  },
  tabButtonStyle: {
    tabBarButtonColor: '#aaa',
    tabBarSelectedButtonColor: '#0c0f1c',
    tabBarBackgroundColor: '#eee'
  }
};

const startTabs = () => {
  Promise.all([
    Icon.getImageSource('md-clock',30),
    Icon.getImageSource('md-calendar',30),
    Icon.getImageSource('md-filing',30)
  ]).then(sources =>{
    Navigation.startTabBasedApp({
      tabs:[
        {
          screen: 'appLuminarias.TimerScreen',
          label: 'Timer',
          title: 'Lightning Control',
          icon: sources[0],
          navigatorStyle: styles.titleStyle
        },
        {
          screen: 'appLuminarias.ScheduleScreen',
          label: 'Programming',
          title: 'Lightning Control',
          icon: sources[1],
          navigatorStyle: styles.titleStyle
        },
        {
          screen: 'appLuminarias.ScheduleFilesScreen',
          label: 'My Schedules',
          title: 'Lightning Control',
          icon: sources[2],
          navigatorStyle: styles.titleStyle
        }
      ],
      tabsStyle: styles.tabButtonStyle,
      appStyle:styles.tabButtonStyle
    });
  });
}



export default startTabs;
