import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent {
  form: FormGroup;
  files: any;
  errorMessage: boolean;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
    this.errorMessage = false;

    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      surname: new FormControl('', [
        Validators.required
      ]),
      city: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required
      ]),
      birth_date: new FormControl('', [
        Validators.required
      ])
    }, [this.passwordCompare]);

  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.form.get(pControlName)?.hasError(pError) && this.form.get(pControlName)?.touched) {
      return true;
    } else {
      return false;
    }
  }

  passwordCompare(pForm: AbstractControl): any {
    const password = pForm.get('password')?.value;
    const confirmPassword = pForm.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { 'passwordcompare': true }
    }
    return null;
  }

  async onSubmit(): Promise<void> {
    let response = await this.usersService.createAdmin(this.form.value);

    if (response) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registro correcto',
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = true;
    }
  }
}

