import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/categories';
  }

  getAllCategories(): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(this.baseUrl)
    );
  }

}
