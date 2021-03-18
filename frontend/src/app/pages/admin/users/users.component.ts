import { Component } from '@angular/core';
import { UsersService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  users;
  loading = true;

  currentPage = 1;
  limit = 10;
  haveNext: boolean;

  constructor(private userService: UsersService) {
    this.getUsers(this.currentPage, this.limit);
  }

  getUsers(page, limit) {
    this.userService.getUsers(page, limit).subscribe((response) => {
      if(response.next === undefined) {
        this.haveNext = false;
      } else {
        this.haveNext = true;
      }
      this.users = response.results;
      this.loading = false;
    });
  }

  deleteUser(index) {
    if (this.users[index].username === 'admin') {
      alert("This user can't be deleted!");
    } else {
      const username = this.users[index].username;
      this.userService.deleteUser(username).subscribe(() => {
        this.users.splice(index, 1);
      });
    }
  }

  previousPage() {
    this.currentPage--;
    this.getUsers(this.currentPage, this.limit);
  }

  nextPage() {
    this.currentPage++;
    this.getUsers(this.currentPage, this.limit);
  }
}
