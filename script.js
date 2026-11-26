// ==========================================
// 1. APUNTA A ARCHIVOS DE TEXTO Y AUDIO
// ==========================================
const hotspotData = {
  "1": {
    title: "Part 1: Title Here",
    audio: "audio/part1.mp3",
    textFile: "text/part1.txt"
  },
  "2": {
    title: "Part 2: Title Here",
    audio: "audio/part2.mp3",
    textFile: "text/part2.txt"
  },
  "3": {
    title: "Part 3: Title Here",
    audio: "audio/part3.mp3",
    textFile: "text/part3.txt"
  },
  "4": {
    title: "Part 4: Title Here",
    audio: "audio/part4.mp3",
    textFile: "text/part4.txt"
  },
  "5": {
    title: "Part 5: Title Here",
    audio: "audio/part5.mp3",
    textFile: "text/part5.txt"
  },
  "6": {
    title: "Part 6: Title Here",
    audio: "audio/part6.mp3",
    textFile: "text/part6.txt"
  }
};

// ==========================================
// 2. LOGICA DE INTERACCIÓN CON EL USUARIO
// ==========================================
const hotspots = document.querySelectorAll('.hotspot');
const infoPanel = document.getElementById('info-panel');
const infoCard = document.querySelector('.info-card');
const partBadge = document.getElementById('part-badge');
const infoTitle = document.getElementById('info-title');
const textContainer = document.getElementById('info-text-container');
const infoText = document.getElementById('info-text');
const audioPlayer = document.getElementById('audio-player');
const backToTopBtn = document.getElementById('back-to-top');

hotspots.forEach(spot => {
  spot.addEventListener('click', async () => {
    const id = spot.dataset.id;
    const content = hotspotData[id];

    // Subrayar el hotspot activo
    hotspots.forEach(s => s.classList.remove('active'));
    spot.classList.add('active');

    // Resetear el panel de información y el scroll
    infoCard.classList.remove('visible');
    textContainer.scrollTop = 0;

    // Actualizar el badge, título y texto del panel de información
    partBadge.textContent = `Part ${id} of 6`;
    infoTitle.textContent = content.title;
    infoText.textContent = "Cargando texto...";

    try {
      // Encontrar y cargar el archivo de texto correspondiente
      const response = await fetch(content.textFile);
      const text = await response.text();
      infoText.textContent = text;
    } catch (error) {
      infoText.textContent = "Error al cargar el archivo de texto.";
      console.error(error);
    }

    // Cargar y reproducir el archivo de audio correspondiente
    audioPlayer.src = content.audio;
    audioPlayer.play();

    // Mostrar el panel de información con animación suave
    infoPanel.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      infoCard.classList.add('visible');
    }, 150);
  });
});

// Sincronizar el scroll del texto con la reproducción del audio
audioPlayer.addEventListener('timeupdate', () => {
  if (audioPlayer.duration > 0) {
    const progress = audioPlayer.currentTime / audioPlayer.duration;
    const maxScroll = textContainer.scrollHeight - textContainer.clientHeight;
    textContainer.scrollTop = progress * maxScroll;
  }
});

// Botón de regresar a la parte superior
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});