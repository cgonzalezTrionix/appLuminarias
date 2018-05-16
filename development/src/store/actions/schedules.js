import {SELECT_DAY, SELECT_HOUR} from './actionsTypes';

export const selectDay = (idDay) => {
  return{
    type: SELECT_DAY,
    idDay: idDay
  }
}

export const selectHour = (idHour) => {
  return{
    type: SELECT_HOUR,
    idHour: idHour
  }
}
