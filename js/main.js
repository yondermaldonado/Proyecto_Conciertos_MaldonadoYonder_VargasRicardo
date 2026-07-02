// js/main.js

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    cargarCategoriasFiltro();
    renderizarVitrinaEventos();

    // Captura de eventos para filtros en tiempo real
    document.getElementById('search-input')?.addEventListener('input', renderizarVitrinaEventos);
    document.getElementById('filter-ciudad')?.addEventListener('change', renderizarVitrinaEventos);
    document.getElementById('filter-categoria')?.addEventListener('change', renderizarVitrinaEventos);

    // Controladores de los modales de la interfaz pública
    document.getElementById('ver-carrito')?.addEventListener('click', () => abrirCerrarModal('modal-carrito', true));
    document.getElementById('close-carrito')?.addEventListener('click', () => abrirCerrarModal('modal-carrito', false));
    document.getElementById('close-detalle')?.addEventListener('click', () => abrirCerrarModal('modal-detalle', false));

    // Procesador del formulario de facturación
    document.getElementById('form-compra')?.addEventListener('submit', procesarCompraCliente);
});

function cargarCategoriasFiltro() {
    const select = document.getElementById('filter-categoria');
    if (!select) return;
    
    const categorias = StorageManager.get('categories');
    categorias.forEach(cat => {
        select.innerHTML += `<option value="${cat.id}">${cat.name}</option>`;
    });
}

function renderizarVitrinaEventos() {
    const contenedor = document.getElementById('eventos-container');
    if (!contenedor) return;

    const eventos = StorageManager.get('events');
    const categorias = StorageManager.get('categories');

    const textoBuscado = document.getElementById('search-input').value.toLowerCase();
    const ciudadSeleccionada = document.getElementById('filter-ciudad').value;
    const categoriaSeleccionada = document.getElementById('filter-categoria').value;

    contenedor.innerHTML = '';

    const eventosFiltrados = eventos.filter(ev => {
        const coincideNombre = ev.name.toLowerCase().includes(textoBuscado);
        const coincideCiudad = ciudadSeleccionada === "" || ev.city === ciudadSeleccionada;
        const coincideCategoria = categoriaSeleccionada === "" || ev.category === categoriaSeleccionada;
        return coincideNombre && coincideCiudad && coincideCategoria;
    });

    eventosFiltrados.forEach(ev => {
        const objetoCategoria = categorias.find(c => c.id === ev.category);
        const card = document.createElement('event-card');
        
        card.setAttribute('event-id', ev.id);
        card.setAttribute('name', ev.name);
        card.setAttribute('price', ev.price);
        card.setAttribute('date', ev.date);
        card.setAttribute('city', ev.city);
        card.setAttribute('image', ev.image);
        card.setAttribute('category-name', objetoCategoria ? objetoCategoria.name : 'Evento');
        
        contenedor.appendChild(card);
    });

    enlazarBotonesTarjetas();
}

function enlazarBotonesTarjetas() {
    document.querySelectorAll('.btn-comprar').forEach(btn => {
        btn.onclick = (e) => añadirAlCarrito(e.target.getAttribute('data-id'));
    });
    document.querySelectorAll('.btn-ver').forEach(btn => {
        btn.onclick = (e) => verFichaDetalle(e.target.getAttribute('data-id'));
    });
}

function añadirAlCarrito(id) {
    const eventoEncontrado = StorageManager.get('events').find(e => e.id === id);
    carrito.push(eventoEncontrado);
    
    document.getElementById('cart-count').innerText = carrito.length;
    StorageManager.showAlert(`"${eventoEncontrado.name}" añadido al carrito de compras.`);
    actualizarVistaModalCarrito();
}

function actualizarVistaModalCarrito() {
    const contenedorItems = document.getElementById('carrito-items');
    if (!contenedorItems) return;
    
    contenedorItems.innerHTML = '';
    let totalAcumulado = 0;

    carrito.forEach(item => {
        totalAcumulado += item.price;
        contenedorItems.innerHTML += `
            <div style="display:flex; justify-content:between; margin-bottom:8px; border-bottom:1px dashed #eee; padding-bottom:4px;">
                <span>• ${item.name} (${item.city})</span>
                <strong style="margin-left:auto;">$${item.price.toLocaleString()}</strong>
            </div>
        `;
    });

    document.getElementById('carrito-total').innerText = `$${totalAcumulado.toLocaleString()} COP`;
}

function verFichaDetalle(id) {
    const ev = StorageManager.get('events').find(e => e.id === id);
    const contenido = document.getElementById('detalle-content');
    if (!contenido) return;

    contenido.innerHTML = `
        <img src="${ev.image}" style="width:100%; max-height:280px; object-fit:cover; border-radius:8px;">
        <h2 style="margin:12px 0; color:var(--secondary-color);">${ev.name}</h2>
        <p style="color:#555; line-height:1.5; margin-bottom:12px;">${ev.description}</p>
        <p><strong>📍 Ubicación:</strong> ${ev.city}</p>
        <p><strong>📅 Horario:</strong> ${ev.date} a las ${ev.time} HS</p>
        <h3 style="color:var(--primary-color); margin-top:12px;">Valor de Entrada: $${ev.price.toLocaleString()} COP</h3>
    `;
    abrirCerrarModal('modal-detalle', true);
}

function procesarCompraCliente(e) {
    e.preventDefault();
    if (carrito.length === 0) {
        StorageManager.showAlert('El carrito está vacío', 'error');
        return;
    }

    let totalPagar = 0;
    carrito.forEach(item => totalPagar += item.price);

    const registroVenta = {
        fecha: new Date().toLocaleDateString('es-CO'),
        timestamp: Date.now(),
        ciudad: carrito[0].city,
        cliente: {
            identificacion: document.getElementById('cli-id').value,
            nombre: document.getElementById('cli-nombre').value,
            direccion: document.getElementById('cli-direccion').value,
            telefono: document.getElementById('cli-telefono').value,
            email: document.getElementById('cli-email').value
        },
        total: totalPagar
    };

    // Registrar la venta localmente en memoria
    StorageManager.registrarNuevaVenta(registroVenta);

    StorageManager.showAlert('¡Compra exitosa! Tu entrada ha sido asignada correctamente.');

    // Sincronización en tiempo real por si el administrador está en la misma página
    if (typeof actualizarTablaVentasAdmin === 'function') {
        actualizarTablaVentasAdmin();
    }

    // Limpiar carrito e interfaz
    carrito = [];
    document.getElementById('cart-count').innerText = 0;
    document.getElementById('form-compra').reset();
    abrirCerrarModal('modal-carrito', false);
}

function abrirCerrarModal(id, visible) {
    document.getElementById(id)?.classList.toggle('active', visible);
}