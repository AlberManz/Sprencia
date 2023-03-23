import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  forms: FormGroup;
  email: any;
  password: any;
  role: any;
  errorMessage: string;

  constructor(private usersService: UsersService, private router: Router) {
    this.forms = new FormGroup({
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
    });

    this.errorMessage = '';
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (this.forms.get(pControlName)?.hasError(pError) && this.forms.get(pControlName)?.touched) {
      return true;
    } else {
      return false;
    }
  }

  async onSubmit() {
    this.errorMessage = '';
    const response = await this.usersService.login(this.forms.value);
    if (response.error) {
      this.errorMessage = response.error;
    } else {
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);
      localStorage.setItem('id', response.id);
      if (response.role === 'admin') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/activities']);
      }
    }
  }
}
