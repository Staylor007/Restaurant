import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Usuario } from 'app/models/usuarios';
import { UserService } from '@app/services/user/user.service';

@Component({
  selector: 'app-add-edit-usuarios',
  templateUrl: './add-edit-usuarios.component.html',
  styleUrls: ['./add-edit-usuarios.component.css']
})
export class AddEditUsuariosComponent implements OnInit {
  form!: FormGroup;
  formControls: string[] = ['usuario', 'nombre', 'apellido'];
  inputType: { [key: string]: string } = {
    'usuario': 'text',
    'nombre': 'text',
    'apellido': 'text', 
  };

  loading: boolean = false;
  id: number;
  operacion: string = "Agregar ";


  constructor(private fb: FormBuilder,private userService: UserService,
    private router: Router,
    private aRouter: ActivatedRoute){ 
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    const formGroupConfig: { [key: string]: any } = {};

    this.formControls.forEach(control => {
      formGroupConfig[control] = [''];
    });

    this.form = this.fb.group(formGroupConfig);

    if (this.id !=0){
      this.operacion = 'Editar '
      this.get(this.id);
    }

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
      id_tipo_usuario: ['']
    });
  }

  get(id: number){
    this.loading = true;
    this.userService.get(id).subscribe((data:Usuario)=>{
      this.loading = false; 
      this.form.setValue(data)
    })    
  } 


  add(){ 
    const user = this.form.value;
    this.loading = true;

    if(this.id !==0){    
      console.log(user)
      this.userService.update(this.id, user).subscribe(()=>{       
        this.loading = false;  
        this.router.navigate(['usuario']); 
      })      
    }else{
      this.userService.registerUser(user).subscribe(()=>{
        this.loading = false;  
        this.router.navigate(['usuario']); 
    }) 
    }   
    this.loading = false;    
  }
}
