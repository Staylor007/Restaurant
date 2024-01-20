import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Menu } from '../../models/menu';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/menu'
   }

  getList(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getListBar(id: number): Observable<Menu>{
    return this.http.get<Menu>(`${this.myAppUrl}${this.myApiUrl}/bar/${id}`)
  }
  
  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)

  }

  save(product: Menu,image: File):Observable<void>{
    const formData = new FormData();
    formData.append('id_bar', product.id_bar.toString());
    formData.append('nombre_menu', product.nombre_menu);
    formData.append('plato', product.plato);
    formData.append('descripcion', product.descripcion);
    formData.append('precio', product.precio.toString());
    formData.append('estado', product.estado); 
    formData.append('foto', image);
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, formData);
  }
 

  get(id: number): Observable<Menu>{
    return this.http.get<Menu>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  update(id: number, product: Menu,image: File): Observable<void>{
    const formData = new FormData();
    formData.append('id_bar', product.id_bar.toString());
    formData.append('nombre_menu', product.nombre_menu);
    formData.append('plato', product.plato);
    formData.append('descripcion', product.descripcion);
    formData.append('precio', product.precio.toString());
    formData.append('estado', product.estado); 
    formData.append('foto', image);
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, formData)
  }
}
