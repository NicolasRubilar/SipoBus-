document.getElementById("form-login").addEventListener("submit", function (e) {
      const correo = document.getElementById("correo");
      const contrasena = document.getElementById("contrasena");
      let valid = true;

      // Limpiar mensajes anteriores
      document.getElementById("error-correo").textContent = "";
      document.getElementById("error-contrasena").textContent = "";
      correo.classList.remove("input-error");
      contrasena.classList.remove("input-error");

      // Validar correo
      if (!correo.value.includes("@") || !correo.value.includes(".")) {
        document.getElementById("error-correo").textContent = "Ingrese un correo válido.";
        correo.classList.add("input-error");
        valid = false;
      }

      // Validar contraseña
      if (contrasena.value.trim().length < 6) {
        document.getElementById("error-contrasena").textContent = "La contraseña debe tener al menos 6 caracteres.";
        contrasena.classList.add("input-error");
        valid = false;
      }

      if (!valid) e.preventDefault();
    });