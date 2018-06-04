import {createStore, combineReducers, compose} from 'redux';
import schedulesReducer from './reducers/schedules';
import bluetoothReducer from './reducers/bluetooth';

const rootReducer = combineReducers({
  schedules: schedulesReducer,
  ble: bluetoothReducer

});

let composeEnhancers = compose;

if (__DEV__){
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers());
}

export default configureStore;
