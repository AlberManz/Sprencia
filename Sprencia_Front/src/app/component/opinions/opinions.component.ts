import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Opinion } from 'src/app/interfaces/opinion';
import { OpinionsService } from 'src/app/services/opinions.service';

@Component({
  selector: 'app-opinions',
  templateUrl: './opinions.component.html',
  styleUrls: ['./opinions.component.css']
})

// Utilizamos el método OnInit 
export class OpinionsComponent implements OnInit {

  arrOpinions: Opinion[] = [];
  opinion!: string;
  // Capturamos las rutas 
  constructor(
    private opinionsService: OpinionsService,
    private activatedRoute: ActivatedRoute,

  ) { }

  // Con esta función obtendremos las opiniones de cada actividad 
  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = parseInt(params.id);
      console.log(id)
      let response = await this.opinionsService.getByActivityId(id);
      console.log(response)
      this.arrOpinions = response.opinion;
      console.log(this.arrOpinions);

    })

  }
}

