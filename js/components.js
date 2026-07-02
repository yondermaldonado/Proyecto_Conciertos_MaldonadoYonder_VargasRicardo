// js/components.js

class EventCard extends HTMLElement {
    connectedCallback() {
        const name = this.getAttribute('name');
        const price = parseInt(this.getAttribute('price')).toLocaleString();
        const date = this.getAttribute('date');
        const city = this.getAttribute('city');
        const image = this.getAttribute('image');
        const categoryName = this.getAttribute('category-name') || 'Evento';
        const id = this.getAttribute('event-id');

        this.innerHTML = `
            <article class="tarjeta-evento">
                <div class="imagen-contenedor">
                    <span class="tag-categoria">${categoryName}</span>
                    <img src="${image}" alt="${name}">
                </div>
                <div class="info-evento">
                    <h3>${name}</h3>
                    <p class="detalles">📅 ${date}<br>📍 ${city}</p>
                    <div class="footer-tarjeta">
                        <span class="precio">$${price} COP</span>
                        <div style="display: flex; gap: 5px;">
                            <button class="btn-ver btn-secondary" data-id="${id}">Detalles</button>
                            <button class="btn-comprar btn-primary" data-id="${id}">Añadir</button>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }
}

customElements.define('event-card', EventCard);