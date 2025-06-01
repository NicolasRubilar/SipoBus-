    // Validación simple JS para confirmar contraseña y mostrar errores solo al enviar
    const form = document.getElementById("formRegistro");
    const clave = document.getElementById("clave");
    const confirmarClave = document.getElementById("confirmar-clave");

    form.addEventListener("submit", function (e) {
      if (clave.value !== confirmarClave.value) {
        e.preventDefault();
        alert("Las contraseñas no coinciden.");
        confirmarClave.focus();
      }
    });