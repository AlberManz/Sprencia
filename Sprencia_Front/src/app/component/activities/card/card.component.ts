import { Component, Input } from '@angular/core';
import { Activity } from 'src/app/interfaces/activity.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() activity!: Activity | any;
}
