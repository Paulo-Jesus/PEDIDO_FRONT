//HOST SWAGGER 
const endpoint = "http://192.168.10.110:5092";

export const Enviroment = {

    production : false, 

    //HOST SWAGGER 

    endpoint : "http://192.168.10.110:5092",

    

    

    // Producto

    ApiProductoObtener:         `${endpoint}/api/Productos/Obtener`,

    ApiProductoIngresar:        `${endpoint}/api/Productos/Ingresar`,

    ApiProductoEstado:          `${endpoint}/api/Productos/Estado`,

    // MENU

    ApiIngresarMenu:            `${endpoint}/api/Menu/Menu/Ingresar`,

    ApiConsultaExisteMenu:      `${endpoint}/api/Menu/TieneMenu`,

    ApiObtenerMenu:             `${endpoint}/api/Menu/DatosMenu`,

    //restaurante

    ApigetRestaurantes:         `${endpoint}/getRestaurantes`,

    ApiRegistrar:               `${endpoint}/registrar`,

    //desbloquearusuarios

    ApiUsuariosBloqueados:      `${endpoint}/api/UsuariosBloqueados`,

    //pedidos

    ApiObtenerPedidos:          `${endpoint}/api/HistorialPedidos/ObtenerPedidos`,

    ApiPedidoInsertar:          `${endpoint}/api/Pedidos/InsertarPedido`,

    //estado

    ApiObtenerListaEstado:      `${endpoint}/api/CrearPerfil/GetListEstados`,

    //roles

    ApiGetRoles:                `${endpoint}/api/CrearPerfil/GetListRoles`,

    //Token

    ApiCompararToker:           `${endpoint}/api/Token/CompararTokens`,

}