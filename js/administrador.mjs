import { productosDisponibles, generarCards } from "./home.mjs";

const btnAgregar = document.querySelector("#agregar__producto");
const usuarioLoggeado = JSON.parse(sessionStorage.getItem("usuario"));
const agregarProductos = document.querySelector("#form__agregar");
const divProductos = document.querySelector("#productContainer");
const btnModificar = document.querySelector("#btn__modificar");

export const eliminarProducto = (id) => {
  const productoEliminar = productosDisponibles.findIndex(
    (producto) => producto.id === id
  );
  productosDisponibles.splice(productoEliminar, 1);
  localStorage.setItem("productos", JSON.stringify(productosDisponibles));
  generarCards(JSON.parse(localStorage.getItem("productos")));
};

class Productos {
  constructor(nombre, precio, imagen) {
    this.id = generarId();
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
  }
}

const generarId = () => {
  const id = productosDisponibles.map((producto) => {
    return producto.id;
  });

  const max = Math.max(...id) + 1;
  return max;
};

usuarioLoggeado?.admin === true
  ? (btnAgregar.style.display = "block")
  : (btnAgregar.style.display = "none");

usuarioLoggeado?.admin === true
  ? (btnModificar.style.display = "block")
  : (btnModificar.style.display = "none");

const generarVistaAgregar = () => {
  agregarProductos.innerHTML = "";

  agregarProductos.style.display = "block";
  const form = document.createElement("form");

  form.innerHTML = `
    <div>
      <label for="nombre">Nombre:</label>
      <input type="text" name="" id="nombre" />
    </div>
    <div>
      <label for="precio">Precio:</label>
      <input type="text" name="" id="precio" />
    </div>
    <div>
      <label for="imagen">Imagen:</label>
      <input type="text" name="" id="imagen" />
    </div>
    <button id="cargar" class="btn btn-primary" type="button">Cargar</button>
    <button id="cerrar" class="btn btn-danger" type="button"> X Cerrar</button>
    `;
  agregarProductos.appendChild(form);

  const btnCargar = document.getElementById("cargar");
  btnCargar.addEventListener("click", (e) => {
    e.preventDefault();
    guardarProducto();
  });
  const btnCerrar = document.querySelector("#cerrar");
  btnCerrar.addEventListener("click", () => {
    agregarProductos.style.display = "none";
  });
};

btnAgregar.addEventListener("click", generarVistaAgregar);

const guardarProducto = () => {
  const nombre = agregarProductos.children[0][0].value;
  const precio = agregarProductos.children[0][1].value;
  const imagen = agregarProductos.children[0][2].value;

  if (nombre !== "" && precio !== "" && imagen !== "") {
    const nuevoProducto = new Productos(nombre, precio, imagen);

    productosDisponibles.push(nuevoProducto);

    localStorage.setItem("productos", JSON.stringify(productosDisponibles));

    agregarProductos.style.display = "none";

    generarCards(productosDisponibles);
  } else {
    alert("algun/os valores no estan completos");
  }
};

const modificarProductosCard = () => {
  divProductos.innerHTML = "";

  productosDisponibles.forEach((producto) => {
    let card = document.createElement("div");
    card.className = "producto";
    card.innerHTML = `
      <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="${producto.imagen}" alt="Card image cap">
      <p>Imagen: <input type="text" value="${producto.imagen}"></p>
      <p>Nombre: <input type="text" value="${producto.nombre}"></p>
      <p>Precio: <input type="text" value="${producto.precio}"></p>
      <div class="card-body">
      <button id="boton${producto.id}" class="btn btn-success">Modificar</button>
      <button id="cancelar${producto.id}" class="btn btn-danger">Cancelar</button>
      </div>
      
      </div>`;

    divProductos.appendChild(card);
    const btnAceptar = document.getElementById(`boton${producto.id}`);
    const btnCancelar = document.getElementById(`cancelar${producto.id}`);

    btnAceptar.addEventListener("click", (e) =>
      modificarProductos(e, producto.id)
    );
    btnCancelar.addEventListener("click", () =>
      generarCards(productosDisponibles)
    );
  });
};

btnModificar.addEventListener("click", () => {
  modificarProductosCard();
});

const modificarProductos = (e, id) => {
  const indexProducto = productosDisponibles.findIndex(
    (producto) => producto.id === id
  );

  const imagen =
    e.target.parentElement.parentElement.children[1].children[0].value;
  const nombre =
    e.target.parentElement.parentElement.children[2].children[0].value;
  const precio =
    e.target.parentElement.parentElement.children[3].children[0].value;

  productosDisponibles[indexProducto].nombre = nombre;
  productosDisponibles[indexProducto].precio = precio;

  productosDisponibles[indexProducto].imagen = imagen;

  localStorage.setItem("productos", JSON.stringify(productosDisponibles));
  generarCards(productosDisponibles);
};
