import {Component, OnInit} from '@angular/core';
import {ApiUrl} from '../../services/api.url';
@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  public count: string;

  ngOnInit(): void {
  }

  changeCount(count) {
  }

}
