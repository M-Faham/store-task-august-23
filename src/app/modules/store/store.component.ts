import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  standalone: true
})
export class StoreComponent implements OnInit {

  constructor(
    protected _t: Title
  ) {
    _t.setTitle('Store');
  }

  ngOnInit() {
  }

}
