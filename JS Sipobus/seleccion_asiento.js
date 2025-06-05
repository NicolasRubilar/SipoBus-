document.addEventListener('DOMContentLoaded', () => {
  // Datos de asientos
  const asientosData = [];

  // Discapacitados: 1A-1D, 2A-2D
  const filasDiscapacitados = [1, 2];
  const letras = ['A', 'B', 'C', 'D'];
  filasDiscapacitados.forEach(fila => {
    letras.forEach(letra => {
      asientosData.push({ tipo: 'discapacitado', numero: `${fila}${letra}` });
    });
  });

  // Normales: 3-5
  const filasNormales = [3, 4, 5];
  filasNormales.forEach(fila => {
    letras.forEach(letra => {
      asientosData.push({ tipo: 'normal', numero: `${fila}${letra}` });
    });
  });

  // Sillón cama: 6-8
  const filasSillon = [6, 7, 8];
  filasSillon.forEach(fila => {
    letras.forEach(letra => {
      asientosData.push({ tipo: 'sillon-cama', numero: `${fila}${letra}` });
    });
  });

  const filas = 8;
  const asientosPorFila = 4;

  const busContainer = document.getElementById('bus-container');
  busContainer.innerHTML = ''; // limpiar

  function crearAsiento(tipo, numero) {
    const asiento = document.createElement('div');
    asiento.classList.add('asiento', tipo);
    asiento.textContent = numero;
    asiento.dataset.asiento = numero;

    asiento.addEventListener('click', () => {
      asiento.classList.toggle('seleccionado');
    });

    return asiento;
  }

  for (let fila = 0; fila < filas; fila++) {
    const filaDiv = document.createElement('div');
    filaDiv.classList.add('fila-bus');

    // Ventana izquierda
    const ventanaIzq = document.createElement('div');
    ventanaIzq.classList.add('ventana');
    filaDiv.appendChild(ventanaIzq);

    // Asiento 1 y 2
    const idxAsiento1 = fila * asientosPorFila;
    filaDiv.appendChild(crearAsiento(asientosData[idxAsiento1].tipo, asientosData[idxAsiento1].numero));
    filaDiv.appendChild(crearAsiento(asientosData[idxAsiento1 + 1].tipo, asientosData[idxAsiento1 + 1].numero));

    // Pasillo
    const pasillo = document.createElement('div');
    pasillo.classList.add('pasillo');
    filaDiv.appendChild(pasillo);

    // Asiento 3 y 4
    filaDiv.appendChild(crearAsiento(asientosData[idxAsiento1 + 2].tipo, asientosData[idxAsiento1 + 2].numero));
    filaDiv.appendChild(crearAsiento(asientosData[idxAsiento1 + 3].tipo, asientosData[idxAsiento1 + 3].numero));

    // Ventana derecha
    const ventanaDer = document.createElement('div');
    ventanaDer.classList.add('ventana');
    filaDiv.appendChild(ventanaDer);

    busContainer.appendChild(filaDiv);
  }

  // Evento para el botón comprar
  document.querySelector(".comprar-btn").addEventListener("click", function () {
    const asientosSeleccionados = Array.from(document.querySelectorAll(".asiento.seleccionado"))
      .map(a => a.dataset.asiento);

    const incluyeComida = document.querySelector("#comidaCheckbox")?.checked || false;

    if (asientosSeleccionados.length === 0) {
      alert("Por favor selecciona al menos un asiento.");
      return;
    }

    // Guardamos con claves claras
    localStorage.setItem("asientos", JSON.stringify(asientosSeleccionados));
    localStorage.setItem("comida", incluyeComida);

    window.location.href = "resumen_compra.html";
  });
});
