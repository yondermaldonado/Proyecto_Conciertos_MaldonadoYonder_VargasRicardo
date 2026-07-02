// js/storage.js

// Arreglo local en memoria para almacenar las ventas de la sesión actual
let listaVentas = [];

const StorageManager = {
    init() {
        // Inicializar categorías y eventos en localStorage si están vacíos
        if (!localStorage.getItem('categories')) {
            localStorage.setItem('categories', JSON.stringify(initialCategories));
        }
        if (!localStorage.getItem('events')) {
            localStorage.setItem('events', JSON.stringify(initialEvents));
        }
    },

    get(key) {
        if (key === 'sales') {
            return listaVentas; // Retorna las ventas acumuladas en la sesión
        }
        return JSON.parse(localStorage.getItem(key)) || [];
    },

    set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    registrarNuevaVenta(nuevaVenta) {
        // Guarda la venta en la lista temporal de la memoria de la aplicación
        listaVentas.push(nuevaVenta);
    },

    showAlert(message, type = 'success') {
        alert(`[${type.toUpperCase()}] ${message}`);
    }
};

// Arrancar el almacenamiento base al cargar el script
StorageManager.init();