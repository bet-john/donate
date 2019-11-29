import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { success } from 'src/app/sign-in/sign-in.component';
import { success_message } from 'src/app/sign-up/sign-up.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = 'http://localhost:5000';

  constructor(private http: HttpClient) { };
  createUser(Data): Observable<success_message> {
    return this.http.post<success_message>(`${this.uri}/users`, Data);
  };
  login(Data): Observable<success> {
    return this.http.post<success>(`${this.uri}/sessions`, Data);
  };
  forgotPassword(Data): Observable<success> {
    return this.http.post<success>(`${this.uri}/forgot-password`, Data);
  };
}
