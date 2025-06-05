// modo-oscuro.js
document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("toggle-modo");
  const iconoSol = "☀️";
  const iconoLuna = "🌙";

  // Detectar preferencia del sistema si no hay nada en localStorage
  let modoOscuroActivo = localStorage.getItem("modoOscuro");

  if (modoOscuroActivo === null) {
    modoOscuroActivo = window.matchMedia("(prefers-color-scheme: dark)").matches;
    localStorage.setItem("modoOscuro", modoOscuroActivo);
  } else {
    modoOscuroActivo = modoOscuroActivo === "true";
  }

  // Aplicar modo inicial
  if (modoOscuroActivo) {
    document.body.classList.add("dark-mode");
    boton.textContent = iconoSol;
  } else {
    boton.textContent = iconoLuna;
  }

  // Al hacer clic en el botón
  boton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const modoActual = document.body.classList.contains("dark-mode");
    localStorage.setItem("modoOscuro", modoActual);
    boton.textContent = modoActual ? iconoSol : iconoLuna;
  });
});
