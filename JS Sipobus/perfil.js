document.addEventListener("DOMContentLoaded", () => {
  // Proteger acceso: si no hay sesión, redirigir
  const userLogueadoJSON = localStorage.getItem("userLogueado");
  if (!userLogueadoJSON) {
    alert("Debes iniciar sesión para ver tu perfil.");
    window.location.href = "crear_usuario.html";
    return;
  }
  const user = JSON.parse(userLogueadoJSON);

  // Mostrar datos en perfil
  document.getElementById("nombre-usuario").textContent = user.nombre || "Nombre no disponible";
  if(document.getElementById("nombre-usuario-span")) {
    document.getElementById("nombre-usuario-span").textContent = user.nombre || "Nombre no disponible";
  }
  if(document.getElementById("apellido-usuario")) {
    document.getElementById("apellido-usuario").textContent = user.apellido || "Apellido no disponible";
  }
  document.getElementById("correo-usuario").textContent = user.correo || "Correo no disponible";
  document.getElementById("telefono-usuario").textContent = user.telefono || "Teléfono no disponible";
  document.getElementById("direccion-usuario").textContent = user.direccion || "Dirección no disponible";
  document.getElementById("fecha-usuario").textContent = user.fechaNacimiento || "Fecha no disponible";

  // Cupones y viajes
  const listaCupones = document.getElementById("lista-cupones");
  if (listaCupones) {
    if (user.cupones && user.cupones.length) {
      listaCupones.innerHTML = user.cupones.map(c => `
        <li style="display:flex;align-items:center;gap:0.5rem;">
          <span style="font-weight:bold;">${c}</span>
          <button onclick="navigator.clipboard.writeText('${c}');this.textContent='¡Copiado!';setTimeout(()=>this.textContent='Copiar',1200);" style="padding:0.2rem 0.7rem;border-radius:6px;background:#1e1e2f;color:#fff;border:none;cursor:pointer;font-size:0.95rem;">Copiar</button>
        </li>
      `).join("");
    } else {
      listaCupones.innerHTML = "<li>No tienes cupones activos.</li>";
    }
  }

  const listaViajes = document.getElementById("lista-viajes");
  listaViajes.innerHTML = (user.viajes && user.viajes.length)
    ? user.viajes.map(v => `<li>${v}</li>`).join("")
    : "<li>No tienes viajes programados.</li>";

  // Modal editar perfil
  const modal = document.getElementById("modalEditarPerfil");
  const editarBtn = document.getElementById("editarBtn");
  const cerrarModalBtn = document.getElementById("cerrarModalEditar");
  const formEditar = document.getElementById("formEditarPerfil");

  editarBtn.onclick = () => {
    document.getElementById("edit-nombre").value = user.nombre || "";
    document.getElementById("edit-apellido").value = user.apellido || "";
    document.getElementById("edit-correo").value = user.correo || "";
    document.getElementById("edit-telefono").value = user.telefono || "";
    document.getElementById("edit-direccion").value = user.direccion || "";
    document.getElementById("edit-fecha").value = user.fechaNacimiento || "";
    modal.style.display = "flex";
  };
  cerrarModalBtn.onclick = () => {
    modal.style.display = "none";
  };
  formEditar.onsubmit = function(e) {
    e.preventDefault();
    // Validar y guardar cambios
    user.nombre = document.getElementById("edit-nombre").value.trim();
    user.apellido = document.getElementById("edit-apellido").value.trim();
    user.correo = document.getElementById("edit-correo").value.trim();
    user.telefono = document.getElementById("edit-telefono").value.trim();
    user.direccion = document.getElementById("edit-direccion").value.trim();
    user.fechaNacimiento = document.getElementById("edit-fecha").value;
    // Actualizar localStorage
    localStorage.setItem("userLogueado", JSON.stringify(user));
    localStorage.setItem("userProfile", JSON.stringify(user));
    // Actualizar en pantalla
    document.getElementById("nombre-usuario").textContent = user.nombre;
    if(document.getElementById("nombre-usuario-span")) {
      document.getElementById("nombre-usuario-span").textContent = user.nombre;
    }
    if(document.getElementById("apellido-usuario")) {
      document.getElementById("apellido-usuario").textContent = user.apellido;
    }
    document.getElementById("correo-usuario").textContent = user.correo;
    document.getElementById("telefono-usuario").textContent = user.telefono;
    document.getElementById("direccion-usuario").textContent = user.direccion;
    document.getElementById("fecha-usuario").textContent = user.fechaNacimiento;
    modal.style.display = "none";
    showToast("Perfil actualizado correctamente.", "success");
  };

  // Cerrar sesión
  document.getElementById("cerrarSesion")?.addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.removeItem("userLogueado");
    showToast("Sesión cerrada. ¡Hasta pronto!", "success");
    setTimeout(() => {
      window.location.href = "inicio.html";
    }, 1200);
  });
});

// Utilidad para mostrar toasts modernos
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}