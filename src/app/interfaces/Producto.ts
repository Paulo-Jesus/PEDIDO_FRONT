export interface Producto {
    idProducto:   number;
    nombre:       string;
    descripcion:  string;
    precio:       number;
    categoria:    string;
    imagenBase64: string;
    idCategoria:  number;
    idProveedor:  number;
    idEstado:     number;
}
