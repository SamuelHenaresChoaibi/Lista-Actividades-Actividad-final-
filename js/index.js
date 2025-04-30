import { cargarChart } from './grafics.js';
document.addEventListener('DOMContentLoaded', () => {
    const archivoInput = document.getElementById('task-input');
    const tareasPendientes = document.getElementById('pending-tasks');
    const tareasCompletas = document.getElementById('completed-tasks');
    const botonSubirArchivo = document.getElementById('upload-task');

    function cargarListaTareas() {
        const tareas = cargarTareas();
        const categorias = cargarCategorias();

        tareasPendientes.innerHTML = '';
        tareasCompletas.innerHTML = '';

        tareas.forEach(tarea => {
            let prioridadColor = '';
            if (tarea.prioritat === 'Alta') {
                prioridadColor = 'bg-red-200';
            } else if (tarea.prioritat === 'Media') {
                prioridadColor = 'bg-yellow-200';
            } else if (tarea.prioritat === 'Baja') {
                prioridadColor = 'bg-green-200';
            }

            const li = document.createElement('li');
            li.className = `flex justify-between items-center p-2 border-b ${prioridadColor} rounded-lg`;
            li.innerHTML = `
            <div class="flex-column">
                    <span>
                    <b>Tarea: </b>${tarea.titulo}
                    </span>
                     <p><b>Fecha: </b>${tarea.data}</p>                 
                    <p><b>Categoría: </b><span style="background-color: ${tarea.categoria.color}; padding: 2px 6px; border-radius: 4px; color: #333; font-weight: bold;">${tarea.categoria.nom}</span></p>
                    <p><b>Prioridad: </b>${tarea.prioritat}</p>
                    <p><b>Descripción: </b>${tarea.descripcio}</p>
                    </div>                
                    <div class="flex space-x-2">
                    <button class="mark-task transition-all duration-300 hover:bg-blue-400 hover:text-white px-2 py-1 rounded" data-id="${tarea.id}">
                        ${tarea.realitzada ? '✓' : '▢'}
                    </button>
                    <button class="delete-task transition-all duration-300 hover:bg-red-600 text-white px-2 py-1 rounded" data-id="${tarea.id}">
                        🗑️
                    </button>
                </div>
            `;
            if (tarea.realitzada) {
                tareasCompletas.appendChild(li);
            } else {
                tareasPendientes.appendChild(li);
            }

        });

        document.querySelectorAll('.mark-task').forEach(boton => {
            boton.addEventListener('click', () => {
                const id = boton.dataset.id;
                const tareas = cargarTareas();
                tareas.forEach(t => {
                    if (t.id === id) {
                        t.realitzada = !t.realitzada;
                    }
                });
                guardarTareas(tareas);
                cargarListaTareas();
                cargarChart();
            });
        });

        document.querySelectorAll('.delete-task').forEach(boton => {
            boton.addEventListener('click', () => {
                const id = boton.dataset.id;
                const tareas = cargarTareas();
                tareas.forEach(tarea => {
                    if (tarea.id === id) {
                        eliminarTarea(id);
                    }
                });
                cargarListaTareas();
                cargarChart();

            });
        });
    }

    botonSubirArchivo.addEventListener('click', () => {
        const nombreArchivo = archivoInput.value.trim();
        if (!nombreArchivo) {
            alert('Introduce el nombre del fichero JSON.');
            return;
        }

        fetch(`json/${nombreArchivo}`)
            .then(response => response.json())
            .then(data => {
                const tareas = cargarTareas();
                const categorias = cargarCategorias();
                for (let i = 0; i < data.length; i++) {
                    let nuevaTarea = data[i];
                    let existe = false;
                    for (let j = 0; j < tareas.length; j++) {
                        if (tareas[j].id === nuevaTarea.id) {
                            existe = true;
                            break;
                        }
                    }
                    if (!existe) {
                        tareas.push(new Tarea(
                            nuevaTarea.id,
                            nuevaTarea.titol,
                            nuevaTarea.descripcio,
                            nuevaTarea.data,
                            nuevaTarea.categoria,
                            nuevaTarea.prioritat,
                            nuevaTarea.realitzada
                        ));
                    

                    const nuevaCategoria = nuevaTarea.categoria;
                    if (nuevaCategoria && nuevaCategoria.nom && nuevaCategoria.color) {
                        let existeCategoria = false;
                        for (let i = 0; i < categorias.length; i++) {
                            if (categorias[i].nom === nuevaCategoria.nom && categorias[i].color === nuevaCategoria.color) {
                                existeCategoria = true;
                                break;
                            }
                        }

                        if (!existeCategoria) {
                            categorias.push(new Categoria(nuevaCategoria.nom, nuevaCategoria.color));
                        }
                    } else {
                        console.warn('Categoría inválida en tarea, omitiendo:', nuevaTarea);
                    }
                }
                    guardarTareas(tareas);
                    guardarCategorias(categorias);
                    cargarListaTareas();
                    archivoInput.value = '';
                    cargarChart();

                }
            })
            .catch(error => {
                alert('Error al cargar el archivo: ' + error.message);
                console.error(error);
            });
    });

    cargarListaTareas();
    cargarChart();
});


