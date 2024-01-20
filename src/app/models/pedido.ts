export interface Pedido {
    id_pedido?: number;
    id_usuario?: number;
    fecha_pedido: Date;
    estado?: string;
    codigo_estado?: string;
    comentario?: string;
  }
  