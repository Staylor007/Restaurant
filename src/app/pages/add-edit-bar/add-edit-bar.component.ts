import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Bar } from 'app/models/bar';
import { BarService } from 'app/services/bar/bar.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'; // Asegúrate de importar DomSanitizer


@Component({
  selector: 'app-add-edit-bar',
  templateUrl: './add-edit-bar.component.html',
  styleUrls: ['./add-edit-bar.component.css']
})
export class AddEditBarComponent implements OnInit {
  form!: FormGroup;
  formControls: string[] = ['nombre_bar', 'desayuno_horario', 'almuerzo_horario','merienda_horario'];
  inputType: { [key: string]: string } = { 
    'nombre_bar': 'text',
    'desayuno_horario': 'text',
    'almuerzo_horario': 'text'  ,
    'merienda_horario': 'text'   
  };

  loading: boolean = false;
  id: number;
  operacion: string = "Agregar ";


  constructor(private fb: FormBuilder,private barService : BarService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private sanitizer: DomSanitizer){ 
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
      this.getrpoduct(this.id);
    }

    this.form = this.fb.group({
      id_bar: [''],
      nombre_bar: ['', Validators.required],
      id_ubicacion : [''],
      nombre_ubicacion:[''],
      desayuno_horario: ['', Validators.required],
      almuerzo_horario: ['', Validators.required],
      merienda_horario: ['', Validators.required], 
      latitud:['', Validators.required],
      longitud:['', Validators.required],
      imagen:['']
    });

    this.barService.getCoordinates().subscribe(coordinates => {
      if (coordinates) {
        // Actualizar el formulario con las coordenadas recibidas
        this.form.patchValue({
          latitud: coordinates.latitud,
          longitud: coordinates.longitud,
        });
      }
    });
  }

  getrpoduct(id: number) {
    this.loading = true;
    this.barService.get(id).subscribe((data: Bar) => {
      this.loading = false; 
      if ('latitud' in data && 'longitud' in data) {
        this.form.patchValue({
          latitud: data.latitud,
          longitud: data.longitud,
        });
        this.cordenadas(data.longitud,data.latitud) 
      }   

      this.form.setValue({
        ...data, 
        latitud: this.form.value.latitud,
        longitud: this.form.value.longitud,
      });  
    });      
  }

  cordenadas(longitud:any,latitud:any){
    const coordinates = {
      latitud: longitud,
      longitud: latitud,
    }; 
    this.barService.sendCoordinates(coordinates);
  }
  

  add(){ 
    const bar = this.form.value;
    const imageFile = this.form.get('imagen')?.value;
    this.loading = true;  
    if(this.id !== 0){   
      this.barService.update(this.id, bar,imageFile).subscribe(()=>{       
        this.loading = false;  
        this.router.navigate(['bar']); 
      })      
    }else{ 
      this.barService.save(bar,imageFile).subscribe(()=>{
        this.loading = false;    
        this.router.navigate(['bar']); 
    }) 
    }   
    this.loading = false;      
  }

  handleImageUpload(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.form.patchValue({
        imagen: file,
      });
    }
  }
 
}
