import { Component } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UsersService } from '../users/user.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent {
  admins: User[];
  addAdmin = false;

  constructor(private usersService: UsersService) {
    this.usersService.getAdmins().subscribe(results => {
      this.admins = results;
    });
   }

   onDelete(index) {
     if(this.admins[index].username === "admin") {
       alert("This admin can't be deleted!")
     } else {
       this.usersService.deleteAdmin(this.admins[index].username).subscribe(()=>this.admins.splice(index,1));
     }
   }
   adminCreated(newAdmin) {
    this.addAdmin = false
    this.admins.push(newAdmin);
   }

}
