document.addEventListener("DOMContentLoaded", function () {

    const tipoUsuario = localStorage.getItem("tipoUsuario");

    const paginaActual = window.location.pathname;


    // Si nadie inició sesión, vuelve al Login
    if (!tipoUsuario) {
        window.location.href = "../pages/login.html";
        return;
    }


    // El Cliente no puede entrar a páginas administrativas
    if (tipoUsuario === "Cliente") {
        window.location.href = "../index.html";
        return;
    }


    // Permisos del Vendedor
    if (tipoUsuario === "Vendedor") {

        // Páginas que el vendedor sí puede visitar
        const puedeVerProductos =
            paginaActual.includes("productos-admin.html");

        const puedeVerOrdenes =
            paginaActual.includes("ordenes-admin.html");

        const puedeVerDetalleOrden =
            paginaActual.includes("orden-detalle.html");


        // Si intenta entrar a otra página administrativa,
        // vuelve al listado de productos
        if (
            !puedeVerProductos &&
            !puedeVerOrdenes &&
            !puedeVerDetalleOrden
        ) {
            window.location.href = "productos-admin.html";
            return;
        }


        // Oculta botones y opciones exclusivas del Administrador
        const opcionesAdmin =
            document.querySelectorAll(".solo-admin");

        opcionesAdmin.forEach(function (opcion) {
            opcion.style.display = "none";
        });

    }

});