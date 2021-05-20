import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServerService} from '../../service/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  form: FormGroup;
  private updateImageurl: string;
  private formSubmitAttempt = false;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService, private serverService: ServerService) {
    this.form = this.fb.group({
      bio: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.serverService.getUserData(this.userService.user).subscribe((result => {
      this.form.patchValue({
        bio: result.bio
      });
      this.updateImageurl = result.profileImageUrl;
    }));
  }
  imageUrl(imageUrl: string): any {
    this.updateImageurl = imageUrl;
  }

  async onSubmit(): Promise<void> {
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      const bio = this.form.get('bio')?.value;
      this.serverService.updateUserData({username: this.userService.user, bio, profileImageUrl: this.updateImageurl}).subscribe((result => {
          this.router.navigate(['profile'], { queryParams: { username: this.userService.user}});
          console.log(result);
        }
      ));
    }
  }
}
