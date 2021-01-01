import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user.interface';
import { DbFetchDataService } from 'src/app/shared/services/database/db-fetch-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private dbFetchDataService: DbFetchDataService) { }

  users;

  ngOnInit(): void {
    this.dbFetchDataService.fetchUsers().subscribe(users => this.users = users);
  }

}
