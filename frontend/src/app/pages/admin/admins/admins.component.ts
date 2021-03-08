import { Component } from '@angular/core';
import { DeleteAlertService } from 'src/app/shared/components/delete-alert/delete-alert.service';
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

  constructor(
    private usersService: UsersService,
    private deleteAlertService: DeleteAlertService
  ) {
    this.usersService.getAdmins().subscribe((results) => {
      this.admins = results;
    });
  }

  onDelete(index) {
    if (this.admins[index].username === 'admin') {
      alert("This admin can't be deleted!");
    } else {
      this.deleteAdmin = true;
      this.deleteAlertService.deleteAdmin.subscribe((response) => {
        switch (response) {
          case true:
            this.usersService
              .deleteAdmin(this.admins[index].username)
              .subscribe(() => this.admins.splice(index, 1));
            this.deleteAdmin = false;
            break;
          case false:
            this.deleteAdmin = false;
            break;
        }
      });
    }
  }
  adminCreated(newAdmin) {
    this.addAdmin = false;
    this.admins.push(newAdmin);
  }
}
