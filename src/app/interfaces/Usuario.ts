export interface Usuario {
    id: number;
    cedula: string;
    nombre : string;
    telefono: string;
    direccion: string;
    idEmpresa: number;
    idEstado: number;
    idCuenta: number;
}
export interface UsuarioEditar {
    id: number;
    cedula: string;
    nombre : string;
    correo: string;
    telefono: string;
    direccion: string;
    idRol: number;
    idEmpresa: number;
    idEstado: number;
    idCuenta: number;
}
