import {SELECT_DAY, SELECT_HOUR, CHANGE_ALL} from './actionsTypes';

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

export const changeAll = (newDays,newHours) => {
  return{
    type: CHANGE_ALL,
    newDays: newDays,
    newHours: newHours
  }
}
