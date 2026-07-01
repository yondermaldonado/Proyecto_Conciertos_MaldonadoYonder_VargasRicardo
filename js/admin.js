document.getElementById('form-login').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('log-email').value;
    const pass = document.getElementById('log-pass').value;

    if (email === "admin@mail.com" && pass === "123456") {
        document.getElementById('login-block').classList.remove('active');
        document.getElementById('admin-dashboard').style.display = "block";
        initDashboard();
    } else {
        StorageManager.showAlert('Credenciales incorrectas', 'error');
    }
});

function initDashboard() {
    renderTabs();
    renderCategoriesTable();
    renderEventsTable();
    renderSalesTable();
    loadCategoryDropdown();

    document.getElementById('btn-add-cat').onclick = () => openCatModal();
    document.getElementById('btn-add-ev').onclick = () => openEvModal();
    document.getElementById('form-category').onsubmit = saveCategory;
    document.getElementById('form-event').onsubmit = saveEvent;

    document.querySelectorAll('.close-modal').forEach(b => {
        b.onclick = () => {
            document.getElementById('modal-cat').classList.remove('active');
            document.getElementById('modal-ev').classList.remove('active');
        };
    });

    document.getElementById('btn-logout').onclick = () => location.reload();
}

function renderTabs() {
    const tabs = document.querySelectorAll('#admin-nav a[data-target]');
    tabs.forEach(tab => {
        tab.onclick = (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
            
            e.target.classList.add('active');
            document.getElementById(e.target.getAttribute('data-target')).style.display = 'block';
        };
    });
}

/* CRUD CATEGORÍAS */
function renderCategoriesTable() {
    const cats = StorageManager.get('categories');
    const tbody = document.querySelector('#table-categories tbody');
    tbody.innerHTML = '';
    cats.forEach(c => {
        tbody.innerHTML += `
            <tr>
                <td data-label="Nombre">${c.name}</td>
                <td data-label="Descripción">${c.description}</td>
                <td data-label="Acciones">
                    <button class="btn btn-secondary" onclick="openCatModal('${c.id}')">Editar</button>
                    <button class="btn btn-primary" onclick="deleteCategory('${c.id}')">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function openCatModal(id = null) {
    const modal = document.getElementById('modal-cat');
    modal.classList.add('active');
    if (id) {
        const cat = StorageManager.get('categories').find(c => c.id === id);
        document.getElementById('cat-id').value = cat.id;
        document.getElementById('cat-name').value = cat.name;
        document.getElementById('cat-desc').value = cat.description;
    } else {
        document.getElementById('form-category').reset();
        document.getElementById('cat-id').value = '';
    }
}

function saveCategory(e) {
    e.preventDefault();
    const id = document.getElementById('cat-id').value;
    const name = document.getElementById('cat-name').value;
    const description = document.getElementById('cat-desc').value;
    let cats = StorageManager.get('categories');

    if (id) {
        cats = cats.map(c => c.id === id ? {id, name, description} : c);
    } else {
        cats.push({ id: 'cat-' + Date.now(), name, description });
    }
    StorageManager.set('categories', cats);
    document.getElementById('modal-cat').classList.remove('active');
    renderCategoriesTable();
    loadCategoryDropdown();
}

function deleteCategory(id) {
    let cats = StorageManager.get('categories').filter(c => c.id !== id);
    StorageManager.set('categories', cats);
    renderCategoriesTable();
}

/* CRUD EVENTOS */
function renderEventsTable() {
    const evs = StorageManager.get('events');
    const tbody = document.querySelector('#table-events tbody');
    tbody.innerHTML = '';
    evs.forEach(e => {
        tbody.innerHTML += `
            <tr>
                <td data-label="Código">${e.id}</td>
                <td data-label="Nombre">${e.name}</td>
                <td data-label="Ciudad">${e.city}</td>
                <td data-label="Precio">$${e.price.toLocaleString()}</td>
                <td data-label="Acciones">
                    <button class="btn btn-secondary" onclick="openEvModal('${e.id}')">Editar</button>
                    <button class="btn btn-primary" onclick="deleteEvent('${e.id}')">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function loadCategoryDropdown() {
    const dropdown = document.getElementById('ev-cat');
    dropdown.innerHTML = '';
    StorageManager.get('categories').forEach(c => {
        dropdown.innerHTML += `<option value="${c.id}">${c.name}</option>`;
    });
}

function openEvModal(id = null) {
    const modal = document.getElementById('modal-ev');
    modal.classList.add('active');
    const codeInput = document.getElementById('ev-code');
    if (id) {
        const ev = StorageManager.get('events').find(e => e.id === id);
        codeInput.value = ev.id; codeInput.disabled = true;
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
        codeInput.disabled = false;
    }
}

function saveEvent(e) {
    e.preventDefault();
    const id = document.getElementById('ev-code').value;
    let evs = StorageManager.get('events');
    const evData = {
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

    const exists = evs.some(ev => ev.id === id);
    if (document.getElementById('ev-code').disabled || exists) {
        evs = evs.map(ev => ev.id === id ? evData : ev);
    } else {
        evs.push(evData);
    }

    StorageManager.set('events', evs);
    document.getElementById('modal-ev').classList.remove('active');
    renderEventsTable();
}

function deleteEvent(id) {
    let evs = StorageManager.get('events').filter(e => e.id !== id);
    StorageManager.set('events', evs);
    renderEventsTable();
}

/* VENTAS */
function renderSalesTable() {
    const sales = StorageManager.get('sales').sort((a,b) => b.timestamp - a.timestamp);
    const tbody = document.querySelector('#table-sales tbody');
    tbody.innerHTML = '';
    sales.forEach(s => {
        tbody.innerHTML += `
            <tr>
                <td data-label="Fecha">${s.fecha}</td>
                <td data-label="Cliente">${s.cliente.nombre}</td>
                <td data-label="Ciudad">${s.ciudad}</td>
                <td data-label="Total"><strong>$${s.total.toLocaleString()}</strong></td>
                <td data-label="Detalles"><button class="btn btn-secondary" onclick="alert('Productos comprados: \\n${s.items.map(i => '- ' + i.name).join('\\n')}')">Ver ítems</button></td>
            </tr>
        `;
    });
}