    // Datos de los asientos
    const asientosData = [
      { id: 'A1', tipo: 'normal' },
      { id: 'A2', tipo: 'normal' },
      { id: 'A3', tipo: 'normal' },
      { id: 'A4', tipo: 'discapacitado' },
      { id: 'A5', tipo: 'normal' },
      { id: 'A6', tipo: 'normal' },
      { id: 'A7', tipo: 'sillon-cama' },
      { id: 'A8', tipo: 'sillon-cama' },

      { id: 'B1', tipo: 'normal' },
      { id: 'B2', tipo: 'normal' },
      { id: 'B3', tipo: 'normal' },
      { id: 'B4', tipo: 'discapacitado' },
      { id: 'B5', tipo: 'normal' },
      { id: 'B6', tipo: 'normal' },
      { id: 'B7', tipo: 'sillon-cama' },
      { id: 'B8', tipo: 'sillon-cama' },

      { id: 'C1', tipo: 'normal' },
      { id: 'C2', tipo: 'normal' },
      { id: 'C3', tipo: 'normal' },
      { id: 'C4', tipo: 'discapacitado' },
      { id: 'C5', tipo: 'normal' },
      { id: 'C6', tipo: 'normal' },
      { id: 'C7', tipo: 'sillon-cama' },
      { id: 'C8', tipo: 'sillon-cama' },
    ];

    const asientosContainer = document.getElementById('asientos');

    // Crear asientos en la página
    asientosData.forEach(asiento => {
      const div = document.createElement('div');
      div.classList.add('asiento', asiento.tipo);
      div.textContent = asiento.id;
      div.dataset.tipo = asiento.tipo;
      div.dataset.id = asiento.id;
      asientosContainer.appendChild(div);
    });

    // Para controlar selección
    const seleccionados = new Set();

    asientosContainer.addEventListener('click', e => {
      if (e.target.classList.contains('asiento')) {
        const asiento = e.target;
        const id = asiento.dataset.id;
        if (seleccionados.has(id)) {
          seleccionados.delete(id);
          asiento.classList.remove('seleccionado');
        } else {
          seleccionados.add(id);
          asiento.classList.add('seleccionado');
        }
      }
    });

    // Aquí recuperamos datos previos (origen, destino, fecha, hora, total)
    // Estos deberían estar guardados en localStorage en la página anterior
    const resumenGuardado = JSON.parse(localStorage.getItem('datosViaje')) || {};
    const { origen, destino, fecha, hora, total: totalCalculado } = resumenGuardado;

    document.getElementById('btnComprar').addEventListener('click', () => {
      if (seleccionados.size === 0) {
        alert('Por favor seleccione al menos un asiento.');
        return;
      }

      const asientosSeleccionados = [];
      seleccionados.forEach(id => {
        const asiento = asientosData.find(a => a.id === id);
        asientosSeleccionados.push({ id: asiento.id, tipo: asiento.tipo });
      });

      const agregarComida = document.getElementById('agregar-comida').checked;

      // Guardamos en localStorage
      localStorage.setItem('asientosSeleccionados', JSON.stringify(asientosSeleccionados));
      localStorage.setItem('agregarComida', JSON.stringify(agregarComida));

      // Guardamos resumen con los datos del viaje y total
      localStorage.setItem('resumenCompra', JSON.stringify({
        origen,
        destino,
        fecha,
        hora,
        total: totalCalculado
      }));

      // Redirigir a confirmación de compra
      window.location.href = 'confirmar_compra.html';
    });