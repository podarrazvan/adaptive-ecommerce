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
  deleteIndex: number;
  deleteUser = false;

  constructor(private userService: UsersService) {
    this.getUsers(this.currentPage, this.limit);
  }

  getUsers(page, limit): void {
    this.userService.getUsers(page, limit).subscribe((response) => {
      if (response.next === undefined) {
        this.haveNext = false;
      } else {
        this.haveNext = true;
      }
      this.users = response.results;
      this.loading = false;
    });
  }

  deleteUserAlert(index): void {
    this.deleteIndex = index;
    if (this.users[index].username === 'admin') {
      alert('This user can\'t be deleted!');
    } else {
      this.deleteUser = true;
    }
  }

  onDelete(confirmed): void {
    if (confirmed) {
      const username = this.users[this.deleteIndex].username;
      this.userService.deleteUser(username).subscribe(() => {
        this.users.splice(this.deleteIndex, 1);
        this.deleteUser = false;
      });
    } else {
      this.deleteUser = false;
    }
  }

  updateAdmin(id, isAdmin, index): void {
    if (this.users[index].username !== 'admin') {
      this.userService.updateAdmin(id, isAdmin).subscribe(() => {
        alert('Admin Updated!');
        this.users[index].isAdmin = isAdmin;
      });
    } else {
      alert('This user can\'t be updated!');
    }
  }

  previousPage(): void {
    this.currentPage--;
    this.getUsers(this.currentPage, this.limit);
  }

  nextPage(): void {
    this.currentPage++;
    this.getUsers(this.currentPage, this.limit);
  }
}
