import { Router } from "express";
import { fileURLToPath } from "url";

import client from "../../config/db.js";

const router = Router();


// POST - Crear un nuevo driver
router.post("/", async (req, res) => {
  const { driverName, warehouseId } = req.body;

  try {
    const query = await client.query(`SELECT * FROM warehouse WHERE warehouse_id = ${parseInt(warehouseId)}`);

    if (query.rows.length === 0) {
      return res.status(404).json({ message: "warehouse_id no encontrado" });
    }

    const response = await client.query(
      `INSERT INTO driver(name, warehouse_id) VALUES ('${driverName}', ${warehouseId}) RETURNING *`
    );
    if (response.rows.length === 0) {
      return res.status(404).json({ message: "driver no agregado" });
    }

    res
      .status(201)
      .json({
        message: "Driver creado exitosamente",
        driver: response.rows[0],
      });
  } catch (error) {
    res.status(500).json({ message: `Error al crear driver: ${error.message}` });
  }
});

// GET - Obtener todos los drivers
router.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM driver");
    res.json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al obtener drivers: ${error.message}` });
  }
});

// GET - Obtener un driver específico por ID
router.get("/:id", async (req, res) => {
  try {
    const response = await client.query(
      `SELECT * FROM driver WHERE driver_id = ${req.params.id}`
    );

    if (!response.rows.length) {
      return res.status(404).json({ message: "driver no encontrado" });
    }
    res.json(response.rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al obtener driver: ${error.message}` });
  }
});

// PUT - Actualizar un driver específico por ID
router.put("/:id", async (req, res) => {
  const { driverName, warehouseId } = req.body;

  try {
    const query = await client.query(`SELECT * FROM warehouse WHERE warehouse_id = ${parseInt(warehouseId)}`);

    if (query.rows.length === 0) {
      return res.status(404).json({ message: "warehouse_id no encontrado" });
    }

    const response = await client.query(
      `UPDATE driver SET name = '${driverName}', warehouse_id = ${warehouseId} WHERE driver_id = ${parseInt(req.params.id)} RETURNING *`
    );
    if (!response.rows.length) {
      return res.status(404).json({ message: "driver no encontrado" });
    }
    res.json({ message: "Driver actualizado exitosamente", driver: response.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al actualizar el driver: ${error.message}` });
  }
});

// DELETE - Eliminar un driver específico por ID
router.delete("/:id", async (req, res) => {
  try {
    const response = await client.query(`DELETE FROM driver WHERE driver_id = ${req.params.id} RETURNING *`);
    if (!response.rows.length) {
      return res.status(404).json({ message: "driver no encontrado" });
    }
    res.json({ message: "Driver eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al eliminar driver: ${error.message}` });
  }
});

export default router;