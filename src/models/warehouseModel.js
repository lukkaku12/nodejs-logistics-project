import client from "../../config/db.js";

export const save = async (warehouse) => {
    try {
        const { rows: resolve } = await client.query(
            "INSERT INTO warehouses (name, location) VALUES ($1, $2) RETURNING id",
            [warehouse.name, warehouse.location]
        );
        const warehouseId = resolve[0].id;
        const { rows: warehouseCreated } = await client.query(
            "SELECT * FROM warehouses WHERE id = $1",
            [warehouseId]
        );

        return warehouseCreated[0];
    } catch (err) {
        console.error("Error saving warehouse:", err);
        throw new Error("Ocurrió un error al guardar el almacén");
    }
};

export const findAll = async () => {
    try {
        const { rows: warehouses } = await client.query("SELECT * FROM warehouses");
        return warehouses;
    } catch (err) {
        console.error("Error fetching warehouses:", err);
        throw new Error("Ocurrió un error al obtener los almacenes");
    }
};

export const findById = async (id) => {
    try {
        const { rows: warehouseFound } = await client.query(
            "SELECT * FROM warehouses WHERE id = $1",
            [id]
        );
        return warehouseFound[0];
    } catch (error) {
        console.error("Warehouse not found:", error);
        throw new Error("Almacén no encontrado");
    }
};

export const update = async (id, newWarehouse) => {
    try {
        const { rowCount } = await client.query(
            "UPDATE warehouses SET name = $1, location = $2 WHERE id = $3",
            [newWarehouse.name, newWarehouse.location, id]
        );
        if (rowCount === 0) {
            throw new Error("No se encontró el almacén para actualizar");
        }
        return { message: "Almacén actualizado con éxito" };
    } catch (error) {
        console.error("Error updating warehouse:", error);
        throw new Error("El almacén no ha sido actualizado");
    }
};

export const updateWarehouse = async (id, newWarehouse) => {
    try {
        await findById(id);
        const result = await update(id, newWarehouse);
        return result;
    } catch (err) {
        console.error("Warehouse has not been updated:", err);
        throw new Error("El almacén no ha sido actualizado");
    }
};