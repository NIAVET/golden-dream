// Module complet Visionnaire Magic

function AffiVision() {
  const phrases = [
    "Rèv-la sé on senfoni ka fè nou sonjé ki pli bèl-la ka vini.",
    "Jòdi-la ka pòté limyè asi chimen rèv-zot.",
    "Chak jou sé on chans pou fè lavi vin pli bèl.",
    "An ti limyè ka sové on gran lannuit."
  ];

  const numero = (new Date().getDate() * 7 % 40 + 1); // Numéro fétiche simple
  const phrase = phrases[new Date().getDate() % phrases.length];

  const etoile = document.createElement("div");
  etoile.innerText = "✨";
  etoile.style.position = "fixed";
  etoile.style.top = "20px";
  etoile.style.left = "50%";
  etoile.style.fontSize = "48px";
  etoile.style.animation = "etoile 3s ease-out";
  document.body.appendChild(etoile);

  const audio = new Audio('audio/harpe.mp3');
  audio.play();

  setTimeout(() => {
    alert(phrase + "\n\nNuméro fétiche du jour : " + numero);
    etoile.remove();
  }, 2000);
}
