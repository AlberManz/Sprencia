import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  form: FormGroup;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
    this.form = new FormGroup({
      newPassword: new FormControl('',
        [
          Validators.required,
          Validators.minLength(5),
        ]),
      confirmPassword: new FormControl('',
        [
          Validators.required,
          Validators.minLength(5),
        ]),
    }, [this.passwordCompare]);
  }

  async onSubmit() {
    const email = localStorage.getItem('email');
    this.form.value.email = email
    console.log(this.form.value)
    const response = await this.usersService.resetPassword(this.form.value);
    console.log(response)
    if (response.status !== 'error') {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Contraseña cambiada correctamente',
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigate(['/login']);
    }
  }

  passwordCompare(pForm: AbstractControl): any {
    const newPassword = pForm.get('newPassword')?.value;
    const confirmPassword = pForm.get('confirmPassword')?.value;
    if (newPassword !== confirmPassword) {
      return { 'passwordcompare': true }
    }
    return null;
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.form.get(pControlName)?.hasError(pError) && this.form.get(pControlName)?.touched) {
      return true;
    } else {
      return false;
    }
  }
}
