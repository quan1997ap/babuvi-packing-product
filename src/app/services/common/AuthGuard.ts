import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from '../../services/common/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private _authService: AuthService,
        private _router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const isExist = localStorage.getItem("token") === null;
        if (!isExist) {
            return true;
        } else {
            this._router.navigate(['/authentication/login']);
            return true;
        }
    }
}
