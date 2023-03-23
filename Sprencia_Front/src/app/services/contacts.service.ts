import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class contactsService {
  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/contacto_empresas'
  }
  create(formContacto: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}`, formContacto)
    );
  }
}