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
  const hojaTitle = document.createElement('h2');
  hojaTitle.textContent = hoja.nombre;
  hojaContainer.appendChild(hojaTitle);

  for (let i = 1; i <= 6; i++) {
    const datoP = document.createElement('p');
    datoP.textContent = `Dato${i}: ${hoja[`dato${i}`]}`;
    hojaContainer.appendChild(datoP);
  }
}

function addHoja() {
  const nombre = document.getElementById('nombre').value;
  const dato1 = document.getElementById('dato1').value;
  const dato2 = document.getElementById('dato2').value;
  const dato3 = document.getElementById('dato3').value;
  const dato4 = document.getElementById('dato4').value;
  const dato5 = document.getElementById('dato5').value;
  const dato6 = document.getElementById('dato6').value;

  const nuevaHoja = {
    nombre: nombre,
    dato1: dato1,
    dato2: dato2,
    dato3: dato3,
    dato4: dato4,
    dato5: dato5,
    dato6: dato6
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


