import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Registration} from './auth.service';
import {throwError} from 'rxjs';
import {UserService} from '../user.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient, private userService: UserService,private cookieService: CookieService) { }


  getPost(): any {
    const options = {
      headers: new HttpHeaders({Authorization: this.cookieService.get('Proximate')})
    };
    return this.http.get('http://localhost:8080/api/proximate/post', options).pipe(
      catchError(this.errorMgmt)
    );
  }

  getUserData(username: string): any {
    const options = {
      headers: new HttpHeaders({Authorization: this.cookieService.get('Proximate')})
    };
    return this.http.get('http://localhost:8080/api/proximate/user' + '?username=' + username, options).pipe(
      catchError(this.errorMgmt)
    );
  }

  updateUserData(newData: UpdateUserData): any {
    const options = {
      headers: new HttpHeaders({Authorization: this.cookieService.get('Proximate')})
    };
    return this.http.post('http://localhost:8080/api/proximate/update-user', newData, options).pipe(
      catchError(this.errorMgmt)
    );
  }
  postPost(newPost: Post): any {
    const options = {
      headers: new HttpHeaders({Authorization: this.cookieService.get('Proximate')})
    };
    return this.http.post('http://localhost:8080/api/proximate/post', newPost, options).pipe(
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
export interface Post {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  profileImageUrl: string;
  user: string;
}
export interface UserData {
  username: string;
  email: string;
  bio: string;
  profileImageUrl: string;
}

export interface UpdateUserData {
  username: string;
  bio: string;
  profileImageUrl: string;
}
