import { cargarChart } from './grafics.js';

document.addEventListener('DOMContentLoaded', () => {
    //Elementos HTML
    const archivoInput = document.getElementById('task-input');
    const tareasPendientes = document.getElementById('pending-tasks');
    const tareasCompletas = document.getElementById('completed-tasks');
    const botonSubirArchivo = document.getElementById('upload-task');

    //Función para generar un elemento 'li' con su 'innerHTML' correspondiente
    /**
     * 
     * @param {*} tarea 
     * @returns 
     */
    function crearTareaHTML(tarea) {
        const prioridadColor = tarea.prioritat === 'Alta' ? 'bg-red-200' :
            tarea.prioritat === 'Media' ? 'bg-yellow-200' : 'bg-green-200';

        const li = document.createElement('li');
        li.className = `flex justify-between items-center p-2 border-b ${prioridadColor} rounded-lg`;
        li.innerHTML = `
            <div class="flex-column hover">
                <span><b>Tarea: </b>${tarea.titol}</span>
                <p><b>Fecha: </b>${tarea.data}</p>
                <p><b>Categoría: </b><span style="background-color: ${tarea.categoria.color}; padding: 2px 6px; border-radius: 4px; color: #333; font-weight: bold;">${tarea.categoria.nom}</span></p>
                <p><b>Prioridad: </b>${tarea.prioritat}</p>
                <p><b>Descripción: </b>${tarea.descripcio}</p>
            </div>
            <div class="flex space-x-2">
                <button class="mark-task transition-all duration-300 hover:bg-blue-400 hover:text-white px-2 py-1 rounded" data-id="${tarea.id}" data-title="${tarea.titol}">
                    ${tarea.realitzada ? '✓' : '▢'}
                </button>
                <button class="delete-task transition-all duration-300 hover:bg-red-600 text-white px-2 py-1 rounded" data-id="${tarea.id}" data-title="${tarea.titol}">
                    🗑️
                </button>
            </div>
        `;
        return li;
    }

    //Función que carga la lista de tareas con su lógica y que es visible gracias a un 'innerHTML' para que sea visual
    /**
     * 
     */
    function cargarListaTareas() {
        const tareas = cargarTareas();
        const tareasJSON = cargarTareasJSON();

        if (!archivoInput || !tareasPendientes || !tareasCompletas || !botonSubirArchivo) {
            console.error('Campos incompletos');
            return;
        }

        tareasPendientes.innerHTML = '';
        tareasCompletas.innerHTML = '';

        tareas.forEach(tarea => {
            const li = crearTareaHTML(tarea);
            if (tarea.realitzada) {
                tareasCompletas.appendChild(li);
            } else {
                tareasPendientes.appendChild(li);
            }
        });

        tareasJSON.forEach(tarea => {
            const li = crearTareaHTML(tarea);
            if (tarea.realitzada) {
                tareasCompletas.appendChild(li);
            } else {
                tareasPendientes.appendChild(li);
            }
        });

        //Evento para cuando pulsamos el botón de 'mark-task' para cambiar el estado de una tarea
        document.querySelectorAll('.mark-task').forEach(boton => {
            boton.addEventListener('click', () => {
                const id = boton.dataset.id;
                const title = boton.dataset.title;
                const tareas = cargarTareas();
                const tareasJSON = cargarTareasJSON();
                tareas.forEach(t => {
                    if (t.id === id && t.titol === title) {
                        t.realitzada = !t.realitzada;
                    }
                });

                tareasJSON.forEach(t => {
                    if (t.id === id && t.titol === title) {
                        t.realitzada = !t.realitzada;
                    }
                });

                guardarTareas(tareas);
                guardarTareasJSON(tareasJSON);
                cargarListaTareas();
                cargarChart();
            });
        });

        //Evento para cuando pulsamos el botón de 'delete-task' para cambiar eliminar una tarea
        document.querySelectorAll('.delete-task').forEach(boton => {
            boton.addEventListener('click', () => {
                const id = boton.dataset.id;
                const title = boton.dataset.title;
                const tareas = cargarTareas();
                const tareasJSON = cargarTareasJSON();
                let existeTarea = false;
                let existeTareaJSON = false;

                tareas.forEach(tarea => {
                    if (tarea.id === id && tarea.titol === title) {
                        existeTarea = true;
                    }
                });

                tareasJSON.forEach(tarea => {
                    if (tarea.id === id && tarea.titol === title) {
                        existeTareaJSON = true;
                    }
                });

                if (existeTarea) eliminarTarea(id);
                if (existeTareaJSON) eliminarTareaJSON(id);

                cargarListaTareas();
                cargarChart();
            });
        });
    }

    //Evento para cuando escribimos el nombre de un archivo JSON y lo subimos para que sea vean como unas tareas creadas por el usuario
    botonSubirArchivo.addEventListener('click', () => {
        const nombreArchivo = archivoInput.value.trim();
        if (!nombreArchivo) {
            alert('Introduce el nombre del fichero JSON.');
            return;
        }

        fetch(`json/${nombreArchivo}.json`)
            .then(response => response.json())
            .then(data => {
                const tareasJSON = cargarTareasJSON();
                const categorias = cargarCategorias();
                for (let i = 0; i < data.length; i++) {
                    let nuevaTarea = data[i];
                    let existe = false;
                    for (let j = 0; j < tareasJSON.length; j++) {
                        if (tareasJSON[j].id === nuevaTarea.id) {
                            existe = true;
                            break;
                        }
                    }
                    if (!existe) {
                        tareasJSON.push(new Tarea(
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
                    guardarTareasJSON(tareasJSON);
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

    //Llamamos a las funciones
    cargarListaTareas();
    cargarChart();

});


