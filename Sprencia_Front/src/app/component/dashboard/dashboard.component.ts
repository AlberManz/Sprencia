import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category.interface';
import { City } from 'src/app/interfaces/city.interface';
import { ActivitiesService } from 'src/app/services/activities.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { CitiesService } from 'src/app/services/cities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  form: FormGroup;
  arrImages: File[] = [];

  arrCategories: Category[] = [];
  arrCities: City[] = [];
  arrShift: any[] = [];

  category!: string;
  city!: string;
  shift!: string;

  constructor(
    private categoriesService: CategoriesService,
    private citiesService: CitiesService,
    private activitiesService: ActivitiesService,
    private router: Router
  ) {
    this.form = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      resume: new FormControl(),
      category: new FormControl(),
      price: new FormControl(),
      city: new FormControl(),
      shift: new FormControl()
    })
  }

  async ngOnInit() {
    this.arrCategories = await this.categoriesService.getAllCategories();
    this.arrCities = await this.citiesService.getAllCities();
    this.arrShift = await this.activitiesService.getShift();
  }

  async onSubmit() {

    const { title, description, resume, category, price, city, shift } = this.form.value;
    // Creamos un FormData en el que le pasaremos todos los campos de form además de las imágenes subidas
    const fd = new FormData();

    fd.append('title', title);
    fd.append('description', description);
    fd.append('resume', resume);
    fd.append('category', category);
    fd.append('price', price);
    fd.append('city', city);
    fd.append('shift', shift);

    // Añadimos cada imagen al FormData
    for (let i = 0; i < this.arrImages.length; i++) {
      fd.append('images', this.arrImages[i], this.arrImages[i].name)
    }
    // Creamos la petición con el servicio
    let response = await this.activitiesService.create(fd);
    if (response) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Actividad creada correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/activities']);
    } else {
      console.log(response.error);
    }
  }

  // Subimos las imágenes
  uploadImages(event: any): void {
    this.arrImages = event.target.files;
  }

  getCategory($event: any) {
    this.category = $event.target.value;
  }

  getCity($event: any) {
    this.city = $event.target.value;
  }

  getShift($event: any) {
    this.shift = $event.target.value;
  }
}
