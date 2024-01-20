import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpleadoBar } from '@app/models/reserva';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/empleado'
   }

  getList(): Observable<EmpleadoBar[]> {
    return this.http.get<EmpleadoBar[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  
  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)

  }

  save(datos: EmpleadoBar):Observable<void>{
    console.log(datos);
    return this.http.post<void>
    (`${this.myAppUrl}${this.myApiUrl}`,datos)
  }

  get(id: number): Observable<EmpleadoBar>{
    return this.http.get<EmpleadoBar>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  update(id: number, datos: EmpleadoBar): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, datos)
  }
}
