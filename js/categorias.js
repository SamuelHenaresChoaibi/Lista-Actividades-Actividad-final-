document.addEventListener('DOMContentLoaded', () => {
    //Elementos HTML
    const nomInput = document.getElementById('name-category');
    const colorInput = document.getElementById('category-color');
    const crearBoton = document.getElementById('create-category');
    const cargarBoton = document.getElementById('load-categories');
    const categoriasContainer = document.getElementById('categories-container');

  
    //Función para generar un elemento 'div' con su 'innerHTML' correspondiente
    /**
     * 
     * @param {*} categoria 
     * @returns 
     */
    function crearCategoriaHTML(categoria){
        const div = document.createElement('div');
            div.className = 'flex justify-between items-center p-2 border-b';
            div.innerHTML = `
                <p class="">
                    <span style="background: ${categoria.color}; color: #333; font-weight: bolder; padding: 4px 8px; border-radius: 6px;">
                        ${categoria.nom}
                    </span>
                </p>
                <button class="delete-category bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded" data-nom="${categoria.nom}">
                    Eliminar
                </button>
            `;

            return div;
    }

    //Función que carga la lista de categorias con su lógica y que es visible gracias a un 'innerHTML' para que sea visual
    /**
     * 
     */
    function cargarListaCategorias() {
        const categorias = cargarCategorias();
        categoriasContainer.innerHTML = '';
        categorias.forEach(categoria => {
            const div = crearCategoriaHTML(categoria);
            categoriasContainer.appendChild(div);
        });

        document.querySelectorAll('.delete-category').forEach(boton => {
            boton.addEventListener('click', () => {
                eliminarCategoria(boton.dataset.nom);
                cargarListaCategorias();
            });
        });
    }

    //Evento para cuando pulsamos el botón de 'Crear categoría'
    crearBoton.addEventListener('click', () => {
        const nom = nomInput.value.trim();
        const color = colorInput.value;
        if (nom === '') {
            alert('El nombre de la categoría es obligatorio');
            return;
        }
        const categorias = cargarCategorias();
        function comprobarRepetido(){
            let existe = false;
        categorias.forEach(categoria => {
            if(categoria.nom === nom){
                alert('Esta categoria ya existe. Bórrela y cree otra o póngale otro nombre')
                existe = true;
            }
        });
        if(!existe){
             const nuevaCategoria = new Categoria(nom, color);
        categorias.push(nuevaCategoria);
        guardarCategorias(categorias);
        cargarListaCategorias(); 
        }
      
        }     
        cargarListaCategorias(); 
        comprobarRepetido();
   
        nomInput.value = '';
        colorInput.value = '#000000';
    });

    //Llamar a la función para que muestre la lista en la página
    cargarListaCategorias();
});