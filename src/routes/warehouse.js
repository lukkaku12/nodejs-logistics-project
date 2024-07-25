import { Router } from "express";
import { fileURLToPath } from "url";
import path from "path";
import client from "../../config/db.js";

const router = Router();
const _filename = fileURLToPath(import.meta.url);


router.post("/", async (req, res) => {
  const { warehouseName, warehouseLocation } = req.body;
  
  try {
    const response = await client.query(
      `INSERT INTO warehouse(name, location) VALUES ('${warehouseName}', '${warehouseLocation}') RETURNING *`
    );
    if (!response) {
      return res.status(404).json({ message: "warehouse no agregado" });
    };

    res
      .status(201)
      .json({
        message: "Warehouse creado exitosamente",
        warehouse: response.rows[0],
      });
  } catch (error) {
    res.status(500).json({ message: `Error al crear warehouse: ${error.message}` });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM warehouse");
    res.json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al obtener warehouse: ${error.message}` });
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const response = await client.query(
      `SELECT * FROM warehouse WHERE warehouse_id = ${req.params.id}`
    );

    if (!response) {
      return res.status(404).json({ message: "warehouse no encontrado" });
    }
    res.json(response.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al obtener warehouse: ${error.message}` });
  }
});

router.put("/:id", async (req, res) => {
  const {warehouseName, warehouseLocation} = req.body;
  try {
    const response = await client.query(`UPDATE warehouse SET name = '${warehouseName}', location = '${warehouseLocation}' WHERE warehouse_id = ${parseInt(req.params.id)} RETURNING *`);
    if (!response) return res.status(400).json({ message: `Error al eliminar warehouse: ${error.message}` });
    res.json({ message: "Anime actualizado exitosamente", warehouse: response.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al actualizar el warehouse: ${error.message}` });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const response = await client.query(`DELETE FROM warehouse WHERE warehouse_id = ${req.params.id}`);
    if (!response) return res.status(400).json({ message: `Error al eliminar warehouse: ${error.message}` });
    res.json({ message: "warehouse eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al eliminar anime: ${error.message}` });
  }
});

export default router;
