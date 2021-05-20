import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: string;
  public authToken: string;
  constructor() {
    this.user = null;
  }
}
