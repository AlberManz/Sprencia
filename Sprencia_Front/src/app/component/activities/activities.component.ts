import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/interfaces/activity.interface';
import { Category } from 'src/app/interfaces/category.interface';
import { City } from 'src/app/interfaces/city.interface';
import { ActivitiesService } from 'src/app/services/activities.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  // Variables para recoger datos
  arrCategories: Category[] = [];
  arrCities: City[] = [];
  arrShift: any[] = [];
  arrActivities: Activity[] = [];
  filteredActivities: Activity[] = [];



  // Variables para resetear campos select
  categoryValue!: any;
  cityValue!: any;
  shiftValue!: any;

  // Variables que recogen el valor de select
  category!: string;
  city!: string;
  shift!: string;

  // Variable mensaje sin resultados
  message!: string;

  // Variable para mostrar las actividades filtradas
  showFilteredActivities!: boolean;

  // Variable para ordenar por precio
  sortOrder: string = 'desc';

  // Inyectamos los servicios
  constructor(
    private categoriesService: CategoriesService,
    private citiesService: CitiesService,
    private activitiesService: ActivitiesService,

  ) { }

  // Cargamos los datos al cargar el componente
  async ngOnInit() {
    this.getData()
  }

  // Capturamos el valor de cada select
  getCategory($event: any) {
    this.category = $event.target.value;
  }

  getCity($event: any) {
    this.city = $event.target.value;
  }

  getShift($event: any) {
    this.shift = $event.target.value;
  }

  getByActivityiD($event: any) {
    this.getByActivityiD = $event.target.value;
  }


  // Función para filtrar
  filter() {
    this.filteredActivities = [...this.arrActivities];

    if (this.category) {
      this.filteredActivities = this.filteredActivities.filter(item => item.category.includes(this.category))
    }

    if (this.city) {
      this.filteredActivities = this.filteredActivities.filter(item => item.city.includes(this.city))
    }

    if (this.shift) {
      this.filteredActivities = this.filteredActivities.filter(item => item.shift.includes(this.shift))
    }

    if (this.filteredActivities.length > 0) {
      this.showFilteredActivities = true
      this.message = '';
    } else {
      this.filteredActivities
      this.message = "No hay resultados"
      this.showFilteredActivities = true
    }

  }

  // Función para borrar
  async delete() {
    this.getData();
  }

  // Función para ordenar
  sortProducts() {
    if (this.sortOrder === 'desc') {
      this.arrActivities.sort((a, b) => b.price - a.price);
      this.sortOrder = 'asc';
    } else {
      this.arrActivities.sort((a, b) => a.price - b.price);
      this.sortOrder = 'desc';
    }
  }

  // Función para la carga de información, componetizada para su reutilización
  async getData() {
    try {
      this.arrCategories = await this.categoriesService.getAllCategories();
      this.arrCities = await this.citiesService.getAllCities();
      this.arrShift = await this.activitiesService.getShift();
      this.arrActivities = await this.activitiesService.getAll();
      this.filteredActivities = [...this.arrActivities];
      this.showFilteredActivities = false;
      this.categoryValue = '';
      this.cityValue = '';
      this.shiftValue = '';
      this.category = '';
      this.city = '';
      this.shift = '';
      this.message = '';
    } catch (error) {
      console.log(error)
    }
  }
}

