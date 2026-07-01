const StorageManager = {
    init() {
        if (!localStorage.getItem('categories')) {
            localStorage.setItem('categories', JSON.stringify(initialCategories));
        }
        if (!localStorage.getItem('events')) {
            localStorage.setItem('events', JSON.stringify(initialEvents));
        }
        if (!localStorage.getItem('sales')) {
            localStorage.setItem('sales', JSON.stringify([]));
        }
    },
    get(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    },
    set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    showAlert(message, type = 'success') {
        alert(`[${type.toUpperCase()}] ${message}`);
    }
};
StorageManager.init();