import { Component, OnInit } from '@angular/core';
import {Post, ServerService} from '../../service/server.service';
import { MatCarouselModule } from '@ngbmodule/material-carousel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  postCollection: Post[];

  title = 'proximate';
  constructor(private serverService: ServerService) {}
  ngOnInit(): void {
    this.postCollection = [];
    this.serverService.getPost().subscribe((result => {this.postCollection = result.reverse(); }));
  }

}
