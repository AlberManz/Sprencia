import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  arrUsers: User[] = [];
  arrActivitiesBooked: any[] = [];
  arrActivitiesDone: any[] = [];


  constructor(
    private usersService: UsersService
  ) { }

  async ngOnInit() {
    this.arrUsers = await this.usersService.getById();
    this.arrActivitiesBooked = await this.usersService.getActivitiesBookedByUser();
    this.arrActivitiesDone = await this.usersService.getActivitiesDoneByUser()
  }
}
