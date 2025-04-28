document.addEventListener('DOMContentLoaded', () => {
    const nomInput = document.getElementById('name-category');
    const colorInput = document.getElementById('category-color');
    const crearBoton = document.getElementById('create-category');
    const cargarBoton = document.getElementById('load-categories');
    const categoriasContainer = document.getElementById('categories-container');

    function cargarListaCategorias() {
        const categorias = cargarCategorias();
        categoriasContainer.innerHTML = '';
        categorias.forEach(categoria => {
            const div = document.createElement('div');
            div.className = 'flex justify-between items-center p-2 border-b';
            div.innerHTML = `
                <p class="">
                    <span style="background: ${categoria.color}; color: #333; font-weight: bolder; padding: 4px 8px; border-radius: 6px;">
                        ${categoria.nom}
                    </span>
                </p>
                <button class="delete-category bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded" data-id="${categoria.id}">
                    Eliminar
                </button>
            `;
            categoriasContainer.appendChild(div);
        });

        document.querySelectorAll('.delete-category').forEach(boton => {
            boton.addEventListener('click', () => {
                eliminarCategoria(boton.dataset.id);
                cargarListaCategorias();
            });
        });
    }

    crearBoton.addEventListener('click', () => {
        const nom = nomInput.value.trim();
        const color = colorInput.value;
        if (nom === '') {
            alert('El nombre de la categoría es obligatorio');
            return;
        }

        const categorias = cargarCategorias();
        const nuevaCategoria = new Categoria(generarIdCategoria(categorias), nom, color);
        categorias.push(nuevaCategoria);
        guardarCategorias(categorias);
        cargarListaCategorias();
        nomInput.value = '';
        colorInput.value = '#000000';
    });

    cargarBoton.addEventListener('click', () => {
        cargarListaCategorias();
    });

    cargarListaCategorias();
});