import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(registration: Registration): any {
    return this.http.post('http://localhost:8080/api/auth/signup', registration).pipe(
      catchError(this.errorMgmt)
    );
  }
  loginUser(login: Login): any {
    return this.http.post('http://localhost:8080/api/auth/signin', login).pipe(
      catchError(this.errorMgmt)
    );
  }
  authenicate(jwtToken: string): Observable < any > {
    const options =  {headers: { Authorization : jwtToken}, responseType: 'text' as 'text'};
    return this.http.get('http://localhost:8080/api/auth/authorize', options)
      .pipe(
        catchError(this.errorMgmt)
      );
  }
  errorMgmt(error: HttpErrorResponse): any {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}



export interface Registration {
  username: string;
  password: string;
  email: string;
  role: string[];
  profileImageUrl: string;
  bio: string;
}
export interface Login {
  username: string;
  password: string;
}
export interface AuthResponse {
  id: string;
  username: string;
  rules: string[];
  accessToken: string;
  tokenType: string;
}
