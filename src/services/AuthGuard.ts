import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    console.log('AuthGuard canActivate called');
    const isLoggedIn = this.isUserLoggedIn();    

    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/todo' } });
      return false; 
    }
  }

  private isUserLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    console.log(token,'in authgaurd userlogged in function');
    
    return !!token;
  }
}
