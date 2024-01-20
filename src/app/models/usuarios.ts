export interface Usuario {
    id_usuario?: number;
    usuario: string;
    contrasena: string;
    nombre: string;
    apellido: string;
    cedula: string;
    correo: string;
    direccion: string;
    telefono: string;
    id_ciudad?: number;
    id_tipo_usuario?: number;
  }