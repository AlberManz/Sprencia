import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/interfaces/activity.interface';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css']
})
export class ActivitiesListComponent implements OnInit {

  arrActivities: Activity[] = [];

  constructor(private activitiesService: ActivitiesService) { }

  async ngOnInit(): Promise<any> {
    try {
      const response = await this.activitiesService.getAllHome();
      this.arrActivities = response.results;
    } catch (error) {
      console.log(error);
    }
  }
}
