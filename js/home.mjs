import { comprarProducto } from "./carrito.mjs";
import { eliminarProducto } from "./administrador.mjs";

const userLogin = document.querySelector("#userLogin");
const productContainer = document.querySelector("#productContainer");

export let productosDisponibles = JSON.parse(localStorage.getItem("productos"));
let usuarioLoggeado = JSON.parse(sessionStorage.getItem("usuario"));

document.addEventListener("DOMContentLoaded", () => {
  if (usuarioLoggeado === null) {
    const a = document.createElement("a");
    a.href = "./html/usuario.html";
    a.innerHTML = "Login";
    userLogin.appendChild(a);
  } else {
    const p = document.createElement("p");
    const close = document.createElement("button");

    p.innerHTML = `Bienvenido ${usuarioLoggeado.user}`;
    close.id = "cerrar__sesion";
    close.innerHTML = "Cerrar sesion";
    close.addEventListener("click", () => {
      alert(
        `Gracias por comprar en nuestra tienda ${usuarioLoggeado.user}. Usuario desloggeado`
      );

      sessionStorage.removeItem("usuario");
      location.reload();
    });
    userLogin.appendChild(p);
    userLogin.appendChild(close);
  }
  generarCards(productosDisponibles);
});

export const generarCards = (productos) => {
  productContainer.innerHTML = "";
  productos.forEach((producto) => {
    const { id, nombre, imagen, precio } = producto;
    let card = document.createElement("div");

    card.className = "producto";
    card.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img src="${imagen}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">$${precio}</p>
        <button id="comprar${id}" class="btn btn-primary">Comprar</button>

        ${
          usuarioLoggeado?.admin === true
            ? `<button id="eliminar${id}" class="btn btn-danger">Eliminar</button>`
            : ""
        }
      </div>
    </div>
    `;
    productContainer.appendChild(card);
    const btnComprar = document.getElementById(`comprar${id}`);
    btnComprar.addEventListener("click", () => comprarProducto(id));

    if (usuarioLoggeado?.admin === true) {
      const btnEliminar = document.getElementById(`eliminar${id}`);
      btnEliminar.addEventListener("click", () => eliminarProducto(id));
    }
  });
};
