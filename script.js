//Variable que mantiene el estado visible del carrito
var carritoVisible = false;

//Esperamos que todos los elementos de la página cargen para ejecutar el script
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready); //Una vez cargada la página se ejecutará la función ready
} else {
  ready();
}

function ready() {
  //Agregando funcionalidad a los botones eliminar del carrito
  var botonesEliminarItem = document.getElementsByClassName("btn-eliminar");
  //recorriendo todos los elementos almacenados en la variable botonesEliminarItem
  for (var i = 0; i < botonesEliminarItem.length; i++) {
    var button = botonesEliminarItem[i];
    button.addEventListener("click", eliminarItemCarrito); //Cuando se haga clic en el boton de eliminar se ejecutará
  }

  //Agregando funcionalidad al boton sumar cantidad
  var botonesSumarCantidad = document.getElementsByClassName("sumar-cantidad");
  //recorriendo todos los elementos almacenados en la variable botonesSumarCantidad
  for (var i = 0; i < botonesSumarCantidad.length; i++) {
    var button = botonesSumarCantidad[i];
    button.addEventListener("click", sumarCantidad);
  }

  //Agregando funcionalidad al buton restar cantidad
  var botonesRestarCantidad =
    document.getElementsByClassName("restar-cantidad");
  for (var i = 0; i < botonesRestarCantidad.length; i++) {
    var button = botonesRestarCantidad[i];
    button.addEventListener("click", restarCantidad);
  }

  //Agregamos funcionalidad al boton Agregar al carrito
  var botonesAgregarAlCarrito = document.getElementsByClassName("boton-item");
  for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
    var button = botonesAgregarAlCarrito[i];
    button.addEventListener("click", agregarAlCarritoClicked);
  }

  //Agregamos funcionalidad al botón comprar
  document
    .getElementsByClassName("btn-pagar")[0]
    .addEventListener("click", pagarClicked);
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked() {
  alert("Muchas gracias por su compra");
  //Eliminamos todos los elmentos del carrito
  var carritoItems = document.getElementsByClassName("carrito-items")[0];
  while (carritoItems.hasChildNodes()) {
    carritoItems.removeChild(carritoItems.firstChild);
  }
  actualizarTotalCarrito();
  ocultarCarrito();
}
//Función que controla el botón clickeado de agregar al carrito
function agregarAlCarritoClicked(event) {
  var button = event.target; //guardamos el elemento en el que se hizo clic en la variable button. event representa el evento que ocurrió, y target se refiere al elemento en el que se originó el evento.
  var item = button.parentElement; //guardamos en la variable item el elemento padre del botón en el que se hizo clic.
  var titulo = item.getElementsByClassName("titulo-item")[0].innerText; //seleccionamos el elemento con la clase "titulo-item" y guardamos su texto en la variable titulo
  var precio = item.getElementsByClassName("precio-item")[0].innerText;
  var imagenSrc = item.getElementsByClassName("img-item")[0].src;
  console.log(imagenSrc);

  agregarItemAlCarrito(titulo, precio, imagenSrc); //llamamos a la función agregarItemAlCarrito pasamos como argumentos titulo, precio e imagenSrc.

  hacerVisibleCarrito(); //Llamamos a la función hacerVisibleCarrito para mostrar el carrito de compras después de agregar un artículo.
}

//Función que hace visible el carrito
function hacerVisibleCarrito() {
  carritoVisible = true;
  var carrito = document.getElementsByClassName("carrito")[0];
  carrito.style.marginRight = "0";
  carrito.style.opacity = "1";

  var items = document.getElementsByClassName("contenedor-items")[0];
  items.style.width = "60%";
}

//Función que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
  var item = document.createElement("div");
  item.classList.add = "item";
  var itemsCarrito = document.getElementsByClassName("carrito-items")[0];

  //controlamos que el item que intenta ingresar no se encuentre en el carrito
  var nombresItemsCarrito = itemsCarrito.getElementsByClassName(
    "carrito-item-titulo"
  );
  for (var i = 0; i < nombresItemsCarrito.length; i++) {
    if (nombresItemsCarrito[i].innerText == titulo) {
      alert("El item ya se encuentra en el carrito");
      return;
    }
  }

  var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
  item.innerHTML = itemCarritoContenido;
  itemsCarrito.append(item);

  //Agregamos la funcionalidad eliminar al nuevo item
  item
    .getElementsByClassName("btn-eliminar")[0]
    .addEventListener("click", eliminarItemCarrito);

  //Agregamos la funcionalidad restar cantidad del nuevo item
  var botonRestarCantidad = item.getElementsByClassName("restar-cantidad")[0];
  botonRestarCantidad.addEventListener("click", restarCantidad);

  //Agregamos la funcionalidad sumar cantidad del nuevo item
  var botonSumarCantidad = item.getElementsByClassName("sumar-cantidad")[0];
  botonSumarCantidad.addEventListener("click", sumarCantidad);

  //Actualizamos el precio total
  actualizarTotalCarrito();
}

//Aumentamos en uno la cantidad del elemento seleccionado
function sumarCantidad(event) {
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  console.log(
    selector.getElementsByClassName("carrito-item-cantidad")[0].value
  );
  var cantidadActual = selector.getElementsByClassName(
    "carrito-item-cantidad"
  )[0].value;
  cantidadActual++;
  selector.getElementsByClassName("carrito-item-cantidad")[0].value =
    cantidadActual;
  actualizarTotalCarrito();
}

//Restamos en uno la cantidad del elemento seleccionado
function restarCantidad(event) {
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  console.log(
    selector.getElementsByClassName("carrito-item-cantidad")[0].value
  );
  var cantidadActual = selector.getElementsByClassName(
    "carrito-item-cantidad"
  )[0].value;
  cantidadActual--;
  if (cantidadActual >= 1) {
    selector.getElementsByClassName("carrito-item-cantidad")[0].value =
      cantidadActual;
    actualizarTotalCarrito();
  }
}

//Eliminamos el item seleccionado del carrito
function eliminarItemCarrito(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  //Actualizamos el total del carrito
  actualizarTotalCarrito();

  //Esta función controla si hay elementos en el carrito
  ocultarCarrito(); //Si no hay elimino el carrito
}

//Funciòn que controla si hay elementos en el carrito, de no haber se oculta el carrito
function ocultarCarrito() {
  var carritoItems = document.getElementsByClassName("carrito-items")[0];
  if (carritoItems.childElementCount == 0) {
    var carrito = document.getElementsByClassName("carrito")[0];
    carrito.style.marginRight = "-100%";
    carrito.style.opacity = "0";
    carritoVisible = false;

    var items = document.getElementsByClassName("contenedor-items")[0];
    items.style.width = "100%";
  }
}

//Actualizamos el total de Carrito
function actualizarTotalCarrito() {
  //seleccionamos el contenedor carrito
  var carritoContenedor = document.getElementsByClassName("carrito")[0];
  var carritoItems = carritoContenedor.getElementsByClassName("carrito-item");
  var total = 0;
  //recorremos cada elemento del carrito para actualizar el total
  for (var i = 0; i < carritoItems.length; i++) {
    var item = carritoItems[i];
    var precioElemento = item.getElementsByClassName("carrito-item-precio")[0];
    //Quitamos el simobolo peso y el punto de milesimos.
    var precio = parseFloat(
      precioElemento.innerText.replace("S/", "").replace(".", "")
    );
    var cantidadItem = item.getElementsByClassName("carrito-item-cantidad")[0];
    console.log(precio);
    var cantidad = cantidadItem.value;
    total = total + precio * cantidad;
  }
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("carrito-precio-total")[0].innerText =
    "S/" + total.toLocaleString("es") + ".00";
}

function guardarCompras() {
  // Obtener todos los elementos del carrito
  var carritoItems = document.getElementsByClassName("carrito-item");

  // Crear un arreglo para almacenar los productos
  var productos = [];

  // Recorrer cada elemento del carrito y capturar la información del producto
  for (var i = 0; i < carritoItems.length; i++) {
    var item = carritoItems[i];

    var titulo = item.getElementsByClassName("carrito-item-titulo")[0]
      .innerText;
    var precio = item.getElementsByClassName("carrito-item-precio")[0]
      .innerText;
    var imagenSrc = item.getElementsByTagName("img")[0].src;

    // Crear un objeto que represente el producto
    var producto = {
      titulo: titulo,
      precio: precio,
      imagenSrc: imagenSrc,
    };

    // Agregar el producto al arreglo
    productos.push(producto);
  }

  // Guardar los productos en el almacenamiento local
  localStorage.setItem("productos", JSON.stringify(productos));

  // Mostrar un mensaje de éxito o redireccionar a la página de confirmación de compra
  alert("¡Compra realizada con éxito!");

  // Redireccionar a la página de confirmación de compra
  window.location.href = "compras.html";
}
