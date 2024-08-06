export const Enviroment = {
    production : false,
    endpoint : "http://localhost:5092/api", //HOST SWAGGER 
    
    // Producto
    ApiProductoObtener: "http://localhost:5092/api/Productos/Obtener",
    ApiProductoIngresar: "http://localhost:5092/api/Productos/Ingresar",
    ApiProductoEstado: "http://localhost:5092/api/Productos/Estado",
    // MENU
    ApiIngresarMenu: "http://localhost:5092/api/Menu/Menu/Ingresar",
    ApiConsultaExisteMenu: "http://localhost:5092/api/Menu/TieneMenu",
    ApiObtenerMenu: "http://localhost:5092/api/Menu/DatosMenu",
    //restaurante
    ApigetRestaurantes: "http://localhost:5092/getRestaurantes",
    ApiRegistrar:"http://localhost:5092/registrar",
    //desbloquearusuarios
    ApiUsuariosBloqueados:"http://localhost:5092/UsuariosBloqueados",
}
