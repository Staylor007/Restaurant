import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth/auth.service';
import { AppComponent } from '@app/app.component';
import { MensajeService } from '@app/services/mensaje/mensaje.service';


@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent {
  form: FormGroup;
  origin:string='';

  constructor(private mensajeService: MensajeService,private fb: FormBuilder, private authService: AuthService,private appComponent: AppComponent) {
    this.appComponent.showNavbar = false;
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.origin = window.location.origin;
  }

  submit() {
    const email = this.form.value.email;

    this.authService.requestPasswordReset(email,this.origin).subscribe(
      (response) => {
        this.mensajeService.showAlert('Exito', response.message, 'success');
      },
      (error) => {
        this.mensajeService.showAlert('Error', 'No se encuentra correo electronico registrado', 'error');
        console.error('Password reset request failed', error.message);
      }
    );
  }

}
