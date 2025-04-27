document.addEventListener('DOMContentLoaded', () => {
    const archivoInput = document.getElementById('task-input');
    const filtroPendientes = document.getElementById('pending-filter');
    const filtroCompletados = document.getElementById('completed-filter');
    const tareasPendientes = document.getElementById('pending-tasks');
    const tareasCompletas = document.getElementById('completed-tasks');
    const botonSubirArchivo = document.getElementById('upload-task');

    function cargarListaTareas() {
        const tareas = cargarTareas();
        const categorias = cargarCategorias();

        tareasPendientes.innerHTML = '';
        tareasCompletas.innerHTML = '';

        filtroPendientes.innerHTML = '<option value="Todas">Todas</option>';
        filtroCompletados.innerHTML = '<option value="Todas">Todas</option>';

        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.nom;
            option.textContent = categoria.nom;
            filtroCompletados.appendChild(option.cloneNode(true));
            filtroPendientes.appendChild(option);
        });

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
                const tarea = tareas.find(t => t.id === id);
                tareas.forEach(tarea => {
                    if(tarea.id === id){
                        tarea.realitzada = !tarea.realitzada;
                    }
                });
                guardarTareas(tareas);
                cargarListaTareas();
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
            });
        });

        filtroPendientes.addEventListener('change', () => filtrarTareas('pendientes'));
        filtroCompletados.addEventListener('change', () => filtrarTareas('completados'));

        function filtrarTareas(tipo) {
            const filtroValue = tipo === 'pendientes' ? filtroPendientes.value : filtroCompletados.value;
            const tareas = cargarTareas();
            const listaTareas = tipo === 'pendientes' ? tareasPendientes : tareasCompletas;
            listaTareas.innerHTML = '';

            if (filtroValue !== 'Todas') {
                tareas.forEach(tarea => {
                    if (tarea.categoria.nom === filtroValue) {
                        if ((tipo === 'pendientes' && !tarea.realitzada) || (tipo === 'completados' && tarea.realitzada)) {
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
                                    <p><b>Categoría: </b><span style="background-color: ${tarea.categoria.color}; padding: 2px 6px; border-radius: 4px; color: white;">${tarea.categoria.nom}</span></p>
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
                            listaTareas.appendChild(li);
                        }

                    }
                });
            } else {
                cargarListaTareas();
            }
        }
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
                        ));                    }
                }
                guardarTareas(tareas);
                cargarListaTareas();
                archivoInput.value = '';
            })
            .catch(error => {
                alert('Error al cargar el archivo: ' + error.message);
                console.error(error);
            });
    });

    cargarListaTareas();
});