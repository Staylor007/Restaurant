import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { NavbarComponent } from './pages/navbar/navbar.component';
import { AddEditMenuComponent } from './pages/add-edit-menu/add-edit-menu.component';
import { MenuComponent } from './pages/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ReservarComponent } from './pages/reservar/reservar.component';
import { AddEditReservaComponent } from './pages/add-edit-reserva/add-edit-reserva.component';
import { RegistroComponent } from './pages/registro/registro/registro.component'; 
import { BarComponent } from './pages/bar/bar.component';
import { AddEditBarComponent } from './pages/add-edit-bar/add-edit-bar.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AddEditUsuariosComponent } from './pages/add-edit-usuarios/add-edit-usuarios.component';
import { MapComponent } from './pages/map/map.component';

import { TableModule } from 'primeng/table';
 

import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { AddEditEmpleadoComponent } from './pages/add-edit-empleado/add-edit-empleado.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component'
import { BufferToImagePipe } from 'app/pages/buffer-to-image.pipe'

 

@NgModule({
  declarations: [
    AppComponent, 
    NavbarComponent,
    AddEditMenuComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    ReservarComponent,
    AddEditReservaComponent,
    RegistroComponent,
    BarComponent,
    AddEditBarComponent,
    UsuariosComponent,
    AddEditUsuariosComponent,
    MapComponent,
    EmpleadoComponent,
    AddEditEmpleadoComponent,
    PerfilComponent,
    RecuperarComponent,
    ResetPasswordComponent,
    BufferToImagePipe,
  
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule, 
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
