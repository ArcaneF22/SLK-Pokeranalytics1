import * as Set from './constants';


export const toUSD = (i) => {
    const num = parseFloat(i).toLocaleString('en-EN', {
        style: 'currency',
        currency: 'USD',
      })
      if (num.key == 'e' || num.key == 'E') {
        num.preventDefault();
      }
    return num;
}

export const toMoney = (i,e) => {
  const num = i.replace(/[^0-9.]/g, '');
  if (num.key == 'e' || num.key == 'E') {
    num.preventDefault();
  }
  e(num);
}

export const toCurrency = (i,e,o) => {
  const num = parseFloat(i.replace(/[^\d.]/g, '')).toFixed(o);
  e(num)
}

export const toWholeNumber = (i,e) => {
  const num = i.replace(/[^0-9]/g, ''); // Replace any character that is not a digit with an empty string
  if (num.key == 'e' || num.key == 'E') {
    num.preventDefault();
  }
  e(num);
}

export const toWholeNumber5 = (i,e) => {
  const num = i.replace(/[^0-9]/g, ''); // Replace any character that is not a digit with an empty string
  if (num.key == 'e' || num.key == 'E') {
    num.preventDefault();
  }
  if(i >=0 && i<=10 ){
    e(num);
  } else if(i == 0){
    e("0");
  }
}

export const toHundred = (i,e) => {
  const num = i.replace(/[^0-9]/g, ''); // Replace any character that is not a digit with an empty string
  if (num.key == 'e' || num.key == 'E' || num.key == '.') {
    num.preventDefault();
  }
  if(i >=0 && i<=100 ){
      e(num);
  }
}

export const toHundredDec = (i,e) => {
  const num = i.replace(/[^0-9.]/g, ''); // Replace any character that is not a digit with an empty string
  if (num.key == 'e' || num.key == 'E') {
    num.preventDefault();
  }
  if(i >=0 && i<=100 ){
      e(num);
  }
}

export const turnPercent = (i) => {
  const num = Number(i)/100
  if (num.key == 'e' || num.key == 'E') {
    num.preventDefault();
  }
  return num;
}

export const toWordDate = (i) => {
  const newDate = new Date(i.DATEUNTIL).getTime()
  const formattedDate = Set.getDateTime(newDate);
  return formattedDate;
}

export const lastSunday = (i) => {
  const ddate = new Date(i.DATEUNTIL);
  const numDay = ddate.getDay();
  const Sun = new Date(ddate);
  Sun.setDate(ddate.getDate() - numDay);
  const sunday = Sun.toDateString()
  return sunday;
}
export const toFXDate = (i) => {
  const Nows      = new Date();
  const e         = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric'});
  if(i == 0 || i == ""){
      return e.format(Nows);
  } else {
      const u = new Date(i);
      return e.format(u);
  }
}