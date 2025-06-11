// modo-oscuro.js
document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("toggle-modo");
  if (!boton) return;
  const iconoSol = "☀️";
  const iconoLuna = "🌙";
  let modoOscuroActivo = localStorage.getItem("modoOscuro");
  if (modoOscuroActivo === null) {
    modoOscuroActivo = window.matchMedia("(prefers-color-scheme: dark)").matches;
    localStorage.setItem("modoOscuro", modoOscuroActivo);
  } else {
    modoOscuroActivo = modoOscuroActivo === "true";
  }
  if (modoOscuroActivo) {
    document.body.classList.add("dark-mode");
    boton.textContent = iconoSol;
  } else {
    boton.textContent = iconoLuna;
  }
  boton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const modoActual = document.body.classList.contains("dark-mode");
    localStorage.setItem("modoOscuro", modoActual);
    boton.textContent = modoActual ? iconoSol : iconoLuna;
  });
});
