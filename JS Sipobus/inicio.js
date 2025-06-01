// modo-oscuro.js
document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("toggle-modo");

  const iconoSol = "☀️";
  const iconoLuna = "🌙";

  // Revisar estado guardado en localStorage
  const modoOscuroActivo = localStorage.getItem("modoOscuro") === "true";

  if (modoOscuroActivo) {
    document.body.classList.add("dark-mode");
    boton.textContent = iconoSol;
  } else {
    boton.textContent = iconoLuna;
  }

  boton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const modoOscuro = document.body.classList.contains("dark-mode");
    localStorage.setItem("modoOscuro", modoOscuro);
    boton.textContent = modoOscuro ? iconoSol : iconoLuna;
  });
});

