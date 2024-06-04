import { useState } from 'react';
import * as Set from './constants';
import moment from 'moment';

const hasDecimal = (number) => number % 1 !== 0;

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

export const byNumber = (i) => {
  const num = i.replace(/[^0-9]/g, ''); // Replace any character that is not a digit with an empty string
  if (num.key == 'e' || num.key == 'E') {
    num.preventDefault();
  }
  if (num.length > 1 && num.charAt(0) === '0') {
      return num.slice(1);
  } else {
      return num
  }
}

export const byDecimals = (i,e) => {
    const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,10})/s
    return i.match(regex)[0]
}

export const byNoSpecial = (i) => {
  const num = i.replace(/[^a-zA-Z0-9!&. ]/g, '').replace(/\s{2,}/g, ' ').trimStart()
  return num
}

export const byNoSpaceCapital = (i) => {
  const num = i.replace(/[^a-zA-Z\s]/g, '').toUpperCase().slice(0, 5).trim()
  return num
}

export const byNoSpecialFull = (i) => {
  const num = i.replace(/[^a-zA-Z0-9!&. ]/g, '').replace(/\s{2,}/g, ' ').trim()
  return num
}

export const byWebAddress = (i) => {
  const num = i.replace(/[^a-zA-Z./?_\s-]/g, '').trim()
  return num
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

export const byHundred = (i) => {
  const num = i.replace(/[^0-9]/g, ''); // Replace any character that is not a digit with an empty string
  if (num.key == 'e' || num.key == 'E' || num.key == '.') {
    num.preventDefault();
  }
  if(i >=0 && i<=100 ){
    if (num.length > 1 && num.charAt(0) === '0') {
      return num.slice(1);
    } else {
      return num
    }
  } else {
      return 0
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

function formatDate(date) {
  const iDate   = new Date(date);
  const year = iDate.getFullYear().toString().padStart(4, '0');
  const month = (iDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const day = iDate.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function dateYMD(i) {
  const today = new Date(i); // Get the current date
  const formattedDate = moment(today).format('YYYY-MM-DD');
  return formattedDate
}


export const shortFileFormat = (header,rows) => {

  rows.map((i,index) =>{
    i[0] = formatDate(i[0])
    i[1] = byNoSpecialFull(i[1])
    i[2] = byNumber(i[2])
    i[3] = byDecimals(i[3])
    i[4] = byDecimals(i[4])
  })
  //console.log(rows)
  const output = rows.map(
              ii => Object.entries(ii).reduce((e, [ee, eee]) => ({
                  ...e, 
                  [header[ee]]: eee, 
                  "EDITED"        : false,
                  "DATEFROM"      :"",
                  "UPLINEID"      :"",
                  "UPLINEPERCENT" :"0",
                  "CLUBID"        :"",
                  "CLUBPERCENT"   :"0",
                  "FXUSD"         :"",
                  "FXDATE"        :"",
                  "FXCURRENCY"    :"",
                  "FXPROVIDER"    :"",
                  "BONUSPERCENTAGE":"",
                  "RESULT"        :"",
                  "AGENCYACTION"  :"",
                  "AGENCYBONUS"   :"",
              }), {})
  );

  return output
}

export const longFileFormat = (header,rows) => {

 const head = ['DATEUNTIL', 'CLUB', 'PLAYERID',  
                'WL: NLH', 'WL: FLH', 'WL: 6+', 'WL: PLO Hi', 'WL: PLO Hi/Lo', 'WL: FLO Hi', 'WL: FLO Hi/Lo', 'WL: MIXED', 'WL: OFC', 'WL: MTT', 'WL: SNG', 'WL: SPIN', 'WL: OTHERS',
                'B: NLH', 'B: FLH', 'B: 6+', 'B: PLO Hi', 'B: PLO Hi/Lo', 'B: FLO Hi', 'B: FLO Hi/Lo', 'B: MIXED', 'B: OFC', 'B: MTT', 'B: SNG', 'B: SPIN', 'B: OTHERS',
                'WINLOSSTOTAL','BONUSTOTAL',]

  rows.map((i,index) =>{
    i[0] = formatDate(i[0])
    i[1] = byNoSpecialFull(i[1])
    i[2] = byNumber(i[2])
    i[3] = byDecimals(i[3])
    i[4] = byDecimals(i[4])
    i[5] = byDecimals(i[5])
    i[6] = byDecimals(i[6])
    i[7] = byDecimals(i[7])
    i[8] = byDecimals(i[8])
    i[9] = byDecimals(i[9])
    i[10] = byDecimals(i[10])
    i[11] = byDecimals(i[11])
    i[12] = byDecimals(i[12])
    i[13] = byDecimals(i[13])
    i[14] = byDecimals(i[14])
    i[15] = byDecimals(i[15])
    i[16] = byDecimals(i[16])
    i[17] = byDecimals(i[17])
    i[18] = byDecimals(i[18])
    i[19] = byDecimals(i[19])
    i[20] = byDecimals(i[20])
    i[21] = byDecimals(i[21])
    i[22] = byDecimals(i[22])
    i[23] = byDecimals(i[23])
    i[24] = byDecimals(i[24])
    i[25] = byDecimals(i[25])
    i[26] = byDecimals(i[26])
    i[27] = byDecimals(i[27])
    i[28] = byDecimals(i[28])
    i[29] = parseFloat(byDecimals(i[3])) + parseFloat(byDecimals(i[4])) + parseFloat(byDecimals(i[5])) + parseFloat(byDecimals(i[6])) + parseFloat(byDecimals(i[7])) + parseFloat(byDecimals(i[8])) + parseFloat(byDecimals(i[9])) + parseFloat(byDecimals(i[10])) + parseFloat(byDecimals(i[11])) + parseFloat(byDecimals(i[12])) + parseFloat(byDecimals(i[13])) + parseFloat(byDecimals(i[14])) + parseFloat(byDecimals(i[15]))
    i[30] = parseFloat(byDecimals(i[16])) + parseFloat(byDecimals(i[17])) + parseFloat(byDecimals(i[18])) + parseFloat(byDecimals(i[19])) + parseFloat(byDecimals(i[20])) + parseFloat(byDecimals(i[21])) + parseFloat(byDecimals(i[22])) + parseFloat(byDecimals(i[23])) + parseFloat(byDecimals(i[24])) + parseFloat(byDecimals(i[25])) + parseFloat(byDecimals(i[26])) + parseFloat(byDecimals(i[27])) + parseFloat(byDecimals(i[28]))
  })



 // console.log(rows)
  const output = rows.map(
              ii => Object.entries(ii).reduce((e, [ee, eee]) =>  ({
                  ...e, 
                  [head[ee]]    : eee, 
                  "EDITED"        : false,
                  "DATEFROM"      :"",
                  "UPLINEID"      :"",
                  "UPLINEPERCENT" :"0",
                  "CLUBID"        :"",
                  "CLUBPERCENT"   :"0",
                  "FXUSD"         :"",
                  "FXDATE"        :"",
                  "FXCURRENCY"    :"",
                  "FXPROVIDER"    :"",
                  "BONUSPERCENTAGE":"",
                  "RESULT"        :"",
                  "AGENCYACTION"  :"",
                  "AGENCYBONUS"   :"",
              }), {})
  );

  return output
}