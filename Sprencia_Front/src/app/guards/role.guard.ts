import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) { }

  //Guards de acceso para role de administradores que se ejecuta antes de cargar una ruta.
  canActivate(): boolean | UrlTree {
    let role: string | null = localStorage.getItem('role');

    if (role === 'admin') {
      return true;
    }
    this.router.navigate(['/activities']);
    return false;
  }

}
