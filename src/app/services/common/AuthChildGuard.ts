import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from '../../services/common/auth.service';

@Injectable()
export class AuthChildGuard implements CanActivate {
    constructor(
        private _authService: AuthService,
        private _router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        console.log(route.url);
        const isExist = localStorage.getItem("token") === null;
        if (!isExist) {
            this._router.navigate(['/ship-manager/orders']);
            return true;
        } else  if (!isExist && route.url[0].path !== 'authentication') {
            return true;
        } 
        else {
            this._router.navigate(['/authentication/login']);
            return false;
        }
    }
}
