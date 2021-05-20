import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {UserService} from '../../user.service';
import {ServerService} from '../../service/server.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt = false;
  private postImageUrl: string;
  private profileImageUrl: string;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private serverService: ServerService
  ) {

    this.form = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    this.serverService.getUserData(this.userService.user).subscribe((result => {
      this.profileImageUrl = result.profileImageUrl;
    }));
  }
  imageUrl(imageUrl: string): any {
    console.log(imageUrl);
    this.postImageUrl = imageUrl;
  }
  async onSubmit(): Promise<void> {
    this.formSubmitAttempt = false;
    if (this.form.valid) {
        const title = this.form.get('title')?.value;
        const subtitle = this.form.get('subtitle')?.value;
        const description = this.form.get('description')?.value;
        const imageUrl = this.postImageUrl;
        const profileImageUrl = this.profileImageUrl;
        const user = this.userService.user;
        this.serverService.postPost({title, subtitle, description, imageUrl, profileImageUrl, user}).subscribe((result => {
            this.router.navigate(['/'], { queryParams: { username: this.userService.user}});

          }
        ));
    }
  }
}
