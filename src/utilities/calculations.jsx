import * as Set from './constants';
import * as Func from './functions';


export const BonusPercent = (i) => {
    const e = Func.toUSD(( i.BonusTotal * Func.turnPercent(i.AgencyPercent) ).toFixed(i.Decimals))
    return e;
}

export const Result = (i) => {

    const BonusPercent = ( i.BonusTotal * Func.turnPercent(i.AgencyPercent) ).toFixed(i.Decimals)

    const e = Func.toUSD((( parseFloat(i.WinLoss) + parseFloat(BonusPercent) ) * parseFloat(i.FxUSD)) * Func.turnPercent(i.UplinePercent).toFixed(i.Decimals))

    return e;
}

export const AgencyAction = (i) => {
    const e = Func.toUSD((parseFloat(i.WinLoss) + parseFloat(i.BonusTotal)) * parseFloat(i.FxUSD))
    return e;
}

export const AgencyBonus = (i) => {
    const e = Func.toUSD((i.BonusTotal + i.FxUSD) * i.OtherPercent * i.FxUSD)
    return e;
}