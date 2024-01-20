import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { UbicacionService } from '@app/services/ubicacion/ubicacion.service';
import { UserService } from '@app/services/user/user.service';
import { AppComponent } from '@app/app.component';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  paises: any[] = [];
  provincias: any[] = [];
  ciudades: any[] = [];

  selectedPais!: number; // Cambia el tipo según la estructura de tu modelo de país.
  id: number;

  form!: FormGroup;
  formControls: string[] = ['usuario', 'contrasena', 'nombre', 'apellido'
  ,'correo'];
  inputType: { [key: string]: string } = { 
    'usuario': 'text',
    'contrasena': 'password',
    'nombre': 'text',
    'apellido': 'text' , 
    'correo': 'email', 
  };
 
 
  constructor(private ubicacionService: UbicacionService,private fb:FormBuilder,
    private router: Router,private aRouter: ActivatedRoute,private appComponent: AppComponent,
     private userService: UserService){ 
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    this.appComponent.showNavbar = false;
  }

  ngOnInit() { 
    this.form = this.fb.group({
      id_usuario: [''],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required], 
      correo: [''],      
    });

    const formGroupConfig: { [key: string]: any } = {};

    this.formControls.forEach(control => {
      formGroupConfig[control] = [''];
    });

    // Agrega el control del país al formulario
    formGroupConfig['id_pais'] = [''];
    formGroupConfig['id_provincia'] = [''];
    formGroupConfig['id_ciudad'] = ['', Validators.required];


    this.form = this.fb.group(formGroupConfig);

    // Carga los países
    this.loadPaises();

    this.form.controls['id_pais'].valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((selectedCountryId: number) =>     
        this.ubicacionService.getProvincia(selectedCountryId)
      )
    )
    .subscribe((provincias: any[]) => { 
      this.provincias = provincias;
    });

    this.form.controls['id_provincia'].valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((selectedProvinceId: number) => this.ubicacionService.getCiudad(selectedProvinceId))
    )
    .subscribe((ciudades: any[]) => {
      console.log(ciudades);
      this.ciudades = ciudades;
    });
  }

  loadPaises() {
    this.ubicacionService.getPais().subscribe((paises) => {
      this.paises = [
        { id_pais: 0, nombre_pais: '--Selecciona un Pais' },
        ...paises // Agrega el resto de los países al arreglo.
      ];
    });
    this.selectedPais = 0;
  }

  registerUser() {
    if (this.form.valid) {
      const user = this.form.value;
      user.id_pais = this.form.value.id_pais;
      user.id_provincia = this.form.value.id_provincia;
      user.id_ciudad = this.form.value.id_ciudad; // Asigna la ciudad seleccionada 
      user.id_tipo_usuario = 1;
      // Llama al servicio para registrar al usuario
      this.userService.registerUser(user).subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
          this.router.navigate(['login']);  
          // Puedes redirigir al usuario a la página de inicio de sesión u otra página aquí
        },
        (error) => {
          console.error('Error durante el registro:', error);
          // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        }
      );
    }
  }


}
