// import { Router } from "express";
// import { fileURLToPath } from "url";
// import path from "path";
// import client from "../../config/db.js";

// const router = Router();
// const _filename = fileURLToPath(import.meta.url);


// router.post("/",);

// router.get("/", 
// });

// router.get("/:id", async (req, res) => {
//   try {
//     console.log(req.params.id);
//     const response = await client.query(
//       `SELECT * FROM warehouse WHERE warehouse_id = ${req.params.id}`
//     );

//     if (!response) {
//       return res.status(404).json({ message: "warehouse no encontrado" });
//     }
//     res.json(response.rows);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: `Error al obtener warehouse: ${error.message}` });
//   }
// });

// router.put("/:id", );

// router.delete("/:id", async (req, res) => {
//   try {
//     const response = await client.query(`DELETE FROM warehouse WHERE warehouse_id = ${req.params.id}`);
//     if (!response) return res.status(400).json({ message: `Error al eliminar warehouse: ${error.message}` });
//     res.json({ message: "warehouse eliminado exitosamente" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: `Error al eliminar anime: ${error.message}` });
//   }
// });

// export default router;
