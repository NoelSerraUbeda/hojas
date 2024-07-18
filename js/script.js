let hojas = [];
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  fetch('pages/hoja.json')
    .then(response => response.json())
    .then(data => {
      hojas = data.hojas;
      showHoja(currentIndex);
    })
    .catch(error => console.error('Error al cargar el JSON:', error));

  document.getElementById('prev-button').addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      showHoja(currentIndex);
    }
  });

  document.getElementById('next-button').addEventListener('click', () => {
    if (currentIndex < hojas.length - 1) {
      currentIndex++;
      showHoja(currentIndex);
    }
  });

  document.getElementById('add-hoja-form').addEventListener('submit', (event) => {
    event.preventDefault();
    addHoja();
  });
});

function showHoja(index) {
  const hojaContainer = document.getElementById('hoja-container');
  hojaContainer.innerHTML = '';

  const hoja = hojas[index];
  const hojaTitle = document.createElement('h1');
  hojaTitle.textContent = hoja.nombre;
  hojaContainer.appendChild(hojaTitle);

  const labels = ["Edad", "Poder", "Lugar Nacimiento", "Plato favorito", "Le gusta", "No le gusta"];
  const keys = ["edad", "poder", "lugarNacimiento", "platoFavorito", "leGusta", "noLeGusta"];

  for (let i = 0; i < labels.length; i++) {
    const datoP = document.createElement('p');

    const datoH2 = document.createElement('h2');
    datoH2.textContent = `${labels[i]}:`;

    datoP.appendChild(datoH2);
    datoP.append(` ${hoja[keys[i]]}`);

    hojaContainer.appendChild(datoP);
  }
}

function addHoja() {
  const nombre = document.getElementById('nombre').value;
  const edad = document.getElementById('edad').value;
  const poder = document.getElementById('poder').value;
  const lugarNacimiento = document.getElementById('lugarNacimiento').value;
  const platoFavorito = document.getElementById('platoFavorito').value;
  const leGusta = document.getElementById('leGusta').value;
  const noLeGusta = document.getElementById('noLeGusta').value;

  const nuevaHoja = {
    nombre: nombre,
    edad: edad,
    poder: poder,
    lugarNacimiento: lugarNacimiento,
    platoFavorito: platoFavorito,
    leGusta: leGusta,
    noLeGusta: noLeGusta
  };

  hojas.push(nuevaHoja);
  currentIndex = hojas.length - 1;
  showHoja(currentIndex);

  document.getElementById('add-hoja-form').reset();
}

function exportHojas() {
  const hojasExport = { hojas: hojas };
  const jsonContent = JSON.stringify(hojasExport, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'hojas.json';
  a.click();
  URL.revokeObjectURL(url);
}
