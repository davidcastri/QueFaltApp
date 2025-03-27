let editRowIndex = -1; // Variable para almacenar el índice de la fila que se está editando
const baseUrl = "http://localhost:3000/";


const obtenerProducto = () => {
    if (document.title == 'Inventario') {
    const url = baseUrl + "inv";
    fetch(url)
        .then(response => response.json())
        .then(productos => {
            const table = document.getElementById('productTable').getElementsByTagName('tbody')[0];
            table.innerHTML = "";
            productos.forEach(producto => {
                // Agregar nueva fila
                const newRow = table.insertRow();
                newRow.innerHTML = `
                    <td>${producto.ID}</td>
                    <td>${producto.NOMBRE}</td>
                    <td>${producto.PRES}</td>
                    <td>${producto.CANTIDAD}</td>

                    <td>
                        <button class="edit-btn">(-)</button>
                    </td>
                `;
            });

        });
}}


const obtenerHome = () => {
    if (document.title == 'Home') {
    const url = baseUrl + "home";
    fetch(url)
        .then(response => response.json())
        .then(productos => {
            const table = document.getElementById('homeTable').getElementsByTagName('tbody')[0];
            table.innerHTML = "";
            productos.forEach(producto => {
                // Agregar nueva fila
                const newRow = table.insertRow();
                newRow.innerHTML = `
                    <td>${new Date(producto.FECHA).toLocaleDateString()}</td>
                    <td>${producto.ALMACEN}</td>
                    <td>${producto.TOTAL}</td>
                `;
            });

        });
}}


const obtenerHist = () => {
    if (document.title == 'Estadistica') {
    const url = baseUrl + "hist";
    fetch(url)
        .then(response => response.json())
        .then(productos => {
            const table = document.getElementById('histTable').getElementsByTagName('tbody')[0];
            table.innerHTML = "";
            productos.forEach(producto => {
                // Agregar nueva fila
                const newRow = table.insertRow();
                newRow.innerHTML = `
                    <td>${new Date(producto.FECHA).toLocaleDateString()}</td>
                    <td>${producto.TOTAL}</td>

                `;
            });

        });
}}


if (document.title == 'Compra') {
document.getElementById('productForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const almacen = document.getElementById('Almacen').value;
    const fecha = document.getElementById('Fecha').value;
    const producto = document.getElementById('Producto').value;
    const presentacion = document.getElementById('Presentacion').value;
    const valor = document.getElementById('Valor').value;
    const cantidad = 1;

    const url = baseUrl + "agregarproducto";
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ almacen, fecha, producto, presentacion, valor, cantidad })
    }).then(response => response.json())
    .then(data => {
        if(data.message){
            alert(data.message);
        }
        obtenerProducto();
    });
       
    document.getElementById('Producto').value = "";
    document.getElementById('Presentacion').value = "";
    document.getElementById('Valor').value = "";
});
}

// Función para manejar el clic en el botón "Editar"
if (document.title == 'Inventario') {
document.getElementById('productTable').addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-btn')) {
        const row = e.target.parentElement.parentElement;
        const id = row.cells[0].innerText;
        const cantidad = 0;
        editRowIndex = row.cells[0].innerText; // Guardar el índice de la fila que se está editando
    
    const url = baseUrl + `actualizarproducto/${editRowIndex}`;
       
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, cantidad})
    }).then(response => response.json())
    .then(data => {
        if(data.message){
            alert(data.message);
        }
        obtenerProducto();
        editRowIndex = -1; // Resetear el índice de edición
    });   

}
});
}

obtenerProducto();
obtenerHome();
obtenerHist();