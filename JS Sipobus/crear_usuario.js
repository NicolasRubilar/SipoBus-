document.getElementById("form-login").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevenir el envío del formulario para manejarlo con JavaScript

  const correo = document.getElementById("correo");
  const contrasena = document.getElementById("contrasena");
  let valid = true;

  // Limpiar mensajes de error anteriores
  document.getElementById("error-correo").textContent = "";
  document.getElementById("error-contrasena").textContent = "";
  correo.classList.remove("input-error");
  contrasena.classList.remove("input-error");

  // Validar formato de correo electrónico
  if (!correo.value.includes("@") || !correo.value.includes(".")) {
    document.getElementById("error-correo").textContent = "Ingrese un correo válido.";
    correo.classList.add("input-error");
    valid = false;
  }

  // Validar longitud de la contraseña
  if (contrasena.value.trim().length < 6) {
    document.getElementById("error-contrasena").textContent = "La contraseña debe tener al menos 6 caracteres.";
    contrasena.classList.add("input-error");
    valid = false;
  }

  if (!valid) return; // Si la validación falla, detener el proceso aquí

  // Leer datos del usuario desde el almacenamiento local
  const userProfileJSON = localStorage.getItem("userProfile");
  if (!userProfileJSON) {
    alert("No hay usuarios registrados. Por favor, crea una cuenta primero.");
    return;
  }

  const userProfile = JSON.parse(userProfileJSON);

  // Validar credenciales del usuario
  if (correo.value.trim() === userProfile.correo && contrasena.value === userProfile.clave) {
    // Guardar información del usuario logueado en el almacenamiento local
    localStorage.setItem("userLogueado", JSON.stringify(userProfile));
    alert("Sesión iniciada correctamente.");
    window.location.href = "perfil.html"; // Redirigir a la página de perfil
  } else {
    alert("Correo o contraseña incorrectos.");
    correo.classList.add("input-error");
    contrasena.classList.add("input-error");
  }
});
