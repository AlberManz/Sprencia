import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/interfaces/activity.interface';
import { ActivitiesService } from 'src/app/services/activities.service';
import { OpinionsService } from 'src/app/services/opinions.service';
import { OpinionsListComponent } from '../home/opinions-list/opinions-list.component';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})

// Implementamos el método OnInit 
export class CardViewComponent implements OnInit {

  activity: Activity | any;
  arrImagenes: any[] = [];
  arrOpinions: any[] = [];

  // Capturamos las rutas necesarias 
  constructor(
    private activitiesService: ActivitiesService,
    private activatedRoute: ActivatedRoute,
    private opinionsService: OpinionsService
  ) { }


  ngOnInit() {
    //Capturamos la parte variable de la ruta
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = parseInt(params.id);

      let response = await this.activitiesService.getById(id);

      // Con los métodos ya implementamos optenemos la actividad junto con las imágenes y sus comentarios por el id
      this.activity = response;
      this.arrImagenes = response.images;
      this.arrOpinions = await this.opinionsService.getByActivityId(id)

    })
  }
}
