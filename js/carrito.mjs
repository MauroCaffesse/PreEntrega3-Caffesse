import { productosDisponibles } from "./home.mjs";

JSON.parse(sessionStorage.getItem("carrito")) === null &&
  sessionStorage.setItem("carrito", JSON.stringify([]));

let carrito = JSON.parse(sessionStorage.getItem("carrito"));
const listCarrito = document.querySelector("#items");
const footCarrito = document.querySelector("#totales");
const btnCarrito = document.querySelector("#btnCarrito");

const carritoTable = document.querySelector("#carrito");

export const comprarProducto = (idProd) => {
  const producto = productosDisponibles.find(
    (producto) => producto.id === idProd
  );
  const { id, nombre, precio, imagen } = producto;

  const productoCarrito = carrito.find((producto) => producto.id === idProd);

  if (productoCarrito === undefined) {
    const nuevoProductoCarrito = {
      id,
      nombre,
      imagen,
      precio,
      cantidad: 1,
    };
    carrito.push(nuevoProductoCarrito);
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
  } else {
    const indexProducto = carrito.findIndex(
      (producto) => producto.id === idProd
    );
    carrito[indexProducto].cantidad++;
    carrito[indexProducto].precio = precio * carrito[indexProducto].cantidad;

    sessionStorage.setItem("carrito", JSON.stringify(carrito));
  }
  carrito = JSON.parse(sessionStorage.getItem("carrito"));
};

const dibujarCarrito = () => {
  listCarrito.innerHTML = "";
  carrito.forEach((producto) => {
    const { id, nombre, imagen, precio, cantidad } = producto;
    let body = document.createElement("tr");
    body.className = "producto_carrito";
    body.innerHTML = `
    <th><img id="fotoProductoCarrito" src="${imagen}" class="card-img-top" style="width:40%; height: 30%"</th>
    <td>${nombre}</td>
    <td>${cantidad}</td>
    <td>${precio / cantidad}</td>
    <td>${precio}</td>
    <td>
      <button id="+${id}" class="btn btn-success">+</button>
      <button id="-${id}" class="btn btn-danger">-</button>
    </td>
    `;

    listCarrito.append(body);

    const btnAgregar = document.getElementById(`+${id}`);
    const btnRestar = document.getElementById(`-${id}`);

    btnAgregar.addEventListener("click", () => aumentarCantidad(id));
    btnRestar.addEventListener("click", () => restarCantidad(id));
  });

  dibujarFooter();
};

const dibujarFooter = () => {
  if (carrito.length > 0) {
    footCarrito.innerHTML = "";
    let footer = document.createElement("tr");

    footer.innerHTML = `
      <th><b>Totales:</b></th>
      <td></td>
      <td>${generarTotales().cantidadTotal}</td>
      <td></td>
      <td>${generarTotales().costoTotal}</td>
      `;

    footCarrito.append(footer);
  } else {
    footCarrito.innerHTML = "<h3>No hay producto en el carrito </h3>";
  }
};

document.addEventListener("DOMContentLoaded", dibujarCarrito);
btnCarrito.addEventListener("click", () => {
  if (carritoTable.style.display === "block") {
    carritoTable.style.display = "none";
  } else {
    carritoTable.style.display = "block";
    dibujarCarrito();
  }
});

const generarTotales = () => {
  const costoTotal = carrito.reduce((total, { precio }) => total + precio, 0);
  const cantidadTotal = carrito.reduce(
    (total, { cantidad }) => total + cantidad,
    0
  );

  return {
    costoTotal: costoTotal,
    cantidadTotal: cantidadTotal,
  };
};

const aumentarCantidad = (id) => {
  const indexProducto = carrito.findIndex((producto) => producto.id === id);
  const precio =
    carrito[indexProducto].precio / carrito[indexProducto].cantidad;

  carrito[indexProducto].cantidad++;
  carrito[indexProducto].precio = precio * carrito[indexProducto].cantidad;

  sessionStorage.setItem("carrito", JSON.stringify(carrito));
  dibujarCarrito();
};

const restarCantidad = (id) => {
  const indexProducto = carrito.findIndex((producto) => producto.id === id);
  const precio =
    carrito[indexProducto].precio / carrito[indexProducto].cantidad;

  carrito[indexProducto].cantidad--;
  carrito[indexProducto].precio = precio * carrito[indexProducto].cantidad;

  if (carrito[indexProducto].cantidad === 0) {
    carrito.splice(indexProducto, 1);
  }

  sessionStorage.setItem("carrito", JSON.stringify(carrito));
  dibujarCarrito();
};
