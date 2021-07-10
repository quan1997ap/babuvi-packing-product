import { Pipe } from "@angular/core";

@Pipe({
    name: 'currencyFormat'
})
export class CurrencyFormat {
    transform(value: number|string,
        currencySign: string = '',
        decimalLength: number = 0, 
        chunkDelimiter: string = '.', 
        decimalDelimiter:string = ',',
        chunkLength: number = 3): string {

        let result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
        let num = Number(value).toFixed(Math.max(0, ~~decimalLength));

             //console.log((decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&' + chunkDelimiter) + currencySign);

        return (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&' + chunkDelimiter) + currencySign;
    }
}