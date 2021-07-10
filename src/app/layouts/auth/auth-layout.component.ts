import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  styles: [':host /deep/ .mat-sidenav-content {padding: 0;} .mat-sidenav-container {z-index: 1000}'],
  templateUrl: './auth-layout.component.html'
})
export class AuthLayoutComponent {

  private _router: Subscription;
  private url: string = null;

  constructor( private router: Router) { }

  ngOnInit(): void {
    
  }
}
