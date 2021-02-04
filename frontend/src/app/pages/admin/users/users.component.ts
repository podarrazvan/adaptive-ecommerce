import { Component, OnInit } from '@angular/core';
import { DbGetDataService } from 'src/app/shared/services/database/db-get-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users;

  constructor(private dbGetDataService: DbGetDataService) { }

  ngOnInit(): void {
    this.dbGetDataService.getUsers().subscribe(response => this.users = response);
  }

}
