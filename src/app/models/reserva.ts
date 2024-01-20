  
export interface TipoUsuario {
    id_tipo_usuario?: number;
    nombre_tipo_usuario: string;
  }
  
  // pais.interface.ts
  export interface Pais {
    id_pais?: number;
    nombre_pais: string;
  }
  
  // provincia.interface.ts
  export interface Provincia {
    id_provincia?: number;
    nombre_provincia: string;
    id_pais?: number;
  }
  
  // ciudad.interface.ts
  export interface Ciudad {
    id_ciudad?: number;
    nombre_ciudad: string;
    id_provincia?: number;
  }
   
  
  // ubicacion.interface.ts
  export interface Ubicacion {
    id_ubicacion?: number;
    nombre_ubicacion: string;
    latitud?: number;
    longitud?: number;
  }
  
 
  
  // empleado-bar.interface.ts
  export interface EmpleadoBar {
    id_empleado_bar?: number;
    id_usuario?: number;
    id_bar?: number;
  }
  
  // menu.interface.ts
  export interface Menu {
    id_menu?: number;
    id_bar?: number;
    nombre_menu: string;
    plato: string;
    descripcion?: string;
    precio: number;
    estado?: string;
    foto?: string;
  }
  
  // reserva.interface.ts
  export interface Reserva {
    id_reserva?: number;
    id_usuario?: number;
    id_menu?: number;
    id_bar?: number;
    fecha_reserva: Date;
    estado?: string;
    codigo_estado?: string;
    comentario?: string;
    usuario?: string;
    tiempoRestante?: number;
  }
  
   
  // detalle-pedido.interface.ts
export interface DetallePedido {
    id_detalle_pedido?: number;
    id_pedido?: number;
    id_menu?: number;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
  }