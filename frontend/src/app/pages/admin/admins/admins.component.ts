import { Component } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UsersService } from '../users/user.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
})
export class AdminsComponent {
  admins: User[];
  addAdmin = false;
  deleteAdmin = false;
  deleteIndex: number;

  constructor(private usersService: UsersService) {
    this.usersService.getAdmins().subscribe((results) => {
      this.admins = results;
    });
  }

  onDelete(confirmed) {
    if (confirmed) {
      this.usersService
        .deleteAdmin(this.admins[this.deleteIndex].username)
        .subscribe(() => this.admins.splice(this.deleteIndex, 1));
      this.deleteAdmin = false;
    } else {
      this.deleteAdmin = false;
    }
  }

  deleteAlert(index) {
    this.deleteIndex = index
    if (this.admins[this.deleteIndex].username === 'admin') {
      alert("This admin can't be deleted!");
    } else {
      this.deleteAdmin = true;
    }
  }
  adminCreated(newAdmin) {
    this.addAdmin = false;
    this.admins.push(newAdmin);
  }
}
