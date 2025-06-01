  // Precio por tipo de asiento
  const precios = {
    normal: 2000,
    'sillon-cama': 3000,
    discapacitado: 2000
  };

  // Obtener datos del localStorage
  const asientosSeleccionados = JSON.parse(localStorage.getItem('asientosSeleccionados')) || [];
  const agregarComida = JSON.parse(localStorage.getItem('agregarComida')) || false;

  const asientosListaDiv = document.getElementById('asientosSeleccionados');
  const totalDiv = document.getElementById('totalCompra');

  // Mostrar asientos y calcular total
  function mostrarAsientos() {
    asientosListaDiv.innerHTML = '';

    if (asientosSeleccionados.length === 0) {
      asientosListaDiv.innerHTML = '<p>No hay asientos seleccionados.</p>';
      totalDiv.textContent = 'Total: $0 CLP';
      return;
    }

    let total = 0;
    asientosSeleccionados.forEach(({ id, tipo }) => {
      const precioAsiento = precios[tipo] || 0;
      total += precioAsiento;

      const div = document.createElement('div');
      div.className = 'asiento-item';
      div.textContent = `Asiento ${id} (${tipo.replace('-', ' ')})`;
      const precioSpan = document.createElement('span');
      precioSpan.textContent = `$${precioAsiento.toLocaleString('es-CL')} CLP`;
      div.appendChild(precioSpan);
      asientosListaDiv.appendChild(div);
    });

    // Agregar comida al total si está seleccionado
    if (agregarComida) {
      const comidaCosto = 1000 * asientosSeleccionados.length;
      total += comidaCosto;

      const comidaDiv = document.createElement('div');
      comidaDiv.className = 'asiento-item';
      comidaDiv.textContent = 'Comida SipoBus';
      const precioComidaSpan = document.createElement('span');
      precioComidaSpan.textContent = `$${comidaCosto.toLocaleString('es-CL')} CLP`;
      comidaDiv.appendChild(precioComidaSpan);
      asientosListaDiv.appendChild(comidaDiv);
    }

    totalDiv.textContent = `Total: $${total.toLocaleString('es-CL')} CLP`;
  }

  mostrarAsientos();

  // Manejar envío del formulario
  document.getElementById('formCompra').addEventListener('submit', (e) => {
    e.preventDefault();

    const origen = e.target.origen.value;
    const destino = e.target.destino.value;
    const fecha = e.target.fecha.value;
    const hora = e.target.hora.value;

    if (origen === destino) {
      alert('El origen y el destino no pueden ser iguales.');
      return;
    }

    if (asientosSeleccionados.length === 0) {
      alert('No hay asientos seleccionados.');
      return;
    }

    let total = 0;
    asientosSeleccionados.forEach(({ tipo }) => {
      total += precios[tipo] || 0;
    });
    if (agregarComida) {
      total += 1000 * asientosSeleccionados.length;
    }

    const resumenCompra = {
      origen,
      destino,
      fecha,
      hora,
      total: `$${total.toLocaleString('es-CL')} CLP`
    };

    // Guardar resumen para la página final
    localStorage.setItem('resumenCompra', JSON.stringify(resumenCompra));

    // Aquí limpiamos los datos para evitar confusión, si quieres puedes no limpiar aún
    localStorage.removeItem('asientosSeleccionados');
    localStorage.removeItem('agregarComida');

    // Redirigir a la página final donde se muestra resumen y botón para pagar
    window.location.href = 'total_compra.html';
  });