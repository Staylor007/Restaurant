import { Component } from '@angular/core';
import { UserService } from 'app/services/user/user.service';
import { Usuario } from '../../models/usuarios';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
    
  
  list: Usuario[] = [];
  loading: boolean = false;

  constructor(private UserService: UserService) { }

   
  ngOnInit(): void {
    this.getList();   
  }

  getList(){
    this.loading = true;
    this.UserService.getList().subscribe((data: Usuario[])=>{
      this.list = data;
      console.log(data);
      this.loading = false;
    })

  }
 
  delete(id: number){
    this.loading = true;
     this.UserService.delete(id).subscribe(()=>{
       this.getList() 
     })
  }

}
