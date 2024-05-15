
export const toUSD = (i) => {
    const number = parseFloat(i).toLocaleString('en-EN', {
        style: 'currency',
        currency: 'USD',
      })
    return number;
}