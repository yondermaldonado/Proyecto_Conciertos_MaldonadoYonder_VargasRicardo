// js/admin.js

document.getElementById('form-login')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('log-email').value;
    const pass = document.getElementById('log-pass').value;

    if (email === "admin@mail.com" && pass === "123456") {
        document.getElementById('login-block').classList.remove('active');
        document.getElementById('admin-dashboard').style.display = "block";
        inicializarMódulosDashboard();
    } else {
        StorageManager.showAlert('Credenciales incorrectas', 'error');
    }
});

function inicializarMódulosDashboard() {
    configurarNavegacionTabs();
    renderizarTablaCategorias();
    renderizarTablaEventos();
    actualizarTablaVentasAdmin();
    cargarDesplegableCategorias();

    document.getElementById('btn-add-cat').onclick = () => abrirModalCategoria();
    document.getElementById('btn-add-ev').onclick = () => abrirModalEvento();
    
    document.getElementById('form-category').onsubmit = guardarCategoria;
    document.getElementById('form-event').onsubmit = guardarEvento;

    document.querySelectorAll('.close-generic').forEach(boton => {
        boton.onclick = () => {
            document.getElementById('modal-cat').classList.remove('active');
            document.getElementById('modal-ev').classList.remove('active');
        };
    });

    document.getElementById('btn-logout').onclick = () => location.reload();
}

function configurarNavegacionTabs() {
    const pestañas = document.querySelectorAll('#admin-nav a[data-target]');
    pestañas.forEach(pes => {
        pes.onclick = (e) => {
            pestañas.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
            
            e.target.classList.add('active');
            const targetID = e.target.getAttribute('data-target');
            document.getElementById(targetID).style.display = 'block';

            if (targetID === 'mod-ventas') {
                actualizarTablaVentasAdmin();
            }
        };
    });
}

/* ==========================================================================
   CRUD: CATEGORÍAS 
   ========================================================================== */
function renderizarTablaCategorias() {
    const cats = StorageManager.get('categories');
    const tbody = document.querySelector('#table-categories tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    cats.forEach(c => {
        tbody.innerHTML += `
            <tr>
                <td data-label="Nombre">${c.name}</td>
                <td data-label="Descripción">${c.description}</td>
                <td data-label="Acciones">
                    <button class="btn btn-secondary" onclick="abrirModalCategoria('${c.id}')">Editar</button>
                    <button class="btn btn-primary" onclick="eliminarCategoria('${c.id}')">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function abrirModalCategoria(id = null) {
    document.getElementById('modal-cat').classList.add('active');
    if (id) {
        const cat = StorageManager.get('categories').find(c => c.id === id);
        document.getElementById('cat-modal-title').innerText = "Editar Categoría";
        document.getElementById('cat-id').value = cat.id;
        document.getElementById('cat-name').value = cat.name;
        document.getElementById('cat-desc').value = cat.description;
    } else {
        document.getElementById('form-category').reset();
        document.getElementById('cat-modal-title').innerText = "Nueva Categoría";
        document.getElementById('cat-id').value = '';
    }
}

function guardarCategoria(e) {
    e.preventDefault();
    const id = document.getElementById('cat-id').value;
    const name = document.getElementById('cat-name').value;
    const description = document.getElementById('cat-desc').value;
    let lista = StorageManager.get('categories');

    if (id) {
        lista = lista.map(c => c.id === id ? {id, name, description} : c);
    } else {
        lista.push({ id: 'cat-' + Date.now(), name, description });
    }
    
    StorageManager.set('categories', lista);
    document.getElementById('modal-cat').classList.remove('active');
    renderizarTablaCategorias();
    cargarDesplegableCategorias();
    StorageManager.showAlert('Categoría guardada con éxito.');
}

function eliminarCategoria(id) {
    if (!confirm('¿Desea eliminar esta categoría?')) return;
    let lista = StorageManager.get('categories').filter(c => c.id !== id);
    StorageManager.set('categories', lista);
    renderizarTablaCategorias();
    cargarDesplegableCategorias();
}

/* ==========================================================================
   CRUD: EVENTOS 
   ========================================================================== */
function renderizarTablaEventos() {
    const evs = StorageManager.get('events');
    const tbody = document.querySelector('#table-events tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    evs.forEach(e => {
        tbody.innerHTML += `
            <tr>
                <td data-label="Código">${e.id}</td>
                <td data-label="Nombre">${e.name}</td>
                <td data-label="Ciudad">${e.city}</td>
                <td data-label="Precio">$${e.price.toLocaleString()}</td>
                <td data-label="Acciones">
                    <button class="btn btn-secondary" onclick="abrirModalEvento('${e.id}')">Editar</button>
                    <button class="btn btn-primary" onclick="eliminarEvento('${e.id}')">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function cargarDesplegableCategorias() {
    const selector = document.getElementById('ev-cat');
    if (!selector) return;
    selector.innerHTML = '';
    StorageManager.get('categories').forEach(c => {
        selector.innerHTML += `<option value="${c.id}">${c.name}</option>`;
    });
}

function abrirModalEvento(id = null) {
    document.getElementById('modal-ev').classList.add('active');
    const inputCodigo = document.getElementById('ev-code');
    
    if (id) {
        const ev = StorageManager.get('events').find(e => e.id === id);
        document.getElementById('ev-modal-title').innerText = "Modificar Evento";
        inputCodigo.value = ev.id; 
        inputCodigo.disabled = true;
        
        document.getElementById('ev-name').value = ev.name;
        document.getElementById('ev-cat').value = ev.category;
        document.getElementById('ev-price').value = ev.price;
        document.getElementById('ev-date').value = ev.date;
        document.getElementById('ev-time').value = ev.time;
        document.getElementById('ev-city').value = ev.city;
        document.getElementById('ev-img').value = ev.image;
        document.getElementById('ev-desc').value = ev.description;
    } else {
        document.getElementById('form-event').reset();
        document.getElementById('ev-modal-title').innerText = "Gestionar Nuevo Evento";
        inputCodigo.disabled = false;
    }
}

function guardarEvento(e) {
    e.preventDefault();
    const id = document.getElementById('ev-code').value;
    let listaEventos = StorageManager.get('events');
    
    const datosDelEvento = {
        id,
        name: document.getElementById('ev-name').value,
        category: document.getElementById('ev-cat').value,
        price: parseInt(document.getElementById('ev-price').value),
        date: document.getElementById('ev-date').value,
        time: document.getElementById('ev-time').value,
        city: document.getElementById('ev-city').value,
        image: document.getElementById('ev-img').value,
        description: document.getElementById('ev-desc').value,
    };

    const yaExiste = listaEventos.some(ev => ev.id === id);
    if (document.getElementById('ev-code').disabled || yaExiste) {
        listaEventos = listaEventos.map(ev => ev.id === id ? datosDelEvento : ev);
    } else {
        listaEventos.push(datosDelEvento);
    }

    StorageManager.set('events', listaEventos);
    document.getElementById('modal-ev').classList.remove('active');
    renderizarTablaEventos();
    StorageManager.showAlert('Evento registrado en la cartelera.');
}

function eliminarEvento(id) {
    if (!confirm('¿Desea dar de baja este evento?')) return;
    let lista = StorageManager.get('events').filter(e => e.id !== id);
    StorageManager.set('events', lista);
    renderizarTablaEventos();
}

/* ==========================================================================
   CARGA AUTOMÁTICA DESDE VENTAS.JSON FÍSICO
   ========================================================================== */
function actualizarTablaVentasAdmin() {
    const tbody = document.querySelector('#table-sales tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    // 1. Petición automática al archivo ventas.json al lado de tu index.html
    fetch('ventas.json')
        .then(response => response.json())
        .then(ventasDelJson => {
            // 2. Traer las ventas de clientes hechas en la sesión de uso actual
            const ventasNuevas = StorageManager.get('sales');
            
            // Unir la base fija con la temporal
            const todasLasVentas = [...ventasDelJson, ...ventasNuevas];

            if (todasLasVentas.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No hay ventas en el registro.</td></tr>';
                return;
            }

            // Organizar cronológicamente de manera descendente
            todasLasVentas.sort((a, b) => b.timestamp - a.timestamp);

            // Poblar las filas automáticamente
            todasLasVentas.forEach(v => {
                tbody.innerHTML += `
                    <tr>
                        <td>${v.fecha}</td>
                        <td>${v.cliente.nombre}</td>
                        <td>${v.ciudad}</td>
                        <td><strong>$${v.total.toLocaleString()} COP</strong></td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.log("Archivo ventas.json vacío o ausente. Mostrando compras locales en vivo.");
            const ventasNuevas = StorageManager.get('sales');
            ventasNuevas.forEach(v => {
                tbody.innerHTML += `<tr><td>${v.fecha}</td><td>${v.cliente.nombre}</td><td>${v.ciudad}</td><td><strong>$${v.total.toLocaleString()} COP</strong></td></tr>`;
            });
        });
}