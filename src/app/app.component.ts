import { Component, OnInit } from '@angular/core';
import {Post} from './service/server.service';
import {AuthService} from './service/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from './user.service';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'proximate';
  constructor(private router: Router, private authService: AuthService, private cookieService: CookieService, private userService: UserService) {
    authService.authenicate(cookieService.get('Proximate')).subscribe(result => {
      userService.user = result;
      }, error => {
      this.router.navigate(['login']);
    });
  }

  ngOnInit(): void {
  }
}
