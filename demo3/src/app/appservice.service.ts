import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
export interface Employee {
  id: number | string;
  name: string;
  role: string;
}
@Injectable({
  providedIn: 'root',
})
export class AppserviceService {
  private API_URL = 'http://localhost:4000/api/';
  constructor(private http: HttpClient) {}

  addEmployee({ id, name, role }: Employee) {
    return this.http.post(this.API_URL, { id, name, role });
  }

  getEmployee() {
    return this.http.get(this.API_URL);
  }
  deleteEmployee(id: string | number) {
    return this.http.delete(this.API_URL + id);
  }
}
