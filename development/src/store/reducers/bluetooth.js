import {BT_CONN_DEVICE, BT_TURN_HW, BT_UPDATE_DEVICE, BT_LOADING_STATE} from '../actions/actionsTypes';
import { BleManager } from 'react-native-ble-plx';

const manager =  new BleManager();

const initialState = {
  btManager: manager,
  btDevice: null,
  btService: null,
  btCharacteristic:null,
  isTurnOn: false,
  isConnected: false,
  isLoading: false
};

const reducer = (state=initialState,action) => {
  switch(action.type){

    case BT_CONN_DEVICE:
      return{
        ...state,
        isConnected: action.isConnected
      };

    case BT_TURN_HW:
      return{
        ...state,
        isTurnOn: action.btState
      };

    case BT_UPDATE_DEVICE:
      return{
        ...state,
        btDevice: action.device,
        btService: action.service,
        btCharacteristic: action.charact
      }

    case BT_LOADING_STATE:
      return{
        ...state,
        isLoading: action.status
      }

    default:
      return state;
  }
};

export default reducer;
