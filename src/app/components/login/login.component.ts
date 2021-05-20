import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthResponse, AuthService} from '../../service/auth.service';
import {UserService} from '../../user.service';
import {CookieService} from 'ngx-cookie-service';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public userService: UserService,
    private cookieService: CookieService
  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    // if (await this.authService.checkAuthenticated()) {
    //   await this.router.navigate([this.returnUrl]);
    // }
  }

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        await this.authService.loginUser({username, password}).subscribe((result => {
          if (result !== undefined && result !== null) {
            const verificationResult = result as AuthResponse;
            this.userService.user = verificationResult.id;
            this.userService.authToken = verificationResult.tokenType + ' ' + verificationResult.accessToken;
            this.cookieService.set('Proximate', verificationResult.tokenType + ' ' + verificationResult.accessToken, null, '/'
            , null, false, 'Strict');
            this.userService.user = username;
            this.router.navigate(['']);
          }
          }
        ));
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
