import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Pedido } from '../../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/pedido'
   }

  getList(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  
  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)

  }

  save(datos: Pedido):Observable<void>{
    return this.http.post<void>
    (`${this.myAppUrl}${this.myApiUrl}`,datos)
  }

  get(id: number): Observable<Pedido>{
    return this.http.get<Pedido>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  update(id: number, datos: Pedido): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, datos)
  }
}