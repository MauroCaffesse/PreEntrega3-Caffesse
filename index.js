let cliente;
let direc;

const carrito = [];
const productos = [
  { nombre: "Torta de Chocolate", precio: 15000 },
  { nombre: "Cupcakes de Vainilla", precio: 2000 },
  { nombre: "Croissants de Almendra", precio: 1500 },
  { nombre: "Tarta de Frutas", precio: 10200 },
  { nombre: "Galletas de Avena", precio: 800 },
];

function infoProducto(producto) {
  alert(
    `Usted seleccionó ${producto.nombre}, con un valor de $${producto.precio}.`
  );
}

function datosPersonales() {
  cliente = prompt(
    "Bienvenido/a a La Pasteleria by Cande Leogrande ¿Cómo es su nombre?"
  );

  if (cliente === null) {
    return;
  } else {
    while (cliente == "") {
      cliente = prompt("Por favor, escriba de nuevo su nombre.");
      if (cliente === null) {
        return;
      }
    }
  }
  alert("Bienvenido a la tienda, " + cliente);

  direc = prompt("Por favor, confirme su dirección de envío.");

  if (direc === null) {
    return;
  } else {
    while (direc == "") {
      direc = prompt("Por favor, escriba de nuevo su dirección.");
      if (direc === null) {
        return;
      }
    }
  }
  alert("Su dirección es " + direc);
}

function precioConInteres(precio, cuotas) {
  if (cuotas === 1) {
    return precio;
  } else if (cuotas === 3) {
    return precio * 1.05;
  } else if (cuotas === 6) {
    return precio * 1.1;
  } else if (cuotas === 12) {
    return precio * 1.3;
  } else {
    return null;
  }
}

function productoAlCarrito(producto) {
  infoProducto(producto);
  if (confirm("¿Desea agregarlo al carrito?")) {
    carrito.push(producto);
  } else {
    alert("No se agregó el producto al carrito.");
  }
}

function seleccionarProductos() {
  do {
    let selectProducto = Number(
      prompt(
        "Por favor, seleccione un producto del siguiente catálogo escribiendo el número de la lista:\n" +
          productos
            .map((producto, index) => `${index + 1} ${producto.nombre}`)
            .join("\n")
      )
    );

    if (selectProducto >= 1 && selectProducto <= productos.length) {
      productoAlCarrito(productos[selectProducto - 1]);
    } else {
      alert("Por favor, ingrese un número válido.");
    }
  } while (confirm("¿Desea agregar otro producto al carrito?"));
}

function compraProductos() {
  if (
    confirm(
      `Su carrito de compras tiene ${carrito.length} producto(s). ¿Desea proceder al pago?`
    )
  ) {
    const total = carrito.reduce(
      (acumulador, producto) => acumulador + producto.precio,
      0
    );

    alert(`El costo total de los productos es de $${total}.`);

    let cuotas;
    do {
      cuotas = parseInt(
        prompt("Seleccione la cantidad de cuotas (1, 3, 6, 12):")
      );
      if (![1, 3, 6, 12].includes(cuotas)) {
        alert("Por favor, seleccione una cantidad de cuotas válida.");
      }
    } while (![1, 3, 6, 12].includes(cuotas));

    const totalConInteres = Math.round(precioConInteres(total, cuotas));

    if (cuotas === 1) {
      alert(`El valor total de la compra es de $${totalConInteres}.`);
    } else {
      alert(
        `El valor total de la compra en ${cuotas} cuotas es de $${totalConInteres}.`
      );
    }

    if (confirm(`¿Desea finalizar la compra?`)) {
      alert(
        `Los productos serán enviados a la dirección ${direc}. ¡Gracias por su compra, ${cliente}!`
      );
    } else {
      alert("Usted canceló la transacción. ¡Lo esperamos pronto de vuelta!");
      return;
    }
  } else {
    alert("Usted canceló la transacción. ¡Lo esperamos pronto de vuelta!");
    return;
  }
}

datosPersonales();
if (cliente != null && direc != null) {
  seleccionarProductos();
  if (carrito.length != 0) {
    compraProductos();
  } else {
    alert(
      "Usted no agregó ningún producto al carrito. ¡Lo esperamos pronto de vuelta!"
    );
  }
} else {
  alert("Usted canceló la compra, ¡Lo esperamos pronto de vuelta!");
}
