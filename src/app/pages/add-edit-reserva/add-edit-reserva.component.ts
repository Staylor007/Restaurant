import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Reserva } from 'app/models/reserva';
import { ReservaService } from 'app/services/reserva/reserva.service';

@Component({
  selector: 'app-add-edit-reserva',
  templateUrl: './add-edit-reserva.component.html',
  styleUrls: ['./add-edit-reserva.component.css']
})
export class AddEditReservaComponent implements OnInit {
  form!: FormGroup;
  formControls: string[] = [ 'fecha_reserva', 'estado', 'codigo_estado', 'comentario'];
  inputType: { [key: string]: string } = {
  
    'fecha_reserva': 'text',
    'estado': 'text',
    'codigo_estado': 'number',
    'comentario': 'text'   
  };

  loading: boolean = false;
  id: number;
  operacion: string = "Agregar ";


  constructor(private fb: FormBuilder,private reservaService : ReservaService,
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

    this.form = this.fb.group(formGroupConfig);
    if (this.id !=0){
      this.operacion = 'Editar '
      this.get(this.id);
    }

    this.form = this.fb.group({
      id_reserva: ['', Validators.required],
      id_usuario: ['', Validators.required],
     
      fecha_reserva: [''],
      estado: ['', Validators.required],
      codigo_estado: [''],
      comentario: ['']
    });
  }

  get(id: number){
    this.loading = true;
    this.reservaService.get(id).subscribe((data:Reserva)=>{
      this.loading = false; 
      console.log(data);
      this.form.setValue(data)
    })
    
  } 


  add(){ 

    const reserva = this.form.value;

    this.loading = true;

    if(this.id !==0){    
      console.log(reserva)
      this.reservaService.update(this.id, reserva).subscribe(()=>{       
        this.loading = false;  
        this.router.navigate(['reserva']); 
      })
      
    }else{
      this.reservaService.save(reserva).subscribe(()=>{
        this.loading = false;    
        this.loading = false;  
        this.router.navigate(['reserva']); 
    }) 
    }   
    this.loading = false;      

  }
}
