import {BT_CONN_DEVICE, BT_TURN_HW, BT_UPDATE_DEVICE, BT_LOADING_STATE} from './actionsTypes';

export const btConnectDevice = (isConnected) => {
  return{
    type: BT_CONN_DEVICE,
    isConnected: isConnected
  }
};

export const btTurnHardware = (btState) => {
  return{
    type: BT_TURN_HW,
    btState: btState
  }
};

export const btUpdateDevice = (device, service, charact) => {
  return{
    type: BT_UPDATE_DEVICE,
    device: device,
    service: service,
    charact: charact
  }
}

export const btLoadingState = (status) => {
  return{
    type: BT_LOADING_STATE,
    status: status
  }
}
