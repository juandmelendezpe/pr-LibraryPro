export interface Rol {
    id?: number;
    titulo: string;
}

export interface EstadoLibro {
    id?: number;
    descripcion: string;
}

export interface EstadoPrestamo {
    id?: number;
    descripcion: string;
}

export interface Usuario {
    id?: number;
    nombre: string;
    email: string;
    contrasena?: string;
    telefono?: string;
    direccion?: string;
    rol: Rol;
    activo: boolean;
}

export interface Libro {
    id?: number;
    titulo: string;
    autor: string;
    genero?: string;
    estado: EstadoLibro;
}

export interface Prestamo {
    id?: number;
    fechaInicio: string;
    fechaDevolucion?: string;
    estado: EstadoPrestamo;
    prestatario: Usuario;
    libro: Libro;
}

export interface Donacion {
    id?: number;
    fecha: string;
    observaciones?: string;
    donante: Usuario;
    libro: Libro;
}
