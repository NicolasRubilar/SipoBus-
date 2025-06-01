 // Cargar datos desde localStorage
  const resumenDiv = document.getElementById('resumenCompra');
  const asientos = JSON.parse(localStorage.getItem('asientosSeleccionados')) || [];
  const agregarComida = JSON.parse(localStorage.getItem('agregarComida')) || false;
  const precios = { normal: 2000, 'sillon-cama': 3000, discapacitado: 2000 };

  // Datos viaje guardados en resumenCompra para mostrar info de viaje
  const resumenCompra = JSON.parse(localStorage.getItem('resumenCompra')) || {};

  function formatearPrecio(num) {
    return '$' + num.toLocaleString('es-CL') + ' CLP';
  }

  function mostrarResumen() {
    if (!resumenCompra.origen) {
      resumenDiv.innerHTML = '<p>No hay datos de la compra.</p>';
      return;
    }
    let html = '<ul>';
    html += `<li><strong>Origen:</strong> ${resumenCompra.origen}</li>`;
    html += `<li><strong>Destino:</strong> ${resumenCompra.destino}</li>`;
    html += `<li><strong>Fecha:</strong> ${resumenCompra.fecha}</li>`;
    html += `<li><strong>Hora:</strong> ${resumenCompra.hora}</li>`;
    html += '<li><strong>Asientos:</strong><ul>';
    asientos.forEach(({id, tipo}) => {
      html += `<li>Asiento ${id} (${tipo.replace('-', ' ')}) - ${formatearPrecio(precios[tipo])}</li>`;
    });
    html += '</ul></li>';
    html += `<li><strong>Comida:</strong> ${agregarComida ? 'Sí (+ $1000 por persona)' : 'No'}</li>`;
    html += '</ul>';

    // Calcular total
    let total = asientos.reduce((sum, a) => sum + (precios[a.tipo] || 0), 0);
    if (agregarComida) total += asientos.length * 1000;
    html += `<p><strong>Total a pagar:</strong> ${formatearPrecio(total)}</p>`;

    resumenDiv.innerHTML = html;
  }

  mostrarResumen();

  // Validaciones simples de formulario
  const formPago = document.getElementById('formPago');
  const numeroTarjeta = document.getElementById('numeroTarjeta');
  const fechaExpiracion = document.getElementById('fechaExpiracion');
  const cvv = document.getElementById('cvv');
  const errorNumero = document.getElementById('errorNumero');
  const errorFecha = document.getElementById('errorFecha');
  const errorCVV = document.getElementById('errorCVV');
  const procesandoDiv = document.getElementById('procesando');

  function limpiarErrores() {
    [numeroTarjeta, fechaExpiracion, cvv].forEach(input => input.classList.remove('error'));
    [errorNumero, errorFecha, errorCVV].forEach(e => e.textContent = '');
  }

  function validarNumeroTarjeta(value) {
    // Validar que sean 16 dígitos numéricos (con o sin espacios)
    const soloDigitos = value.replace(/\s+/g, '');
    return /^\d{16}$/.test(soloDigitos);
  }

  function validarFecha(value) {
    // Formato MM/AA, mes 01-12 y año >= 23 (por ejemplo)
    if (!/^\d{2}\/\d{2}$/.test(value)) return false;
    const [mes, anio] = value.split('/').map(Number);
    if (mes < 1 || mes > 12) return false;
    // Año base 2000, por ejemplo 23 -> 2023
    const anioActual = new Date().getFullYear() % 100;
    if (anio < anioActual) return false;
    return true;
  }

  function validarCVV(value) {
    return /^\d{3,4}$/.test(value);
  }

  formPago.addEventListener('submit', (e) => {
    e.preventDefault();
    limpiarErrores();
    let valido = true;

    if (!validarNumeroTarjeta(numeroTarjeta.value)) {
      valido = false;
      numeroTarjeta.classList.add('error');
      errorNumero.textContent = 'Número de tarjeta inválido';
    }
    if (!validarFecha(fechaExpiracion.value)) {
      valido = false;
      fechaExpiracion.classList.add('error');
      errorFecha.textContent = 'Fecha inválida (MM/AA)';
    }
    if (!validarCVV(cvv.value)) {
      valido = false;
      cvv.classList.add('error');
      errorCVV.textContent = 'CVV inválido';
    }

    if (!valido) return;

    // Mostrar mensaje procesando
    procesandoDiv.style.display = 'block';

    // Simular proceso de pago 3 segundos
    setTimeout(() => {
      // Ocultar procesando y redirigir a confirmación
      procesandoDiv.style.display = 'none';

      // Guardar total en resumenCompra para mostrar luego en confirmar_compra.html
      let total = asientos.reduce((sum, a) => sum + (precios[a.tipo] || 0), 0);
      if (agregarComida) total += asientos.length * 1000;
      resumenCompra.total = formatearPrecio(total);
      localStorage.setItem('resumenCompra', JSON.stringify(resumenCompra));

      // Redirigir a la página de confirmación
      window.location.href = 'simular_pago.html';
    }, 3000);
  });