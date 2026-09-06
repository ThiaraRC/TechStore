// ============================================================
// ÓRDENES DE COMPRA - TECH STORE
// Muestra órdenes de ejemplo + compras reales guardadas
// por los clientes en localStorage.
// ============================================================


// Órdenes de ejemplo del sistema
const ordenesBase = [

    {
        id: "1001",
        cliente: "María González",
        correo: "maria@gmail.com",
        fecha: "05-09-2026",
        estado: "Pendiente",
        productos: [
            {
                nombre: "Mouse Gamer RGB",
                cantidad: 1,
                precio: 20000
            },
            {
                nombre: "Teclado Mecánico",
                cantidad: 1,
                precio: 45000
            }
        ]
    },

    {
        id: "1002",
        cliente: "Carlos Soto",
        correo: "carlos@gmail.com",
        fecha: "05-09-2026",
        estado: "Preparando",
        productos: [
            {
                nombre: "Audífonos Bluetooth",
                cantidad: 1,
                precio: 35000
            },
            {
                nombre: "Mouse Pad RGB",
                cantidad: 2,
                precio: 19990
            }
        ]
    },

    {
        id: "1003",
        cliente: "Daniela Pérez",
        correo: "daniela@gmail.com",
        fecha: "06-09-2026",
        estado: "Entregada",
        productos: [
            {
                nombre: "Monitor Gamer 27 pulgadas",
                cantidad: 1,
                precio: 129990
            }
        ]
    }

];


// ============================================================
// Obtener compras reales realizadas desde el carrito
// ============================================================

function obtenerPedidosGuardados() {

    const pedidosGuardados =
        JSON.parse(localStorage.getItem("pedidos") || "[]");

    return pedidosGuardados.map(function (pedido) {

        return {
            id: pedido.folio,
            cliente: pedido.correoCliente || "Cliente",
            correo: pedido.correoCliente || "Sin correo",
            fecha: pedido.fecha,
            estado: "Pendiente",
            productos: pedido.productos || [],
            total: pedido.total
        };

    });
}


// Une las órdenes de ejemplo con las compras reales
function obtenerTodasLasOrdenes() {

    return ordenesBase.concat(obtenerPedidosGuardados());

}


// ============================================================
// Calcular total
// ============================================================

function calcularTotalOrden(orden) {

    if (typeof orden.total === "number") {
        return orden.total;
    }

    return orden.productos.reduce(function (total, producto) {

        return total + (producto.precio * producto.cantidad);

    }, 0);

}


// ============================================================
// Mostrar listado de órdenes
// ============================================================

function mostrarOrdenes() {

    const lista = document.getElementById("listaOrdenes");

    if (!lista) {
        return;
    }

    const ordenes = obtenerTodasLasOrdenes();

    lista.innerHTML = "";

    ordenes.forEach(function (orden) {

        const fila = document.createElement("tr");

        const total = calcularTotalOrden(orden);

        fila.innerHTML =

            "<td>#" + orden.id + "</td>" +

            "<td>" + orden.cliente + "</td>" +

            "<td>" + orden.fecha + "</td>" +

            "<td>$" +
            total.toLocaleString("es-CL") +
            "</td>" +

            "<td>" +
            "<span class='estado-orden'>" +
            orden.estado +
            "</span>" +
            "</td>" +

            "<td>" +
            "<a class='boton-detalle' href='orden-detalle.html?id=" +
            encodeURIComponent(orden.id) +
            "'>Ver detalle</a>" +
            "</td>";

        lista.appendChild(fila);

    });

}


// ============================================================
// Buscar orden por ID o folio
// ============================================================

function buscarOrdenPorId(id) {

    const ordenes = obtenerTodasLasOrdenes();

    return ordenes.find(function (orden) {

        return String(orden.id) === String(id);

    });

}


// ============================================================
// Mostrar detalle de una orden
// ============================================================

function mostrarDetalleOrden() {

    const contenedor =
        document.getElementById("detalleOrden");

    if (!contenedor) {
        return;
    }

    const parametros =
        new URLSearchParams(window.location.search);

    const idOrden =
        parametros.get("id");

    const orden =
        buscarOrdenPorId(idOrden);


    if (!orden) {

        contenedor.innerHTML =
            "<h2>Orden no encontrada</h2>" +
            "<p>No fue posible encontrar la orden solicitada.</p>";

        return;
    }


    let productosHTML = "";


    orden.productos.forEach(function (producto) {

        const subtotal =
            producto.precio * producto.cantidad;

        productosHTML +=

            "<tr>" +

            "<td>" +
            producto.nombre +
            "</td>" +

            "<td>" +
            producto.cantidad +
            "</td>" +

            "<td>$" +
            Number(producto.precio).toLocaleString("es-CL") +
            "</td>" +

            "<td>$" +
            Number(subtotal).toLocaleString("es-CL") +
            "</td>" +

            "</tr>";

    });


    const total =
        calcularTotalOrden(orden);


    contenedor.innerHTML =

        "<h2>Detalle de orden #" +
        orden.id +
        "</h2>" +

        "<div class='datos-orden'>" +

        "<p><strong>Cliente:</strong> " +
        orden.cliente +
        "</p>" +

        "<p><strong>Correo:</strong> " +
        orden.correo +
        "</p>" +

        "<p><strong>Fecha:</strong> " +
        orden.fecha +
        "</p>" +

        "<p><strong>Estado:</strong> " +
        orden.estado +
        "</p>" +

        "</div>" +

        "<h3>Productos</h3>" +

        "<table class='tabla-detalle-orden'>" +

        "<thead>" +
        "<tr>" +
        "<th>Producto</th>" +
        "<th>Cantidad</th>" +
        "<th>Precio</th>" +
        "<th>Subtotal</th>" +
        "</tr>" +
        "</thead>" +

        "<tbody>" +
        productosHTML +
        "</tbody>" +

        "</table>" +

        "<div class='total-orden'>" +

        "<strong>Total: $" +
        total.toLocaleString("es-CL") +
        "</strong>" +

        "</div>";

}


// Ejecutar según la página abierta
mostrarOrdenes();
mostrarDetalleOrden();