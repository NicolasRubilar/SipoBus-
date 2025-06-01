 const { jsPDF } = window.jspdf;

    const resumenCompra = JSON.parse(localStorage.getItem('resumenCompra')) || {};
    const asientos = JSON.parse(localStorage.getItem('asientosSeleccionados')) || [];
    const agregarComida = localStorage.getItem('agregarComida') === 'true';

    function generarPDF() {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text("Ticket de Compra - SipoBus", 14, 20);

      doc.setFontSize(12);
      let y = 30;

      doc.text(`Origen: ${resumenCompra.origen || 'N/A'}`, 14, y);
      y += 8;
      doc.text(`Destino: ${resumenCompra.destino || 'N/A'}`, 14, y);
      y += 8;
      doc.text(`Fecha: ${resumenCompra.fecha || 'N/A'}`, 14, y);
      y += 8;
      doc.text(`Hora: ${resumenCompra.hora || 'N/A'}`, 14, y);
      y += 12;

      doc.setFontSize(14);
      doc.text("Asientos Seleccionados:", 14, y);
      y += 8;

      doc.setFontSize(12);
      if(asientos.length > 0){
        asientos.forEach((a, i) => {
          doc.text(`${i + 1}. ${a.id} (${a.tipo}) - $${a.precio || '0'}`, 16, y);
          y += 7;
        });
      } else {
        doc.text("Ninguno", 16, y);
        y += 7;
      }

      y += 5;
      doc.text(`Comida: ${agregarComida ? 'Sí (+$1000 por persona)' : 'No'}`, 14, y);
      y += 12;

      doc.setFontSize(14);
      doc.text(`Total pagado: $${resumenCompra.total || '0'} CLP`, 14, y);

      doc.save('ticket_SipoBus.pdf');
    }

    document.getElementById('btnDescargarPDF').addEventListener('click', () => {
      generarPDF();
    });

    document.getElementById('btnOtraCompra').addEventListener('click', () => {
      // Cambia esto por la página real donde seleccionas asientos
      window.location.href = 'seleccion_asiento_y_comida.html';
    });

    document.getElementById('btnVolverInicio').addEventListener('click', () => {
      window.location.href = 'inicio.html';
    });