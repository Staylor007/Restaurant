import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { DetalleReserva } from '../../models/detallereserva';
@Injectable({
  providedIn: 'root'
})
export class DetallereservaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/detreserva'
   }

  getList(): Observable<DetalleReserva[]> {
    return this.http.get<DetalleReserva[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  
  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)

  }

  save(datos: DetalleReserva):Observable<void>{
    return this.http.post<void>
    (`${this.myAppUrl}${this.myApiUrl}`,datos)
  }

  get(id: number): Observable<DetalleReserva>{
    return this.http.get<DetalleReserva>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  update(id: number, datos: DetalleReserva): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, datos)
  }
}