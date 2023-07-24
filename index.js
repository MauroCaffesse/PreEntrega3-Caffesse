// Algoritmo que calcula el precio final de cada producto y sus respectivas cuotas, dependiendo de la cantidad de cuotas elegida.

let numProductos = Number(prompt('Ingrese cantidad de productos'));

if (isNaN(numProductos)) {
  alert('Error: No ingresó un número');
} else {
  for (let i = 1; i <= numProductos ; i++) {
    let precioProd = Number(prompt('Ingrese precio del producto'));
    let cuotas = Number(prompt('Ingrese la cantidad de cuotas que desea realizar su compra'));

    if (isNaN(precioProd) || isNaN(cuotas)) {
      alert('Error: No ingresó un número');
    } else {
      if (cuotas >= 1 && cuotas <= 3) {
        alert('Su compra no presenta interes' + '\n' + 'El precio final del producto es $' + precioProd + '\n' + 'Cada cuota es de $' + (precioProd / cuotas));
      } else if (cuotas > 3 && cuotas <= 6) {
        let precioFinal = precioProd * 1.1;
        alert('Su compra presenta un interés del 10%' + '\n' + 'El precio final del producto es $' + precioFinal + '\n' + 'Cada cuota es de $' + (precioFinal / cuotas));
      } else if (cuotas > 6 && cuotas <= 12) {
        let precioFinal = precioProd * 1.2;
        alert('Su compra presenta un interés del 20%' + '\n' + 'El precio final del producto es $' + precioFinal + '\n' + 'Cada cuota es de $' + (precioFinal / cuotas));
      } else {
        alert('El límite de cuotas es 12');
      }
    }
  }
}