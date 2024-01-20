import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Reserva } from '../../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService { 
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/reserva'
   }

  getList(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  
  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)

  }

  save(reserva: Reserva):Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,reserva)
  }

  get(id: number): Observable<Reserva>{
    return this.http.get<Reserva>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  update(id: number, product: Reserva): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, product)
  }

  updateestado(id: number, product: Reserva): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/estado/${id}`, product)
  }
}
