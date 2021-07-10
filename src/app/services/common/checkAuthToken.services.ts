import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from '../../services/common/auth.service';

@Injectable()
export class CheckAuthToken implements CanActivate {
    constructor(
        private _authService: AuthService,
        private _router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const isExist = localStorage.getItem("token") === null;
        if (isExist) {
            this._router.navigate(['/authentication/login']);
            localStorage.setItem('token', 'Login');
            return false;
        }
    }
}
