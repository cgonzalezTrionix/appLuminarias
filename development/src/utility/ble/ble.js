import bs64 from 'base64-js';

export const splitMessageData = (data, n) => {
  let finalMessage = [];
  const nPackets = Math.ceil(data.length/n);
  let i;
  for (i = 0; i < nPackets; i++){
    const idx = i*n;
    const tempMessage = data.substring(idx,idx+n);
    finalMessage.push(tempMessage);
  }
  return finalMessage;
}

export const btSetTimeMethod = () => {
  const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
  let datetime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);
  let message = {
    'action':'set',
    'data':{
      'time': datetime
    }
  }
  const finalMessage = JSON.stringify(message) + '\r\n';
  return finalMessage;
}

export const getSelectedDays = (data) => {
  let binDay = [];
  data.forEach( value => {
    if(value.checked){
      binDay.push('1');
    }else{
      binDay.push('0');
    }
  })
  return parseInt(binDay.join(''),2).toString(10);
}

export const getSelectedHours = (data) => {

  let temp = {
    initHour : '',
    nBlocks : 0
  };

  let pHours = [];
  let isChange = false;

  data.forEach( (res,idx) => {
    if(idx === 0){
      if(res.checked){
        temp.initHour = res.value;
        temp.nBlocks = temp.nBlocks + 1;
        isChange = true;
      }
    }else{
      if(res.checked !== data[idx-1].checked){ // Change exist
        if(!isChange) { // Start detection
          temp.initHour = res.value;
          temp.nBlocks = temp.nBlocks + 1;
          isChange = true;
        }else{
          pHours.push(temp);
          temp = {initHour : '', nBlocks : 0};
          isChange = false;
        }
      }else{
        if(isChange){ // There was a block detection
          temp.nBlocks = temp.nBlocks + 1;
        }
      }
    }
  });

  if(isChange){
    pHours.push(temp);
    isChange = false;
  }
  return pHours;
}

export const btSetSchedule = (selectedDay, selectedHours, status) =>{

  let schedules = [];

  let temp = {
    action: 'set',
    data:{
      offline:''
    }
  };

  selectedHours.forEach( data => {
    temp.data.offline = selectedDay+'-'+data.initHour+'-'+data.nBlocks+'-'+status;
    schedules.push(JSON.stringify(temp) + '\r\n');
  })

  return schedules;

}

export const btDecodeMessage = (file) => {
  const data = bs64.toByteArray(file.value);
  let dataStr = []
  data.forEach(data => {
    dataStr.push(String.fromCharCode(data));
  });
  const finalData = dataStr.join('');
  return finalData;
}

export const btEncodeMessage = (file) => {
  let temp = file.split('');
  temp = temp.map(char => {return char.charCodeAt(0)});
  temp = bs64.fromByteArray(temp);
  return temp;
}
