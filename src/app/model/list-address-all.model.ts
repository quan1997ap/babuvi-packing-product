import { lstCountry } from "./country.model";
import { NewAddress } from "./new-address.model";

export class lstAddressAll {
    district?: lstCountry[] = [];
    lstDataCountry?: lstCountry[] = [];
    nation?: lstCountry[] = [];
    lstItem: NewAddress;
}