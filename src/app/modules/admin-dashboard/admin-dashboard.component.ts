import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true
})
export class AdminDashboardComponent implements OnInit {

  constructor(
    protected _t: Title
  ) {
    _t.setTitle('Dashboard');
  }

  ngOnInit() {
  }

}
