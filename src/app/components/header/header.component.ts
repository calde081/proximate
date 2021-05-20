import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userId: string;
  constructor(public userServer: UserService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
  }
  logout(): any {
    this.cookieService.delete('proximate');
  }
}
