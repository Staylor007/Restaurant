import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Bar } from '../../models/bar';

@Injectable({
  providedIn: 'root'
})
export class BarService {
  private coordinatesSubject = new BehaviorSubject<{ latitud: number, longitud: number } | null>(null);

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/bar'
   }


   sendCoordinates(coordinates: { latitud: number, longitud: number }) {
     this.coordinatesSubject.next(coordinates);
   }
 
   getCoordinates(): Observable<{ latitud: number, longitud: number } | null> {
     return this.coordinatesSubject.asObservable();
   }


  getList(): Observable<Bar[]> {
    return this.http.get<Bar[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  
  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)

  }

  // save(product: Bar):Observable<void>{
  //   return this.http.post<void>
  //   (`${this.myAppUrl}${this.myApiUrl}`,product)
  // }

  save(product: Bar,  image: File): Observable<void> {
    const formData = new FormData();
    formData.append('nombre_bar', product.nombre_bar);
    formData.append('nombre_ubicacion', product.nombre_ubicacion);
    formData.append('id_ubicacion', product.id_ubicacion.toString());
    formData.append('desayuno_horario', product.desayuno_horario);
    formData.append('almuerzo_horario', product.almuerzo_horario);
    formData.append('merienda_horario', product.merienda_horario);
    formData.append('longitud', product.longitud);
    formData.append('latitud', product.latitud);
    formData.append('imagen', image);
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, formData);
  }

  get(id: number): Observable<Bar>{
    return this.http.get<Bar>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  update(id: number, product: Bar,image: File): Observable<void>{
    const formData = new FormData();
    formData.append('nombre_bar', product.nombre_bar);
    formData.append('nombre_ubicacion', product.nombre_ubicacion);
    formData.append('id_ubicacion', product.id_ubicacion.toString());
    formData.append('desayuno_horario', product.desayuno_horario);
    formData.append('almuerzo_horario', product.almuerzo_horario);
    formData.append('merienda_horario', product.merienda_horario);
    formData.append('longitud', product.longitud);
    formData.append('latitud', product.latitud);
    formData.append('imagen', image);
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, formData)
  }
}
