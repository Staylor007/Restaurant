import { Component } from '@angular/core';
import { ReservaService } from 'app/services/reserva/reserva.service';
import { DetallereservaService } from 'app/services/detallereserva/detallereserva.service';
import { Reserva } from '../../models/reserva';
import { DetalleReserva } from '@app/models/detallereserva';
import { MenuService } from '@app/services/menu/menu.service';
import { UserService } from '@app/services/user/user.service'; 
import { BarService } from '@app/services/bar/bar.service';
import { Subscription, interval } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  products!: any[];
  platos : number = 0;
  users : number = 0;
  bar : number = 0;
  user: any;
  platosbar: number=0;

  
  list: Reserva[] = [];
  dat: any  = [];
  loading: boolean = false;

  
  private tiempoRestanteSub: Subscription = new Subscription();

  constructor(private ReservaService: ReservaService,
    private detallereservaService: DetallereservaService,
    private barService: BarService,
    private menuService: MenuService,
    private userService: UserService) { }

   
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.menuService.getList().subscribe((data)=>{  
      this.platos = data.length;              
    })   
    this.menuService.getListBar(this.user.id_bar).subscribe((data:any)=>{       
      this.platosbar = data.length;      
    })   
    this.userService.getList().subscribe((data)=>{  
      this.users = data.length;              
    })    
    this.barService.getList().subscribe((data)=>{  
      this.bar = data.length;              
    })    
    this.getList();   
    this.tiempoRestanteSub = interval(60000).subscribe(() => {
      this.actualizarTiempoRestante();
    });
  }

  ngOnDestroy(): void {
    // Desinscribirse del temporizador al destruir el componente
    if (this.tiempoRestanteSub) {
      this.tiempoRestanteSub.unsubscribe();
    }
  }

  getList(){
    this.ReservaService.getList().subscribe((data: Reserva[])=>{
      console.log(data)
      this.list = data.filter(res => res.estado === 'Pendiente' && res.id_bar === this.user.id_bar); 
      this.actualizarTiempoRestante(); 
    }) 
  }

  private actualizarTiempoRestante() {
    const ahora = new Date();

    this.list.forEach(reserva => {
        const fechaReserva = new Date(reserva.fecha_reserva);
        const diferenciaEnMilisegundos = ahora.getTime() - fechaReserva.getTime();
        const tiempoRestante = Math.max(30 - Math.floor(diferenciaEnMilisegundos / (1000 * 60)), 0);    
        // Actualizar el tiempo restante para la reserva actual
        reserva.tiempoRestante = tiempoRestante;
       // Actualizar el tiempo restante para la reserva actual
      reserva.tiempoRestante = tiempoRestante;
      if (tiempoRestante <= 0) {
        this.proceso30min(reserva);
      }
    });
  }

  detalle(id:number){
    this.detallereservaService.get(id).subscribe((data)=>{  
      this.dat = data;  
    })    
  }

  cancelar(reserva: Reserva){
    reserva.estado = 'Cancelado'
      const idReserva = reserva.id_reserva ?? -1;
      this.ReservaService.updateestado(idReserva, reserva).subscribe(() => {
        this.getList();
      });      
  }

  entregado(reserva: Reserva){
    reserva.estado = 'Entregado'
      const idReserva = reserva.id_reserva ?? -1;
      this.ReservaService.updateestado(idReserva, reserva).subscribe(() => {
        this.getList();
      });
      
  }

  private proceso30min(reserva: Reserva) {
    if (reserva.estado == 'Pendiente'){ 
      reserva.estado = 'Cancelado'
      const idReserva = reserva.id_reserva ?? -1;
      this.ReservaService.updateestado(idReserva, reserva).subscribe(() => {
        this.getList();
      });
    }
    // Lógica para realizar el proceso después de 30 minutos
   
  }

}
