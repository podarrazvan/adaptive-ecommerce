import { Component, OnInit } from '@angular/core';
import { DbFetchDataService } from '../../../shared/services/database/db-fetch-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users;

  constructor(private dbFetchDataService: DbFetchDataService) { }

  ngOnInit(): void {
    this.dbFetchDataService.fetchUsers().subscribe(users => this.users = users);
  }

}
