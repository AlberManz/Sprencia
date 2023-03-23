import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Opinion } from '../interfaces/opinion';

@Injectable({
  providedIn: 'root'
})
export class OpinionsService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/opinions';
  }

  getByActivityId(id: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/activity/${id}`)
    );
  }









}



