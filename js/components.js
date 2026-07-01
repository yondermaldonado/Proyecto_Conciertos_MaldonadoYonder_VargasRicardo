class EventCard extends HTMLElement {
    connectedCallback() {
        const name = this.getAttribute('name');
        const price = parseInt(this.getAttribute('price')).toLocaleString();
        const date = this.getAttribute('date');
        const city = this.getAttribute('city');
        const image = this.getAttribute('image');
        const category = this.getAttribute('category-name') || 'Evento';
        const id = this.getAttribute('event-id');

        this.innerHTML = `
            <article class="tarjeta-evento" style="background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.05); display: flex; flex-direction: column; height: 100%;">
                <div class="imagen-contenedor" style="position: relative; height: 200px; overflow: hidden;">
                    <span class="tag-categoria" style="position: absolute; top: 15px; left: 15px; background: #1a1a2e; color: #ffd700; padding: 5px 12px; font-size: 12px; font-weight: bold; border-radius: 20px;">${category}</span>
                    <img src="${image}" alt="${name}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="info-evento" style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h3 style="font-size: 1.3rem; margin-bottom: 10px; color: #1a1a2e;">${name}</h3>
                        <p class="detalles" style="font-size: 14px; color: #7f8c8d; margin-bottom: 15px; line-height: 1.4;">
                            📅 ${date}<br>📍 ${city}
                        </p>
                    </div>
                    <div class="footer-tarjeta" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f1f1; padding-top: 15px;">
                        <span class="precio" style="font-size: 1.2rem; font-weight: bold; color: #ff4d4d;">$${price} COP</span>
                        <div style="display: flex; gap: 5px;">
                            <button class="btn-ver btn-secondary" data-id="${id}" style="padding: 6px 10px; font-size:12px; border-radius:5px; cursor:pointer;">Detalles</button>
                            <button class="btn-comprar btn-primary" data-id="${id}" style="padding: 6px 10px; font-size:12px; border-radius:5px; cursor:pointer;">Añadir</button>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }
}
customElements.define('event-card', EventCard);