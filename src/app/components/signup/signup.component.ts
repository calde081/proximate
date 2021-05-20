import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {Registration} from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt = false;
  private profileImageUrl: string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      bio: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    // if (await this.authService.checkAuthenticated()) {
    //   await this.router.navigate([this.returnUrl]);
    // }
  }
  imageUrl(imageUrl: string): any {
    this.profileImageUrl = imageUrl;
  }
  async onSubmit(): Promise<void> {
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        const bio = this.form.get('bio')?.value;
        await this.authService.registerUser({username, password, email: 'foo@bar.com', role: ['user'], bio, profileImageUrl: this.profileImageUrl }).subscribe((result => {
            this.router.navigate(['login']);
        }
        ));
      } catch (err) {
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

}
