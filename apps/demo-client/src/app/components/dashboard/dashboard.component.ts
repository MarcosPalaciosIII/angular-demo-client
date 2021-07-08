import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-client-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  title = 'Demo App';

  ngOnInit(): void {
  }

}
