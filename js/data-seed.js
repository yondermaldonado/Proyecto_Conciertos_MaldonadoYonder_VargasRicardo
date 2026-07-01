const initialCategories = [
    { id: "cat-1", name: "Conciertos", description: "Festivales y eventos musicales en vivo" },
    { id: "cat-2", name: "Deportes", description: "Torneos, partidos y encuentros atléticos" },
    { id: "cat-3", name: "Sorteos", description: "Rifas y actividades pro-fondos" }
];

const initialEvents = [
    {
        id: "EV-001",
        name: "Festival de Música Urbana",
        category: "cat-1",
        price: 45000,
        date: "2026-10-15",
        time: "19:00",
        city: "Cúcuta",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500",
        description: "El festival más grande del año con artistas internacionales en el Estadio General Santander."
    },
    {
        id: "EV-002",
        name: "Gran Torneo de Fútbol Local",
        category: "cat-2",
        price: 15000,
        date: "2026-10-22",
        time: "14:00",
        city: "Bucaramanga",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=500",
        description: "Apoya a tu equipo local en las canchas profesionales de la región."
    }
];