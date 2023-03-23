import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/interfaces/category.interface';
import { contactsService } from 'src/app/services/contacts.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})

export class ContactoComponent implements OnInit {
  formulario: FormGroup;
  errorMessage: string;
  arrCategories: Category[] = [];
  category!: string;

  constructor(
    private categoriesService: CategoriesService,
    private contactsService: contactsService,
    private router: Router
  ) {
    this.errorMessage = '';
    this.formulario = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      web: new FormControl(),
      city: new FormControl(),
      activity: new FormControl(),
      category: new FormControl(),
      comment: new FormControl(),
      number: new FormControl()
    });
  }
  async ngOnInit() {
    this.arrCategories = await this.categoriesService.getAllCategories();
  }
  async onSubmit() {
    console.log(this.formulario.value);
    const response = await this.contactsService.create(this.formulario.value);
    if (response) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Solicitud enviada',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/home']);
    } else {
      console.log(response.error);
    }
  }

  getCategory($event: any) {
    this.category = $event.target.value;
  }
}