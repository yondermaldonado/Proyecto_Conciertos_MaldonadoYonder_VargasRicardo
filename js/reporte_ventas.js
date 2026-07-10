/* ==========================================
   REPORTE DE VENTAS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("form-reporte")
        .addEventListener("submit", generarReporteMensual);

});

/* ==========================================
   GENERAR REPORTE
========================================== */

function generarReporteMensual(e) {

    e.preventDefault();

    const anio = Number(document.getElementById("rep-anio").value);
    const mes = Number(document.getElementById("rep-mes").value);

    const ventas = StorageManager.get("sales");

    const reporte = {};

    ventas.forEach(venta => {

        const fecha = new Date(venta.timestamp);

        if (
            fecha.getFullYear() === anio &&
            (fecha.getMonth() + 1) === mes
        ) {

            venta.tickets.forEach(ticket => {

                if (!reporte[ticket.id]) {

                    reporte[ticket.id] = {

                        codigo: ticket.id,
                        nombre: ticket.name,
                        cantidad: 0,
                        total: 0

                    };

                }

                reporte[ticket.id].cantidad++;

                reporte[ticket.id].total += ticket.price;

            });

        }

    });

    pintarReporte(reporte);

}

function pintarReporte(reporte) {

    const tbody = document.querySelector("#tabla-reporte tbody");

    tbody.innerHTML = "";

    let totalEntradas = 0;

    let totalVentas = 0;

    Object.values(reporte).forEach(evento => {

        totalEntradas += evento.cantidad;

        totalVentas += evento.total;

        tbody.innerHTML += `

            <tr>

                <td>${evento.codigo}</td>

                <td>${evento.nombre}</td>

                <td>${evento.cantidad}</td>

                <td>$${evento.total.toLocaleString()}</td>

            </tr>

        `;

    });

    document.getElementById("total-general").innerHTML = `
        
        <h3>

            Total entradas vendidas:
            ${totalEntradas}

        </h3>

        <h3>

            Total vendido:
            $${totalVentas.toLocaleString()} COP

        </h3>

    `;

    if (Object.keys(reporte).length === 0) {

        document.getElementById("mensaje-reporte").innerHTML =
            "<h3>No existen ventas para ese período.</h3>";
    } else {
        document.getElementById("mensaje-reporte").innerHTML = "";
    }

}