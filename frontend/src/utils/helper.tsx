export const money_format = (amount:number) => {
    const money = new Intl.NumberFormat('en-PH',{
        style: 'currency',
        currency: 'PHP'
    }).format(amount);

    return money;
}

export const date_format = (date:Date) => {
    const options:Intl.DateTimeFormatOptions = {
        year: 'numeric',     
        month: 'short',        
        day: '2-digit',        
        weekday: 'short',    
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export const nice_display_format = (str:string) => {
    return str.split(" ")
        .map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase()
        )
        .join(" ");
}