import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = 'http://localhost:3000/api/users';

  constructor(private httpClient: HttpClient) { }

  getById(): Promise<any> {
    const id = localStorage.getItem('id');
    return lastValueFrom(
      this.httpClient.get<User>(`${this.baseUrl}/profile/${id}`)
    )
  }

  getActivitiesBookedByUser(): Promise<any> {
    const id = localStorage.getItem('id');
    return lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/activities-booked/${id}`)
    )
  }

  getActivitiesDoneByUser(): Promise<any> {
    const id = localStorage.getItem('id');
    return lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/activities-done/${id}`)
    )
  }

  //Crear un usuario en base de datos desde el formulario registro
  create(formValue: any): Promise<User> {
    return lastValueFrom(
      this.httpClient.post<User>(`${this.baseUrl}/register`, formValue)
    );
  }

  createAdmin(formValue: any): Promise<User> {
    return lastValueFrom(
      this.httpClient.post<User>(`${this.baseUrl}/create-admin`, formValue)
    );
  }


  login(formValue: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, formValue)
    );
  }

  // Recuperacion de login para activar/desactivar funciones de header

  sendEmail(formValue: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/forget-password`, formValue)
    )
  }

  resetPassword(formValue: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/reset-password`, formValue)
    )
  }

  isLogged(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  // Recuperacion de role 'admin' para activar/desactivar funciones de header
  isAdmin(): boolean {
    let role = localStorage.getItem('role')
    if (role === 'admin') {
      return true;
    }
    return false;
  }


}
