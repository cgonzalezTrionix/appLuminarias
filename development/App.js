import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

import startMainTabs from './src/screens/MainTabs/startMainTabs';

import ScheduleScreen from './src/screens/ScheduleScreen/ScheduleScreen';
import TimerScreen from './src/screens/TimerScreen/TimerScreen';
import ScheduleFilesScreen from './src/screens/ScheduleFilesScreen/ScheduleFilesScreen';
import SaveDataScreen from './src/screens/SaveDataScreen/SaveDataScreen';

// redux
import configureStore from './src/store/configureStore';

const store = configureStore();


Navigation.registerComponent(
  'appLuminarias.ScheduleScreen',
  () => ScheduleScreen,
  store,
  Provider
);

Navigation.registerComponent(
  'appLuminarias.TimerScreen',
  () => TimerScreen,
  store,
  Provider
);

Navigation.registerComponent(
  'appLuminarias.ScheduleFilesScreen',
  () => ScheduleFilesScreen,
  store,
  Provider
);

Navigation.registerComponent(
  'appLuminarias.SaveDataScreen',
  () => SaveDataScreen,
  store,
  Provider
);

startMainTabs();
//  Start appLuminarias
// Navigation.startSingleScreenApp({
//   screen:{
//     screen: 'appLuminarias.ScheduleScreen',
//     title: 'Lightning Control',
//     navigatorStyle: {
//       navBarBackgroundColor: '#0c0f1c',
//       navBarTextColor: '#fff',
//     }
//   }
// });
