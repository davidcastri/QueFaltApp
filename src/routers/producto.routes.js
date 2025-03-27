import express from 'express';
import connection from '../config/database.js'; 

const router = express.Router();

router.get('/inv', async (request, response) => {
    const query = "SELECT ID, NOMBRE, PRES, CANTIDAD FROM productos"
    try {
        const [result] = await connection.query(query);
        response.json(result);
    } catch (error) {
        console.error("Error obteniendo productos ", error);
    }
});

router.get('/home', async (request, response) => {
    const query = "SELECT DATE(FECHA) AS FECHA, ALMACEN, CONCAT('$', FORMAT(SUM(VALOR),0)) AS TOTAL FROM productos GROUP BY FECHA, ALMACEN ORDER BY FECHA DESC LIMIT 1"
    try {
        const [result] = await connection.query(query);
        response.json(result);
    } catch (error) {
        console.error("Error obteniendo resumen ", error);
    }
});

router.get('/hist', async (request, response) => {
    const query = "SELECT DATE(FECHA) AS FECHA, CONCAT('$', FORMAT(SUM(VALOR),0)) AS TOTAL FROM productos GROUP BY FECHA ORDER BY FECHA DESC"
    try {
        const [result] = await connection.query(query);
        response.json(result);
    } catch (error) {
        console.error("Error obteniendo historico ", error);
    }
});

router.post('/agregarproducto', async (request, response) => {
    try {
        const datos = request.body;
        const newProducto={
            NOMBRE: datos.producto,
            PRES: datos.presentacion,
            VALOR: datos.valor,
            ALMACEN: datos.almacen,
            FECHA: datos.fecha,
            CANTIDAD: datos.cantidad
        }
        await connection.query("Insert into productos SET ?", [newProducto]);
        response.status(201).json({message: "Producto agregado correctamente"});
    }catch (error) {
        console.error("Error agregando producto ", error);
        response.status(400).json({message: "Error al agregar producto"});
    }
});

router.put('/actualizarproducto/:id', async (request, response) => {
    try {
        const datos = request.body;
        const id = request.params.id;
        const modifiedProd={
            ID: datos.id,
            CANTIDAD: datos.cantidad
        };
        await connection.query("UPDATE productos SET ? WHERE ID = ?", [modifiedProd, id]);
        response.status(200).json({message: "Producto actualizada correctamente"});        
    } catch (error) {
        console.error("Error actualizando producto ", error);
        response.status(400).json({message: "Error actualizando producto"});
    }
});



export default router;
