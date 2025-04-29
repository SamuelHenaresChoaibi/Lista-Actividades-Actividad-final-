export function cargarChart() {
  const sectionChart = document.getElementById("taskChart");
  if (!sectionChart) {
    console.error("No se ha encontrado el elemento Chart con id 'taskChart'");
    return;
  }

  if (sectionChart.chart) {
    sectionChart.chart.destroy();
  }

  const labels = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  function devolverTareasCompletas(mes) {
    const tareas = cargarTareas();
    let numTareasCompletasMes = 0;

    const meses = {
      'Enero': 0,
      'Febrero': 1,
      'Marzo': 2,
      'Abril': 3,
      'Mayo': 4,
      'Junio': 5,
      'Julio': 6,
      'Agosto': 7,
      'Septiembre': 8,
      'Octubre': 9,
      'Noviembre': 10,
      'Diciembre': 11
    };

    if (!(mes in meses)) return 0;

    const mesNumero = meses[mes];

    for (let i = 0; i < tareas.length; i++) {
      if (tareas[i].realitzada) {
        const fecha = new Date(tareas[i].data);
        if (fecha.getMonth() === mesNumero) {
          numTareasCompletasMes++;
        }
      }
    }

    return numTareasCompletasMes;
  }

  const data = {
    labels: labels,
    datasets: [{
      label: 'Tareas Completas',
      data: labels.map(mes => devolverTareasCompletas(mes)), // Simplificado
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 1
    }]
  };

  sectionChart.chart = new Chart(sectionChart, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Número de tareas'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Meses'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        title: {
          display: true,
          text: 'Estadística de Tareas Completas'
        }
      }
    }
  });
}