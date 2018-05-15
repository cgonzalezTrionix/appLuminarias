import {Navigation} from 'react-native-navigation';
//import {Provider} from 'react-redux';

import ScheduleScreen from './src/screens/ScheduleScreen/ScheduleScreen';

// redux
//import configureStore from './src/store/configureStore';

//const store = configureStore();


Navigation.registerComponent(
  'appLuminarias.ScheduleScreen',
  () => ScheduleScreen
);


//  Start appLuminarias
Navigation.startSingleScreenApp({
  screen:{
    screen: 'appLuminarias.ScheduleScreen',
    title: 'Lightning Control',
    navigatorStyle: {
      navBarBackgroundColor: '#0c0f1c',
      navBarTextColor: '#fff',
    }
  }
});
