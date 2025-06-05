document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('resumenCompra');
  const resumen = JSON.parse(localStorage.getItem('resumenCompra'));

  if (!resumen) {
    contenedor.innerHTML = "<p>No hay información disponible. Vuelve al paso anterior.</p>";
    document.getElementById("btnPagar").style.display = "none";
  } else {
    contenedor.innerHTML = `
      <div class="resumen-item"><strong>Origen:</strong> ${resumen.origen}</div>
      <div class="resumen-item"><strong>Destino:</strong> ${resumen.destino}</div>
      <div class="resumen-item"><strong>Fecha:</strong> ${resumen.fecha}</div>
      <div class="resumen-item"><strong>Hora:</strong> ${resumen.hora}</div>
      <div class="resumen-item"><strong>Asientos:</strong>
        <ul>
          ${(resumen.asientos || []).map(a => `<li class="asiento">Asiento ${a.id} (${a.tipo.replace('-', ' ')})</li>`).join('')}
        </ul>
      </div>
      <div class="resumen-item"><strong>Comida incluida:</strong> ${resumen.comida ? 'Sí' : 'No'}</div>
      <div class="total">Total: ${resumen.total}</div>
    `;
  }

  document.getElementById('btnPagar').addEventListener('click', () => {
    window.location.href = 'webpay.html';
  });
});
