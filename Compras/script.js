// Obtener los datos almacenados en el LocalStorage
var compras = JSON.parse(localStorage.getItem("compras")) || [];

// Función para mostrar las compras en la tabla
function mostrarCompras() {
  var comprasBody = document.getElementById("compras-body");
  comprasBody.innerHTML = ""; // Limpiar el cuerpo de la tabla antes de mostrar las compras

  for (var i = 0; i < compras.length; i++) {
    var compra = compras[i];
    var fila = document.createElement("tr");

    // Columnas de la tabla
    var columnaTitulo = document.createElement("td");
    columnaTitulo.textContent = compra.titulo;
    fila.appendChild(columnaTitulo);

    var columnaPrecio = document.createElement("td");
    columnaPrecio.textContent = compra.precio;
    fila.appendChild(columnaPrecio);

    var columnaAcciones = document.createElement("td");

    // Botón de eliminar
    var botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("btn", "btn-sm", "btn-danger", "btn-eliminar");
    botonEliminar.dataset.index = i;
    columnaAcciones.appendChild(botonEliminar);

    // Botón de editar
    var botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";
    botonEditar.classList.add("btn", "btn-sm", "btn-primary", "btn-editar");
    botonEditar.dataset.index = i;
    columnaAcciones.appendChild(botonEditar);

    fila.appendChild(columnaAcciones);
    comprasBody.appendChild(fila);
  }

  // Agregar event listener para los botones de eliminar y editar
  var botonesEliminar = document.getElementsByClassName("btn-eliminar");
  for (var j = 0; j < botonesEliminar.length; j++) {
    botonesEliminar[j].addEventListener("click", eliminarCompra);
  }

  var botonesEditar = document.getElementsByClassName("btn-editar");
  for (var k = 0; k < botonesEditar.length; k++) {
    botonesEditar[k].addEventListener("click", editarCompra);
  }
}

// Obtener los datos de las compras desde el almacenamiento local
var productos = JSON.parse(localStorage.getItem("productos")) || [];

// Verificar si existen productos guardados
if (productos.length > 0) {
  var comprasContainer = document.getElementById("compras-container");

  // Recorrer los productos y mostrarlos en la página
  productos.forEach(function (producto) {
    var item = document.createElement("div");
    item.innerHTML = `
      <img src="${producto.imagenSrc}" width="80px" alt="">
      <span>${producto.titulo}</span>
      <span>${producto.precio}</span>
    `;
    comprasContainer.appendChild(item);
  });
} else {
  // Mostrar un mensaje si no se encontraron compras realizadas
  var comprasContainer = document.getElementById("compras-container");
  comprasContainer.innerText = "No se encontraron compras realizadas.";
}

// Función para eliminar una compra
function eliminarCompra(event) {
  var index = parseInt(event.target.dataset.index);
  compras.splice(index, 1);
  localStorage.setItem("compras", JSON.stringify(compras));
  mostrarCompras();
}

// Función para editar una compra
function editarCompra(event) {
  var index = parseInt(event.target.dataset.index);
  var compra = compras[index];

  var nuevoTitulo = prompt("Editar título:", compra.titulo);
  var nuevoPrecio = prompt("Editar precio:", compra.precio);

  // Actualizar los datos de la compra
  compra.titulo = nuevoTitulo;
  compra.precio = nuevoPrecio;

  localStorage.setItem("compras", JSON.stringify(compras));
  mostrarCompras();
}

// Llamar a la función mostrarCompras para cargar la tabla al cargar la página
mostrarCompras();
