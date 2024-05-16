import * as Set from './constants';

export function stringify(i) { 
  return JSON.stringify(i, null, 2);; 
}

export function isNumeric(i) { 
  return !isNaN(parseFloat(i)) && isFinite(i); 
}

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
  const form = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
  const dated = new Date(i).toLocaleDateString([], form);
  return dated;
}

export const lastSunday = (i) => {
  const ddate = new Date(i);
  const numDay = ddate.getDay();
  const Sun = new Date(ddate);
  Sun.setDate(ddate.getDate() - numDay);
  const form = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
  const dated = new Date(Sun).toLocaleDateString([], form);
  return dated;
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

export const toListState = (i,e) => {
  if (i == 1) {
    return  <div className='item'>
                {i} {e}
            </div>;
  } else if (i > 1) {
    return  <div className='item'>
                {i} {e}
            </div>;
  } else {
    return  ("");
  }
}

export const toStatus = (i,e) => {
  if (i == "Active" || i == 0) {
    return  <div className='ui label green basic center aligned fluid'>
                <i className="check circle outline icon"></i>
                Active
            </div>;
  } else if (i == "Pending" || i == 1) {
    return  <div className='ui label orange basic center aligned fluid'>
                <i className="spinner icon"></i>
                Pending
            </div>;
  } else {
    return  <div className='ui label red basic center aligned fluid'>
                <i className="times circle outline icon"></i>
                Inactive
            </div>;
  }
}