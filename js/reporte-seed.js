const ventasIniciales = [

    {
        id: "VEN-001",

        fecha: "15/01/2026",

        timestamp: new Date("2026-01-15").getTime(),

        ciudad: "Bogotá",

        cliente: {
            identificacion: "1001",
            nombre: "Juan Pérez",
            direccion: "Calle 10",
            telefono: "3001111111",
            email: "juan@mail.com"
        },

        tickets: [

            {
                id: "EV-001",
                name: "Festival de Música Urbana",
                price: 45000
            },

            {
                id: "EV-001",
                name: "Festival de Música Urbana",
                price: 45000
            }

        ],

        cantidad: 2,

        total: 90000
    },

    {
        id: "VEN-002",

        fecha: "20/01/2026",

        timestamp: new Date("2026-01-20").getTime(),

        ciudad: "Medellín",

        cliente: {
            identificacion: "1002",
            nombre: "María Gómez",
            direccion: "Carrera 20",
            telefono: "3002222222",
            email: "maria@mail.com"
        },

        tickets: [

            {
                id: "EV-002",
                name: "Concierto Rock Fest",
                price: 80000
            }

        ],

        cantidad: 1,

        total: 80000
    },

    {
        id: "VEN-003",

        fecha: "08/02/2026",

        timestamp: new Date("2026-02-08").getTime(),

        ciudad: "Cúcuta",

        cliente: {
            identificacion: "1003",
            nombre: "Carlos Ruiz",
            direccion: "Av. Libertadores",
            telefono: "3003333333",
            email: "carlos@mail.com"
        },

        tickets: [

            {
                id: "EV-001",
                name: "Festival de Música Urbana",
                price: 45000
            },

            {
                id: "EV-001",
                name: "Festival de Música Urbana",
                price: 45000
            },

            {
                id: "EV-003",
                name: "Noche de Salsa",
                price: 60000
            }

        ],

        cantidad: 3,

        total: 150000
    }

];