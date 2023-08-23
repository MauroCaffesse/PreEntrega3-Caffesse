export const productos = [
  {
    id: 1,
    nombre: "Lemonpie",
    precio: 12000,
    imagen: "./img/IMG-20230131-WA0063.jpg",
  },
  {
    id: 2,
    nombre: "Tarta de coco",
    precio: 13000,
    imagen: "./img/IMG-20230131-WA0064.jpg",
  },
  {
    id: 3,
    nombre: "Tarta de frutas",
    precio: 10000,
    imagen: "./img/IMG-20230131-WA0065.jpg",
  },
  {
    id: 4,
    nombre: "Torta de chocolate",
    precio: 15000,
    imagen: "./img/IMG-20230131-WA0066.jpg",
  },
  {
    id: 5,
    nombre: "Torta letra",
    precio: 13500,
    imagen: "./img/IMG-20230131-WA0067.jpg",
  },
  {
    id: 6,
    nombre: "Cheesecake frutos rojos",
    precio: 16000,
    imagen: "./img/IMG-20230131-WA0068.jpg",
  },
  {
    id: 7,
    nombre: "Torta chocolate y frutillas",
    precio: 15000,
    imagen: "./img/IMG-20230131-WA0069.jpg",
  },
  {
    id: 8,
    nombre: "Tarta toffee",
    precio: 12000,
    imagen: "./img/IMG-20230131-WA0070.jpg",
  },
];

JSON.parse(localStorage.getItem("productos")) ||
  localStorage.setItem("productos", JSON.stringify(productos));
