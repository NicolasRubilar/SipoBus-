const { jsPDF } = window.jspdf;

function generarPDF() {
  const doc = new jsPDF('landscape', 'mm', 'A5'); // Horizontal, tamaño boleto
  const margin = 10;
  let y = margin + 10;

  // Bordes tipo ticket
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, margin, 190, 90, 5, 5); // contenedor principal

  // Logo o título
  doc.setFontSize(18);
  doc.setTextColor(0, 102, 204);
  doc.text(" SipoBus - Boleto de Viaje", margin + 5, y);

  y += 10;
  doc.setFontSize(12);
  doc.setTextColor(0);

  const resumen = JSON.parse(localStorage.getItem('resumenCompra')) || {};
  const asientos = resumen.asientos || [];
  const comida = resumen.comida;
  const total = resumen.total || '0';

  // Sección datos principales
  doc.text(`Origen: ${resumen.origen || 'N/A'}`, margin + 5, y);
  doc.text(`Destino: ${resumen.destino || 'N/A'}`, 100, y);
  y += 8;
  doc.text(`Fecha: ${resumen.fecha || 'N/A'}`, margin + 5, y);
  doc.text(`Hora: ${resumen.hora || 'N/A'}`, 100, y);

  // Línea divisoria
  y += 6;
  doc.setDrawColor(200);
  doc.line(margin + 2, y, 195, y);
  y += 8;

  // Sección de asientos
  doc.setFontSize(13);
  doc.text('Asientos:', margin + 5, y);
  y += 6;

  doc.setFontSize(11);
  if (asientos.length > 0) {
    asientos.forEach((a, index) => {
      const asiento = `• ${a.id} (${a.tipo.replace('-', ' ')})`;
      doc.text(asiento, margin + 10, y);
      y += 6;
    });
  } else {
    doc.text("No hay asientos seleccionados", margin + 10, y);
    y += 6;
  }

  // Comida
  y += 4;
  doc.setFontSize(12);
  doc.text(`Comida incluida: ${comida ? 'Sí' : 'No'}`, margin + 5, y);

  // Total
  doc.setFontSize(14);
  y += 10;
  doc.setTextColor(34, 139, 34);
  doc.text(`TOTAL PAGADO: ${total}`, margin + 5, y);

  // Pie
  y += 10;
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text("Gracias por preferir SipoBus - www.sipobus.cl", margin + 5, y);

  doc.save("boleto_sipobus.pdf");
}

document.addEventListener("DOMContentLoaded", function () {
  const btnPDF = document.getElementById("btnDescargarPDF");
  const btnOtra = document.getElementById("btnOtraCompra");
  const btnInicio = document.getElementById("btnVolverInicio");

  btnPDF.onclick = function () {
    const resumen = JSON.parse(localStorage.getItem("resumenCompra"));
    if (!resumen) {
      alert("No hay datos de compra para el ticket.");
      return;
    }
    const doc = new window.jspdf.jsPDF();
    doc.setFontSize(18);
    doc.text("Ticket SipoBus", 20, 20);
    doc.setFontSize(12);
    doc.text(`Origen: ${resumen.origen}`, 20, 35);
    doc.text(`Destino: ${resumen.destino}`, 20, 45);
    doc.text(`Fecha: ${resumen.fecha}`, 20, 55);
    doc.text(`Hora: ${resumen.hora}`, 20, 65);
    doc.text(`Asientos: ${resumen.asientos.map(a => a.id).join(", ")}`, 20, 75);
    doc.text(`Comida: ${resumen.comida ? "Sí" : "No"}`, 20, 85);
    doc.text(`Total: ${resumen.total || ""}`, 20, 95);
    doc.save("ticket_sipobus.pdf");
  };

  btnOtra.onclick = function () {
    window.location.href = "seleccion_asiento_y_comida.html";
  };
  btnInicio.onclick = function () {
    window.location.href = "inicio.html";
  };
});