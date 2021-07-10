import { Pipe } from "@angular/core";

@Pipe({
    name: 'currencyChina'
})
export class CurrencyFormatChina {
    transform(value: number|string,
        chunkLength: number = 3): string {

        if(value) {
            let num = Number(value);

            var p = num.toFixed(2).split(".");
            //nếu số phần nghìn là 00 thì không hiển thị số phần nghìn
            if(p[1] == '00')
            {
                p[1] = "";
            }
            else
            {
                p[1] = "," + p[1];
            }
            return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
                return  num=="-" ? "-" + acc : num + (i && !(i % chunkLength) ? "." : "") + acc;
            }, "") + p[1];
        } else {
            return '0';
        }

    }
}