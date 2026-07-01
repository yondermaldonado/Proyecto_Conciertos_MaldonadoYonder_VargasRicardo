let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    renderCategoriesSelect();
    renderEventos();

    // Filtros dinámicos
    document.getElementById('search-input').addEventListener('input', renderEventos);
    document.getElementById('filter-ciudad').addEventListener('change', renderEventos);
    document.getElementById('filter-categoria').addEventListener('change', renderEventos);

    // Modales de interacción
    document.getElementById('ver-carrito').addEventListener('click', () => toggleModal('modal-carrito', true));
    document.getElementById('close-carrito').addEventListener('click', () => toggleModal('modal-carrito', false));
    document.getElementById('close-detalle').addEventListener('click', () => toggleModal('modal-detalle', false));

    // Formulario de compra final
    document.getElementById('form-compra').addEventListener('submit', procesarCompra);
});

function renderCategoriesSelect() {
    const cats = StorageManager.get('categories');
    const select = document.getElementById('filter-categoria');
    cats.forEach(c => {
        select.innerHTML += `<option value="${c.id}">${c.name}</option>`;
    });
}

function renderEventos() {
    const eventos = StorageManager.get('events');
    const cats = StorageManager.get('categories');
    const search = document.getElementById('search-input').value.toLowerCase();
    const city = document.getElementById('filter-ciudad').value;
    const cat = document.getElementById('filter-categoria').value;

    const container = document.getElementById('eventos-container');
    container.innerHTML = '';

    const filtrados = eventos.filter(ev => {
        const matchesSearch = ev.name.toLowerCase().includes(search);
        const matchesCity = city === "" || ev.city === city;
        const matchesCat = cat === "" || ev.category === cat;
        return matchesSearch && matchesCity && matchesCat;
    });

    filtrados.forEach(ev => {
        const catObj = cats.find(c => c.id === ev.category);
        const el = document.createElement('event-card');
        el.setAttribute('event-id', ev.id);
        el.setAttribute('name', ev.name);
        el.setAttribute('price', ev.price);
        el.setAttribute('date', ev.date);
        el.setAttribute('city', ev.city);
        el.setAttribute('image', ev.image);
        el.setAttribute('category-name', catObj ? catObj.name : 'Evento');
        container.appendChild(el);
    });

    asignarEventosTarjetas();
}

function asignarEventosTarjetas() {
    document.querySelectorAll('.btn-comprar').forEach(btn => {
        btn.onclick = (e) => {
            const id = e.target.getAttribute('data-id');
            agregarAlCarrito(id);
        };
    });
    document.querySelectorAll('.btn-ver').forEach(btn => {
        btn.onclick = (e) => {
            const id = e.target.getAttribute('data-id');
            verDetalle(id);
        };
    });
}

function agregarAlCarrito(id) {
    const target = StorageManager.get('events').find(e => e.id === id);
    carrito.push(target);
    document.getElementById('cart-count').innerText = carrito.length;
    StorageManager.showAlert(`"${target.name}" agregado al carrito.`);
    actualizarCarritoModal();
}

function actualizarCarritoModal() {
    const itemsCont = document.getElementById('carrito-items');
    itemsCont.innerHTML = '';
    let total = 0;
    carrito.forEach((item, index) => {
        total += item.price;
        itemsCont.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span>${item.name} (${item.city})</span>
                <strong>$${item.price.toLocaleString()}</strong>
            </div>
        `;
    });
    document.getElementById('carrito-total').innerText = `$${total.toLocaleString()} COP`;
}

function verDetalle(id) {
    const ev = StorageManager.get('events').find(e => e.id === id);
    const detailCont = document.getElementById('detalle-content');
    detailCont.innerHTML = `
        <img src="${ev.image}" style="width:100%; max-height:300px; object-fit:cover; border-radius:10px;">
        <h2 style="margin:15px 0;">${ev.name}</h2>
        <p>${ev.description}</p>
        <p style="margin:10px 0;"><strong>Ubicación:</strong> ${ev.city} | <strong>Fecha:</strong> ${ev.date} - ${ev.time}</p>
        <h3 style="color:var(--primary-color)">Precio: $${ev.price.toLocaleString()} COP</h3>
    `;
    toggleModal('modal-detalle', true);
}

function procesarCompra(e) {
    e.preventDefault();
    if (carrito.length === 0) return StorageManager.showAlert('El carrito está vacío', 'error');

    const total = carrito.reduce((sum, item) => sum + item.price, 0);
    const nuevaVenta = {
        fecha: new Date().toISOString().split('T')[0],
        timestamp: Date.now(),
        ciudad: carrito[0].city,
        cliente: {
            identificacion: document.getElementById('cli-id').value,
            nombre: document.getElementById('cli-nombre').value,
            direccion: document.getElementById('cli-direccion').value,
            telefono: document.getElementById('cli-telefono').value,
            email: document.getElementById('cli-email').value,
        },
        items: carrito,
        total: total
    };

    const ventas = StorageManager.get('sales');
    ventas.push(nuevaVenta);
    StorageManager.set('sales', ventas);

    StorageManager.showAlert('¡Compra realizada con éxito! Boleta asignada correctamente.');
    carrito = [];
    document.getElementById('cart-count').innerText = 0;
    document.getElementById('form-compra').reset();
    toggleModal('modal-carrito', false);
}

function toggleModal(id, open) {
    document.getElementById(id).classList.toggle('active', open);
}