export const money_format = (amount:number) => {
    const money = new Intl.NumberFormat('en-PH',{
        style: 'currency',
        currency: 'PHP'
    }).format(amount);

    return money;
}