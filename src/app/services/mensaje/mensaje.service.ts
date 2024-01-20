import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor() { }

  showAlert(title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success'): Promise<any> {
    return Swal.fire({
      title,
      text: message,
      icon: type,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  }
}
