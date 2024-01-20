import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs'; 
import { Usuario} from '../../models/usuarios';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private myAppUrl: string;
  private myApiUrl: string;
  private currentUserKey = 'currentUser'; 
 

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/auth'
  }
  
 

  getList(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  
  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  } 

  get(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  update(id: number, product: Usuario): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, product)
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/registro`, user);
  } 

  setCurrentUser(user: any): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  getCurrentUser(): any {
    const userString = localStorage.getItem(this.currentUserKey);
    console.log(userString)
    return userString ? JSON.parse(userString) : null;
  }

  clearCurrentUser(): void {
    localStorage.removeItem(this.currentUserKey);
  } 

}
