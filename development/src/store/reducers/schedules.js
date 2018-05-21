import {SELECT_DAY, SELECT_HOUR} from '../actions/actionsTypes';

const initialState = {
  weekDay:[
    {value:'L', checked: false},
    {value:'M', checked: false},
    {value:'Mi', checked: false},
    {value:'J', checked: false},
    {value:'V', checked: false},
    {value:'S', checked: false},
    {value:'D', checked: false}
  ],
  hours: [
    {id:0, value:'00:00', checked: false},
    {id:1, value:'00:30', checked: false},
    {id:2, value:'01:00', checked: false},
    {id:3, value:'01:30', checked: false},
    {id:4, value:'02:00', checked: false},
    {id:5, value:'02:30', checked: false},
    {id:6, value:'03:00', checked: false},
    {id:7, value:'03:30', checked: false},
    {id:8, value:'04:00', checked: false},
    {id:9, value:'04:30', checked: false},
    {id:10, value:'05:00', checked: false},
    {id:11, value:'05:30', checked: false},
    {id:12, value:'06:00', checked: false},
    {id:13, value:'06:30', checked: false},
    {id:14, value:'07:00', checked: false},
    {id:15, value:'07:30', checked: false},
    {id:16, value:'08:00', checked: false},
    {id:17, value:'08:30', checked: false},
    {id:18, value:'09:00', checked: false},
    {id:19, value:'09:30', checked: false},
    {id:20, value:'10:00', checked: false},
    {id:21, value:'10:30', checked: false},
    {id:22, value:'11:00', checked: false},
    {id:23, value:'11:30', checked: false},
    {id:24, value:'12:00', checked: false},
    {id:25, value:'12:30', checked: false},
    {id:26, value:'13:00', checked: false},
    {id:27, value:'13:30', checked: false},
    {id:28, value:'14:00', checked: false},
    {id:29, value:'14:30', checked: false},
    {id:30, value:'15:00', checked: false},
    {id:31, value:'15:30', checked: false},
    {id:32, value:'16:00', checked: false},
    {id:33, value:'16:30', checked: false},
    {id:34, value:'17:00', checked: false},
    {id:35, value:'17:30', checked: false},
    {id:36, value:'18:00', checked: false},
    {id:37, value:'18:30', checked: false},
    {id:38, value:'19:00', checked: false},
    {id:39, value:'19:30', checked: false},
    {id:40, value:'20:00', checked: false},
    {id:41, value:'20:30', checked: false},
    {id:42, value:'21:00', checked: false},
    {id:43, value:'21:30', checked: false},
    {id:44, value:'22:00', checked: false},
    {id:45, value:'22:30', checked: false},
    {id:46, value:'23:00', checked: false},
    {id:47, value:'23:30', checked: false}
  ]
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case SELECT_DAY:
      let newWeekDay = [...state.weekDay];
      newWeekDay[action.idDay].checked = !newWeekDay[action.idDay].checked;
      return{
        ...state,
        weekDay: newWeekDay
      };
    case SELECT_HOUR:
      let newHours = [...state.hours];
      newHours[action.idHour].checked = !newHours[action.idHour].checked;
      return{
        ...state,
        hours:newHours
      }

    default:
      return state;
  }
}

export default reducer;
