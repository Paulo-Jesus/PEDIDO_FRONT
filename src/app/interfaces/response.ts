import { UsuarioBlock } from "./UsuarioBlock";
import { Usuario } from "./Usuario";
import { Producto } from "./Producto";

export interface ResponseApi {
code:boolean,
message:string,
data: UsuarioBlock,
}

export interface ResponseApiUsuario {
    code:boolean,
    message:string,
    data: Usuario[],
    }


    
export interface ResponseApiProducto {
    code:boolean,
    message:string,
    data: Producto[],
    }
