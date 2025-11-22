export const DATA = {
  "groups": [
    { "id": "g1", "nombre": "Grupo A" },
    { "id": "g2", "nombre": "Grupo B" }
  ],
  "teams": [
    {
      "id": "t1",
      "nombre": "Tigres FC",
      "logo": "assets/logos/tigres.svg",
      "color": "#FFC107",
      "grupoId": "g1"
    },
    {
      "id": "t2",
      "nombre": "Águilas United",
      "logo": "assets/logos/aguilas.svg",
      "color": "#03A9F4",
      "grupoId": "g1"
    },
    {
      "id": "t7",
      "nombre": "Coyotes FC",
      "logo": "assets/logos/coyotes.svg",
      "color": "#FF5722",
      "grupoId": "g1"
    },
    {
      "id": "t8",
      "nombre": "Jaguares FC",
      "logo": "assets/logos/jaguares.svg",
      "color": "#607D8B",
      "grupoId": "g1"
    },
    {
      "id": "t3",
      "nombre": "Leones FC",
      "logo": "assets/logos/leones.svg",
      "color": "#4CAF50",
      "grupoId": "g2"
    },
    {
      "id": "t4",
      "nombre": "Lobos FC",
      "logo": "assets/logos/lobos.svg",
      "color": "#F44336",
      "grupoId": "g2"
    },
    {
      "id": "t5",
      "nombre": "Halcones FC",
      "logo": "assets/logos/halcones.svg",
      "color": "#9C27B0",
      "grupoId": "g2"
    },
    {
      "id": "t6",
      "nombre": "Tiburones FC",
      "logo": "assets/logos/tiburones.svg",
      "color": "#2196F3",
      "grupoId": "g2"
    }
  ],
  "players": [
    // Tigres FC Players
    { "id": "p1", "nombre": "Luis Perez", "edad": 23, "posicion": "Delantero", "equipoId": "t1", "goles": 5, "amarillas": 1, "rojas": 0 },
    { "id": "p3", "nombre": "Carlos Gomez", "edad": 25, "posicion": "Defensa", "equipoId": "t1", "goles": 1, "amarillas": 3, "rojas": 0 },
    { "id": "p4", "nombre": "Juan Diaz", "edad": 22, "posicion": "Mediocampista", "equipoId": "t1", "goles": 2, "amarillas": 0, "rojas": 0 },
    { "id": "p5", "nombre": "Pedro Martinez", "edad": 28, "posicion": "Portero", "equipoId": "t1", "goles": 0, "amarillas": 0, "rojas": 0 },
    { "id": "p6", "nombre": "Arturo Vidal", "edad": 29, "posicion": "Mediocampista", "equipoId": "t1", "goles": 4, "amarillas": 5, "rojas": 1 },
    { "id": "p7", "nombre": "Javier Hernandez", "edad": 26, "posicion": "Delantero", "equipoId": "t1", "goles": 6, "amarillas": 2, "rojas": 0 },
    { "id": "p8", "nombre": "Hector Moreno", "edad": 30, "posicion": "Defensa", "equipoId": "t1", "goles": 0, "amarillas": 1, "rojas": 0 },
    { "id": "p9", "nombre": "Andres Guardado", "edad": 31, "posicion": "Mediocampista", "equipoId": "t1", "goles": 3, "amarillas": 4, "rojas": 0 },
    // Águilas United Players
    { "id": "p2", "nombre": "Marco Soto", "edad": 21, "posicion": "Mediocampista", "equipoId": "t2", "goles": 3, "amarillas": 2, "rojas": 0, "suspendido": true },
    { "id": "p10", "nombre": "Ricardo Pelaez", "edad": 24, "posicion": "Delantero", "equipoId": "t2", "goles": 7, "amarillas": 0, "rojas": 0 },
    { "id": "p11", "nombre": "Jorge Campos", "edad": 27, "posicion": "Portero", "equipoId": "t2", "goles": 1, "amarillas": 1, "rojas": 0 },
    { "id": "p12", "nombre": "Rafael Marquez", "edad": 33, "posicion": "Defensa", "equipoId": "t2", "goles": 2, "amarillas": 6, "rojas": 1 },
    { "id": "p13", "nombre": "Cuauhtemoc Blanco", "edad": 35, "posicion": "Delantero", "equipoId": "t2", "goles": 8, "amarillas": 8, "rojas": 2 },
    { "id": "p14", "nombre": "Pavel Pardo", "edad": 29, "posicion": "Mediocampista", "equipoId": "t2", "goles": 4, "amarillas": 3, "rojas": 0 },
    { "id": "p15", "nombre": "Claudio Suarez", "edad": 32, "posicion": "Defensa", "equipoId": "t2", "goles": 1, "amarillas": 2, "rojas": 0 },
    { "id": "p16", "nombre": "Luis Hernandez", "edad": 28, "posicion": "Delantero", "equipoId": "t2", "goles": 9, "amarillas": 1, "rojas": 0 },
    // Leones FC Players
    { "id": "p17", "nombre": "Ana Torres", "edad": 22, "posicion": "Delantero", "equipoId": "t3", "goles": 10, "amarillas": 1, "rojas": 0 },
    { "id": "p18", "nombre": "Beatriz Solis", "edad": 24, "posicion": "Mediocampista", "equipoId": "t3", "goles": 5, "amarillas": 2, "rojas": 0 },
    { "id": "p19", "nombre": "Carla Mendoza", "edad": 21, "posicion": "Defensa", "equipoId": "t3", "goles": 1, "amarillas": 0, "rojas": 0 },
    { "id": "p20", "nombre": "Daniela Ortiz", "edad": 26, "posicion": "Portero", "equipoId": "t3", "goles": 0, "amarillas": 0, "rojas": 0 },
    { "id": "p21", "nombre": "Erika Luna", "edad": 23, "posicion": "Mediocampista", "equipoId": "t3", "goles": 3, "amarillas": 3, "rojas": 0 },
    { "id": "p22", "nombre": "Fernanda Castillo", "edad": 25, "posicion": "Delantero", "equipoId": "t3", "goles": 8, "amarillas": 1, "rojas": 0 },
    { "id": "p23", "nombre": "Gabriela Rios", "edad": 28, "posicion": "Defensa", "equipoId": "t3", "goles": 0, "amarillas": 2, "rojas": 0 },
    { "id": "p24", "nombre": "Hilda Navarro", "edad": 29, "posicion": "Mediocampista", "equipoId": "t3", "goles": 2, "amarillas": 4, "rojas": 0 },
    // Lobos FC Players
    { "id": "p25", "nombre": "Ivan Rojas", "edad": 23, "posicion": "Delantero", "equipoId": "t4", "goles": 7, "amarillas": 2, "rojas": 0 },
    { "id": "p26", "nombre": "Javier Salas", "edad": 25, "posicion": "Mediocampista", "equipoId": "t4", "goles": 4, "amarillas": 1, "rojas": 0 },
    { "id": "p27", "nombre": "Kevin Lara", "edad": 22, "posicion": "Defensa", "equipoId": "t4", "goles": 0, "amarillas": 3, "rojas": 0 },
    { "id": "p28", "nombre": "Leonel Mora", "edad": 27, "posicion": "Portero", "equipoId": "t4", "goles": 0, "amarillas": 0, "rojas": 0 },
    { "id": "p29", "nombre": "Manuel Ponce", "edad": 24, "posicion": "Mediocampista", "equipoId": "t4", "goles": 2, "amarillas": 5, "rojas": 1 },
    { "id": "p30", "nombre": "Nestor Vera", "edad": 26, "posicion": "Delantero", "equipoId": "t4", "goles": 6, "amarillas": 0, "rojas": 0 },
    { "id": "p31", "nombre": "Oscar Peña", "edad": 29, "posicion": "Defensa", "equipoId": "t4", "goles": 1, "amarillas": 1, "rojas": 0 },
    { "id": "p32", "nombre": "Pablo Cortes", "edad": 30, "posicion": "Mediocampista", "equipoId": "t4", "goles": 3, "amarillas": 2, "rojas": 0 },
    // Halcones FC Players
    { "id": "p33", "nombre": "Raul Jimenez", "edad": 28, "posicion": "Delantero", "equipoId": "t5", "goles": 12, "amarillas": 3, "rojas": 0 },
    { "id": "p34", "nombre": "Saul Ñiguez", "edad": 26, "posicion": "Mediocampista", "equipoId": "t5", "goles": 6, "amarillas": 4, "rojas": 0 },
    { "id": "p35", "nombre": "Tadeo Fernandez", "edad": 23, "posicion": "Defensa", "equipoId": "t5", "goles": 2, "amarillas": 1, "rojas": 0 },
    { "id": "p36", "nombre": "Ulises Davila", "edad": 29, "posicion": "Portero", "equipoId": "t5", "goles": 0, "amarillas": 0, "rojas": 0 },
    { "id": "p37", "nombre": "Victor Guzman", "edad": 25, "posicion": "Mediocampista", "equipoId": "t5", "goles": 5, "amarillas": 2, "rojas": 0 },
    { "id": "p38", "nombre": "Walter Sandoval", "edad": 27, "posicion": "Delantero", "equipoId": "t5", "goles": 9, "amarillas": 1, "rojas": 0 },
    { "id": "p39", "nombre": "Xavier Baez", "edad": 31, "posicion": "Defensa", "equipoId": "t5", "goles": 1, "amarillas": 5, "rojas": 1 },
    { "id": "p40", "nombre": "Yasser Corona", "edad": 32, "posicion": "Mediocampista", "equipoId": "t5", "goles": 3, "amarillas": 3, "rojas": 0 },
    // Tiburones FC Players
    { "id": "p41", "nombre": "Zacarias Flores", "edad": 24, "posicion": "Delantero", "equipoId": "t6", "goles": 8, "amarillas": 2, "rojas": 0 },
    { "id": "p42", "nombre": "Abelardo Montes", "edad": 26, "posicion": "Mediocampista", "equipoId": "t6", "goles": 4, "amarillas": 3, "rojas": 0 },
    { "id": "p43", "nombre": "Benjamin Paredes", "edad": 22, "posicion": "Defensa", "equipoId": "t6", "goles": 1, "amarillas": 1, "rojas": 0 },
    { "id": "p44", "nombre": "Cesar Villaluz", "edad": 28, "posicion": "Portero", "equipoId": "t6", "goles": 0, "amarillas": 0, "rojas": 0 },
    { "id": "p45", "nombre": "Damian Alvarez", "edad": 30, "posicion": "Mediocampista", "equipoId": "t6", "goles": 6, "amarillas": 5, "rojas": 0 },
    { "id": "p46", "nombre": "Elias Hernandez", "edad": 29, "posicion": "Delantero", "equipoId": "t6", "goles": 11, "amarillas": 0, "rojas": 0 },
    { "id": "p47", "nombre": "Francisco Fonseca", "edad": 33, "posicion": "Defensa", "equipoId": "t6", "goles": 2, "amarillas": 2, "rojas": 0 },
    { "id": "p48", "nombre": "Gerardo Torrado", "edad": 34, "posicion": "Mediocampista", "equipoId": "t6", "goles": 3, "amarillas": 7, "rojas": 1 },
    // Coyotes FC Players
    { "id": "p49", "nombre": "Adolfo Rios", "edad": 30, "posicion": "Portero", "equipoId": "t7", "goles": 0, "amarillas": 1, "rojas": 0 },
    { "id": "p50", "nombre": "Braulio Luna", "edad": 28, "posicion": "Mediocampista", "equipoId": "t7", "goles": 5, "amarillas": 3, "rojas": 0 },
    { "id": "p51", "nombre": "Christian Patiño", "edad": 26, "posicion": "Delantero", "equipoId": "t7", "goles": 9, "amarillas": 2, "rojas": 0 },
    { "id": "p52", "nombre": "Duilio Davino", "edad": 32, "posicion": "Defensa", "equipoId": "t7", "goles": 1, "amarillas": 4, "rojas": 0 },
    { "id": "p53", "nombre": "Enrique Esqueda", "edad": 24, "posicion": "Delantero", "equipoId": "t7", "goles": 7, "amarillas": 1, "rojas": 0 },
    { "id": "p54", "nombre": "Fabian Estay", "edad": 31, "posicion": "Mediocampista", "equipoId": "t7", "goles": 6, "amarillas": 6, "rojas": 1 },
    { "id": "p55", "nombre": "German Villa", "edad": 29, "posicion": "Mediocampista", "equipoId": "t7", "goles": 3, "amarillas": 5, "rojas": 0 },
    { "id": "p56", "nombre": "Hugo Sanchez", "edad": 38, "posicion": "Delantero", "equipoId": "t7", "goles": 15, "amarillas": 0, "rojas": 0 },
    // Jaguares FC Players
    { "id": "p57", "nombre": "Ignacio Ambriz", "edad": 33, "posicion": "Defensa", "equipoId": "t8", "goles": 2, "amarillas": 7, "rojas": 1 },
    { "id": "p58", "nombre": "Jared Borgetti", "edad": 31, "posicion": "Delantero", "equipoId": "t8", "goles": 14, "amarillas": 1, "rojas": 0 },
    { "id": "p59", "nombre": "Jesus Arellano", "edad": 29, "posicion": "Mediocampista", "equipoId": "t8", "goles": 8, "amarillas": 3, "rojas": 0 },
    { "id": "p60", "nombre": "Joaquin del Olmo", "edad": 30, "posicion": "Mediocampista", "equipoId": "t8", "goles": 4, "amarillas": 4, "rojas": 0 },
    { "id": "p61", "nombre": "Jose Manuel Abundis", "edad": 27, "posicion": "Delantero", "equipoId": "t8", "goles": 10, "amarillas": 2, "rojas": 0 },
    { "id": "p62", "nombre": "Juan Francisco Palencia", "edad": 32, "posicion": "Delantero", "equipoId": "t8", "goles": 11, "amarillas": 5, "rojas": 0 },
    { "id": "p63", "nombre": "Luis Garcia", "edad": 34, "posicion": "Delantero", "equipoId": "t8", "goles": 13, "amarillas": 3, "rojas": 0 },
    { "id": "p64", "nombre": "Manuel Negrete", "edad": 36, "posicion": "Mediocampista", "equipoId": "t8", "goles": 7, "amarillas": 6, "rojas": 1 }
  ],
  "matches": [
    {
      "id": "m1",
      "fecha": "2025-10-20",
      "horario": "15:00",
      "ubicacion": "Cancha Principal",
      "equipoA": "t1",
      "equipoB": "t2",
      "golesA": 2,
      "golesB": 1,
      "estado": "finalizado"
    },
    {
      "id": "m2",
      "fecha": "2025-10-27",
      "horario": "17:00",
      "ubicacion": "Cancha Secundaria",
      "equipoA": "t3",
      "equipoB": "t4",
      "golesA": 1,
      "golesB": 1,
      "estado": "finalizado"
    },
    {
      "id": "m3",
      "fecha": "2025-10-28",
      "horario": "19:00",
      "ubicacion": "Cancha Principal",
      "equipoA": "t5",
      "equipoB": "t6",
      "golesA": 3,
      "golesB": 2,
      "estado": "finalizado"
    },
    {
      "id": "m4",
      "fecha": "2025-11-03",
      "horario": "15:00",
      "ubicacion": "Cancha Principal",
      "equipoA": "t7",
      "equipoB": "t8",
      "golesA": null,
      "golesB": null,
      "estado": "proximo"
    },
    {
      "id": "m5",
      "fecha": "2025-11-04",
      "horario": "17:00",
      "ubicacion": "Cancha Secundaria",
      "equipoA": "t1",
      "equipoB": "t7",
      "golesA": null,
      "golesB": null,
      "estado": "proximo"
    }
  ]
}
