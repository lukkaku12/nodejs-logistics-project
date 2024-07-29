// import { Router } from "express";
// import { fileURLToPath } from "url";
// import path from "path";
// import client from "../../config/db.js";

// const router = Router();


// // POST - Crear un nuevo shipment
// router.post("/", async (req, res) => {
//   const { item, quantity, warehouseId } = req.body;

//   try {
//     const warehouseQuery = await client.query(`SELECT * FROM warehouse WHERE warehouse_id = ${parseInt(warehouseId)}`);

//     if (warehouseQuery.rows.length === 0) {
//       return res.status(404).json({ message: "warehouse_id no encontrado" });
//     }

//     const response = await client.query(
//       `INSERT INTO shipment(item, quantity, warehouse_id) VALUES ('${item}', ${quantity}, ${warehouseId}) RETURNING *`
//     );

//     if (!response) {
//       return res.status(404).json({ message: "shipment no agregado" });
//     }

//     res.status(201).json({
//       message: "Shipment creado exitosamente",
//       shipment: response.rows[0],
//     });
//   } catch (error) {
//     res.status(500).json({ message: `Error al crear shipment: ${error.message}` });
//   }
// });

// // GET - Obtener todos los shipments
// router.get("/", async (req, res) => {
//   try {
//     const result = await client.query("SELECT * FROM shipment");
//     res.json(result.rows);
//   } catch (error) {
//     res.status(500).json({ message: `Error al obtener shipments: ${error.message}` });
//   }
// });

// // GET - Obtener un shipment por ID
// router.get("/:id", async (req, res) => {
//   try {
//     const response = await client.query(`SELECT * FROM shipment WHERE shipment_id = ${req.params.id}`);

//     if (!response) {
//       return res.status(404).json({ message: "shipment no encontrado" });
//     }
//     res.json(response.rows[0]);
//   } catch (error) {
//     res.status(500).json({ message: `Error al obtener shipment: ${error.message}` });
//   }
// });

// // PUT - Actualizar un shipment por ID
// router.put("/:id", async (req, res) => {
//   const { item, quantity, warehouseId } = req.body;
//   try {
//     const warehouseQuery = await client.query(`SELECT * FROM warehouse WHERE warehouse_id = ${parseInt(warehouseId)}`);

//     if (warehouseQuery.rows.length === 0) {
//       return res.status(404).json({ message: "warehouse_id no encontrado" });
//     }

//     const response = await client.query(
//       `UPDATE shipment SET item = '${item}', quantity = ${quantity}, warehouse_id = ${warehouseId} WHERE shipment_id = ${req.params.id} RETURNING *`
//     );

//     if (!response) return res.status(400).json({ message: "Error al actualizar shipment" });

//     res.json({ message: "Shipment actualizado exitosamente", shipment: response.rows[0] });
//   } catch (error) {
//     res.status(500).json({ message: `Error al actualizar shipment: ${error.message}` });
//   }
// });

// // DELETE - Eliminar un shipment por ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const response = await client.query(`DELETE FROM shipment WHERE shipment_id = ${req.params.id}`);
//     if (!response) return res.status(400).json({ message: "Error al eliminar shipment" });
//     res.json({ message: "Shipment eliminado exitosamente" });
//   } catch (error) {
//     res.status(500).json({ message: `Error al eliminar shipment: ${error.message}` });
//   }
// });

// export default router;

