import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { UserService } from '@app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user: any;

  constructor(private userService: UserService,private authService: AuthService, private router: Router,) {}

  ngOnInit(): void {
    // Obtén el usuario del servicio
    this.user = this.userService.getCurrentUser();
  }

  
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);   
  }

}
