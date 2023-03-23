import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  form: FormGroup;
  errorMessage: boolean;


  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
    this.errorMessage = false;
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ])
    });
  }

  async onSubmit() {
    const response = await this.usersService.sendEmail(this.form.value)

    if (response.success) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Email enviado',
        text: 'Revisa tu bandeja de entrada',
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigate(['/login']);
      localStorage.setItem('email', response.email)
    } else {
      this.errorMessage = true
    }
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.form.get(pControlName)?.hasError(pError) && this.form.get(pControlName)?.touched) {
      return true;
    } else {
      return false;
    }
  }
}
