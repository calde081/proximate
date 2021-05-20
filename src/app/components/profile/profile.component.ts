import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ServerService} from '../../service/server.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public username: string;
  public bio: string;
  public profileImageUrl: string;


  constructor(
    private route: ActivatedRoute,private serverService: ServerService) {}

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        console.log(params.username);
        this.serverService.getUserData(params.username).subscribe((result => {
          this.username = result.username;
          this.bio = result.bio;
          this.profileImageUrl = result.profileImageUrl;
        }));
      });
  }

}
