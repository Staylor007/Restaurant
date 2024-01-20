import { Component } from '@angular/core';
import { ReservaService } from 'app/services/reserva/reserva.service';
import { DetallereservaService } from 'app/services/detallereserva/detallereserva.service';
import { Reserva } from '../../models/reserva';
import { DetalleReserva } from '@app/models/detallereserva';
import { UserService } from '@app/services/user/user.service';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent {

  user: any;

  
  list: Reserva[] = [];
  dat: any = [];
  loading: boolean = false;

  constructor(private ReservaService: ReservaService,private detallereservaService: DetallereservaService,
    private userService: UserService) { }

   
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getListProducts();   
  }

  getListProducts(){
    this.loading = true;
    this.ReservaService.getList().subscribe((data: Reserva[])=>{
      this.list = data.filter(res => res.id_bar === this.user.id_bar); 
      this.loading = false;
    })

  }
 
  delete(id: number){
    this.loading = true;
     this.ReservaService.delete(id).subscribe(()=>{
       this.getListProducts() 
     })
  }

  detalle(id:number){
    this.detallereservaService.get(id).subscribe((data)=>{
      this.dat = data;  
    })    
  }

}
