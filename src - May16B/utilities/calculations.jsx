import * as Set from './constants';
import * as Func from './functions';

export const BonusPercent = (i) => {
    const e = Func.toUSD(( i.BonusTotal * Func.turnPercent(i.AgencyPercent) ).toFixed(i.Decimals))
    return e;
}

export const Result = (i) => {
    const e = Func.toUSD((i.WinLoss + i.BonusTotal) * i.FxUSD * Func.turnPercent(i.UplinePercent))
    return e;
}

export const AgencyAction = (i) => {
    const e = Func.toUSD((i.WinLoss + i.BonusTotal) * i.FxUSD)
    return e;
}

export const AgencyBonus = (i) => {
    const e = Func.toUSD((i.BonusTotal + i.FxUSD) * i.OtherPercent * i.AgencyPercent)
    return e;
}