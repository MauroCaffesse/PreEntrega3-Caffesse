// Algoritmo que calcula el precio final de cada producto y sus respectivas cuotas, dependiendo de la cantidad de cuotas elegida.

function pedirNumero(mensaje) {
  const input = Number(prompt(mensaje));
  if (isNaN(input)) {
    return null;
  } else {
    return input;
  }
}

function calcularInteres(precioProd, cuotas) {
  if (cuotas >= 1 && cuotas <= 3) {
    return { interes: 0, precioFinal: precioProd, precioCuota: precioProd / cuotas };
  } else if (cuotas > 3 && cuotas <= 6) {
    const precioFinal = precioProd * 1.1;
    return { interes: 10, precioFinal: precioFinal, precioCuota: precioFinal / cuotas };
  } else if (cuotas > 6 && cuotas <= 12) {
    const precioFinal = precioProd * 1.2;
    return { interes: 20, precioFinal: precioFinal, precioCuota: precioFinal / cuotas };
  } else {
    return { error: 'El límite de cuotas es 12' };
  }
}

function calcularPreciosProductos(numProductos) {
  for (let i = 1; i <= numProductos; i++) {
    const precioProd = pedirNumero('Ingrese precio del producto');
    const cuotas = pedirNumero('Ingrese la cantidad de cuotas que desea realizar su compra');

    if (precioProd === null || cuotas === null) {
      alert('Error: No ingresó un número');
    } else {
      const resultado = calcularInteres(precioProd, cuotas);
      if (resultado.error) {
        alert(resultado.error);
      } else {
        alert('Su compra presenta un interés del ' + resultado.interes + '%'
          + '\n' + 'El precio final del producto es $' + resultado.precioFinal
          + '\n' + 'Cada cuota es de $' + resultado.precioCuota);
      }
    }
  }
}

const numProductos = pedirNumero('Ingrese cantidad de productos');

if (numProductos === null) {
  alert('Error: No ingresó un número');
} else {
  calcularPreciosProductos(numProductos);
}