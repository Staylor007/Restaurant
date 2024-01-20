import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoService } from '@app/services/empleado/empleado.service';
import { UserService } from '@app/services/user/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {  
  user: any;
  empleado: any = [];
  form!: FormGroup;
  id: number = 0;


  constructor(private userService: UserService,private router: Router,
    private fb: FormBuilder) {}

  ngOnInit(): void { 

    this.form = this.fb.group({     
    id_usuario: ['', Validators.required],
    usuario: ['', Validators.required],
    contrasena: [''],
    nombre: ['', Validators.required],
    apellido: [''],
    cedula: [''],
    correo: [''],
    direccion: [''],
    telefono: [''],
    id_ciudad : [''],
    id_pais : [''],
    id_provincia : [''],
    id_tipo_usuario: ['']
  });
    this.user = this.userService.getCurrentUser(); 
    this.userService.get(this.user.userId).subscribe(data => {
      this.form.setValue(data)   
      this.id=this.user.userId;
    });
  }

  add(){ 
    const user = this.form.value;
    if(this.id !==0){    
      this.userService.update(this.id, user).subscribe(()=>{       
        this.router.navigate(['']); 
      })
    } 
  }

}
