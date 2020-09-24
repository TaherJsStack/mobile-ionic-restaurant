import { Injectable } from '@angular/core';
import { Subject } from 'node_modules/rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const BACKEND_API = environment.API_URL + '/tables/';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  tables;

  constructor( private http: HttpClient) { }

  createingBook(bookData: any) {
    return this.http.post<{ message: string }>(BACKEND_API, bookData);
  }

  getBookins() {
    return this.http.get<{ categories: any, message: string }>(BACKEND_API);
  }

}
