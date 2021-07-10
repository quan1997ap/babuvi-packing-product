export class DataParse {

    public formatMoney(num: string|number): string {
        return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }

}