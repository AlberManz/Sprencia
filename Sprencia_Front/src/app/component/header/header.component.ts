import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  id!: string | null;

  constructor(
    private router: Router,
    public usersService: UsersService,
  ) { }

  ngOnInit() {
    this.id = localStorage.getItem('id');
  }
  // Cierre de sesion borrando token de localhost
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');

    this.router.navigate(['/home']);
  }
}

