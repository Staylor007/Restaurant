import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { MensajeService } from '@app/services/mensaje/mensaje.service';
import { UserService } from '@app/services/user/user.service';
import {AuthService } from 'app/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  form: FormGroup;
  showPassword: boolean = false;


  constructor(private fb: FormBuilder,private appComponent: AppComponent,
    private router: Router,private authService: AuthService,
    private userService: UserService,private mensajeService: MensajeService) {
    // Ocultar el navbar cuando se carga la página de inicio de sesión
    this.appComponent.showNavbar = false;
    this.form = this.fb.group({
      username:[null],
      password:[null], 
    });
  }
  

  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() { 
    this.authService.login(this.form.value.username, this.form.value.password).subscribe((response) => {
      if (response.success) {
        this.appComponent.showNavbar = true;            
        const token = response.token;
        // Guarda el token en localStorage
        this.authService.setToken(token);
        // Recupera información del usuario (puedes ajustar según tu API)
         const user = {
          userId: response.user.id_usuario,
          usuario: response.user.usuario,
          tipo_usuario:response.user.nombre_tipo_usuario,
          id_tipo_usuario:response.user.id_tipo_usuario,
          id_bar:response.user.id_bar,
          nombre_bar:response.user.nombre_del_bar
        }; 
        // Almacena el usuario en el servicio
        this.userService.setCurrentUser(user);
        if(user.tipo_usuario == 'Empleado' || user.tipo_usuario == 'Administrador'){
          this.router.navigate(['']); 
        }else{
          this.authService.logout();
        }

      }else {
        this.mensajeService.showAlert('Error', 'Usuario o Contraseña Incorrectos','error');
        console.log('Login failed', response.message);
      }
    },
    (error) => {
      // Manejar el error aquí
      console.error('Error en la solicitud de inicio de sesión:', error);
      this.mensajeService.showAlert('Error', 'Hubo un error en la solicitud de inicio de sesión', 'error');
    });
  }
  
}
