import { Injectable } from '@angular/core';
import { CanActivate,  Router,  UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {


  //Guard de acceso para Login correcto
  constructor(private router: Router) {}

    canActivate(): boolean | UrlTree {
      let token: string | null = localStorage.getItem('token');

      if (token === null)
      {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }

  
}
